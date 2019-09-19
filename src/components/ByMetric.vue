<template>
  <div>
    <article v-for="metric in metrics" :key="metric.id">
      <h6>{{metric.id}}</h6>
      <grouped-bar-chart class="chart" :labels="categories.map((d) => d.id)" :datasets="generateItems(metric)" />
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import GroupedBarChart from './GroupedBarChart';
import { ISubmissionSummary, IScore } from '../model';
import { possibleCategories, integralMetricTypes, thresholdMetricTypes } from './constants';
import { schemeDark2 } from 'd3-scale-chromatic';

@Component({
  components: {
    GroupedBarChart
  }
})
export default class ByMetric extends Vue {
  @Prop({
    required: true
  })
  private selection!: ISubmissionSummary[];

  private metrics = integralMetricTypes.concat(thresholdMetricTypes);
  private categories = possibleCategories;

  private generateItems(cat: {id: keyof IScore}) {
    return this.selection.map((s, i) => ({
      id: s.team_name,
      color: schemeDark2[i % schemeDark2.length],
      data: s.details ? s.details.scores.map((d) => d[cat.id]) : []
    }));
  }

  @Watch('selection')
  private onSelectionChanged() {
    this.$forceUpdate();
  }
}

</script>
<style lang="scss" scoped>

.chart {
  width: 25vw;
}
</style>
