<template>
  <aside class="plots">
    <div class="wrapper">
      <article v-for="s in selection" :key="s.submission_id">
        <h6>{{s.team_name}} ({{s.overall_score}})</h6>
        <roc-chart :summary="s" />
      </article>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import RocChart from './RocChart';
import { ISubmissionSummary } from '../model';

@Component({
  components: {
    RocChart
  }
})
export default class Plots extends Vue {
  @Prop({
    required: true
  })
  private selection!: ISubmissionSummary[];
}

</script>
<style lang="scss" scoped>
.plots {
  display: flex;
  flex-direction: column;
}

.wrapper {
  flex: 1 1 0;
  overflow: auto;
}

</style>
