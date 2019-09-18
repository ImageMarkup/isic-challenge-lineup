<template>
  <LineUp :data="submissions"/>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LineUp from './LineUp.vue';
import { ISubmissionSummary } from '../model';
import { getByTeam } from '../rest';

@Component({
  components: {
    LineUp
  },
})
export default class Analyze extends Vue {
  @Prop({
    required: true
  })
  private baseUrl!: string;

  private loading = true;
  private submissions: ISubmissionSummary[] = [];

  public created() {
    this.fetchData();
  }

  @Watch('baseUrl')
  private onBaseUrlChanged() {
    this.fetchData();
  }

  private fetchData() {
    getByTeam(this.baseUrl).then((data) => this.submissions = data.results);
  }
}

</script>
