<template>
  <table>
    <thead>
      <tr>
        <th>Team Name</th>
        <th>Score</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in data" :key="s.submission_id">
        <td>{{s.team_name}}</td>
        <td>{{s.overall_score}}</td>
        <td>
          <a class="waves-effect waves-light btn-flat btn-small" @click="open(s)">
            <i class="material-icons">edit</i>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
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

  @Emit('open')
  private open(s: ISubmissionSummary) {
    return s;
  }
}
</script>

<style lang="scss" scoped>

</style>
