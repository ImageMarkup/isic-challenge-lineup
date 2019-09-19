<template>
  <div>
    <article v-for="cat in categories" :key="cat.id">
      <h6>{{cat.id}}</h6>
      <div :title="cat.name" class="chart">{{cat.name}}</div>
      <roc-chart class="chart" :lines="generateItems(cat)" />
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import RocChart from './RocChart';
import {format} from 'd3-format';
import { ISubmissionSummary, ECategory } from '../model';
import { possibleCategories } from './constants';
import { schemeDark2 } from 'd3-scale-chromatic';

@Component({
  components: {
    RocChart
  }
})
export default class ByClass extends Vue {
  @Prop({
    required: true
  })
  private selection!: ISubmissionSummary[];

  private f = format('.4f');

  private categories = possibleCategories;

  private generateItems(cat: {id: ECategory}) {
    return this.selection.map((s, i) => ({
      id: s.team_name,
      color: schemeDark2[i % schemeDark2.length],
      roc: s.details ? s.details.scores.find((d) => d.id === cat.id)!.roc : []
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}



</style>
