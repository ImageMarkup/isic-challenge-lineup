<template>
  <div class="main">
    <div class="wrapper" v-show="!fullscreen">
      <LineUp :data="submissions" @open="open($event)" :selection="selection" @selectionChanged="selection = $event" :loaded="loaded"/>
    </div>
    <details-dialog v-if="focus" :submission="focus" />
    <Plots :class="{ wide: fullscreen}" v-if="selection.length > 0" :selection="selectedRows" @toggle="fullscreen = !fullscreen" :fullscreen="fullscreen"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LineUp from './LineUp.vue';
import DetailsDialog from './DetailsDialog.vue';
import Plots from './Plots.vue';
import { ISubmissionSummary, ISubmissionDetails } from '../model';
import { getByTeam, fetchDetails } from '../rest';

@Component({
  components: {
    LineUp,
    DetailsDialog,
    Plots
  },
})
export default class Analyze extends Vue {
  @Prop({
    required: true
  })
  private baseUrl!: string;
  @Prop({
    required: true
  })
  private challenge!: string;

  private loaded = 0;
  private selection: number[] = [];
  private submissions: ISubmissionSummary[] = [];
  private focus: ISubmissionSummary | null = null;
  private fullscreen = false;

  public created() {
    this.fetchData();
  }

  get selectedRows() {
    return this.selection.map((d) => this.submissions[d]);
  }

  @Watch('baseUrl')
  private onBaseUrlChanged() {
    this.fetchData();
  }

  @Watch('challenge')
  private onChallengeChanged() {
    this.fetchData();
  }

  private fetchData() {
    this.submissions = [];
    this.loaded = 0;
    getByTeam(this.baseUrl, this.challenge).then((data) => {
      this.submissions = data.results;
      return Promise.all(this.submissions.map((s) => fetchDetails(this.baseUrl, s).then(() => this.loaded++)));
    }).then(() => this.loaded = -1);
  }

  private open(s: ISubmissionSummary) {
    if (s.details) {
      this.focus = s;
      return;
    }
    fetchDetails(this.baseUrl, s).then((details) => {
      this.focus = s;
    });
  }

  private closeDetails() {
    this.focus = null;
  }
}

</script>

<style lang="scss" scoped>
.main {
  display: flex;
}

.plots {
  min-width: 20vw;
}

.wide {
  flex: 1 1 0;
  max-width: unset !important;
}

.wrapper {
  position: relative;
  flex: 1 1 0;
}
</style>
