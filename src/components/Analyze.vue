<template>
  <div>
    <LineUp :data="submissions" @open="open($event)"/>
    <details-dialog v-if="focus" :submission="focus" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LineUp from './LineUp.vue';
import DetailsDialog from './DetailsDialog.vue';
import { ISubmissionSummary, ISubmissionDetails } from '../model';
import { getByTeam, fetchDetails } from '../rest';

@Component({
  components: {
    LineUp,
    DetailsDialog
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

  private loading = true;
  private submissions: ISubmissionSummary[] = [];
  private focus: ISubmissionSummary | null = null;

  public created() {
    this.fetchData();
  }

  @Watch('baseUrl')
  private onBaseUrlChanged() {
    this.fetchData();
  }

  private fetchData() {
    this.submissions = [];
    getByTeam(this.baseUrl, this.challenge).then((data) => this.submissions = data.results);
  }

  private open(s: ISubmissionSummary) {
    if (s.details) {
      this.focus = s;
      return;
    }
    fetchDetails(this.baseUrl, s).then((details) => {
      s.details = details;
      this.focus = s;
    });
  }

  private closeDetails() {
    this.focus = null;
  }
}

</script>
