<template>
  <div>
    <article v-for="s in selection.slice(0, subset)" :key="s.submission_id">
      <h6>{{s.team_name}} ({{f(s.overall_score)}})</h6>
      <roc-chart class="chart" :lines="generateItems(s)" />
    </article>
    <a class="btn btn-flat waves waves-light" v-if="subset < selection.length" @click="subset += 2"><i class="material-icons">expand_more</i></a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import RocChart from './RocChart';
import {format} from 'd3-format';
import { ISubmissionSummary } from '../model';
import { possibleCategories } from './constants';

@Component({
  components: {
    RocChart
  }
})
export default class BySubmission extends Vue {
  @Prop({
    required: true
  })
  private selection!: ISubmissionSummary[];

  private f = format('.4f');
  private subset = 3;

  private generateItems(s: ISubmissionSummary) {
    return possibleCategories.map((d, i) => ({
      id: d.id,
      color: d.color,
      roc: s.details ? s.details.scores[i].roc : []
    }));
  }
}

</script>
<style lang="scss" scoped>

.chart {
  width: 25vw;
}
</style>
