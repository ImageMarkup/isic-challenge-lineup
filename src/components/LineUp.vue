<template>
  <table>
    <thead>
      <tr>
        <th>Team Name</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in submissions" :key="s.submission_id">
        <td>{{s.team_name}}</td>
        <td>{{s.overall_score}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { ISubmissionSummary } from '../model';
import { getByTeam } from '../rest';

@Component
export default class LineUp extends Vue {
  @Prop({
    required: true
  })
  private baseUrl!: string;

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

<style lang="scss" scoped>

</style>
