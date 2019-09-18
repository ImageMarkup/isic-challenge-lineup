<template>
  <table>
    <thead>
      <tr>
        <th>Team Name</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in data" :key="s.submission_id">
        <td>{{s.team_name}}</td>
        <td>{{s.overall_score}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { ISubmissionSummary } from '../model';


@Component
export default class LineUp extends Vue {
  @Prop({
    required: true,
    default: () => []
  })
  private data!: ISubmissionSummary[];

  @Watch('data')
  private onBaseUrlChanged() {
    // render lineup
  }
}
</script>

<style lang="scss" scoped>

</style>
