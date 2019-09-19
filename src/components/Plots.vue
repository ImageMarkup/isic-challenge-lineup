<template>
  <aside class="plots">
    <ul class="tabs">
      <li class="tab"><a class="active" href="#bySubmission">by Submission</a></li>
      <li class="tab"><a href="#byClass">by Class</a></li>
    </ul>
    <div class="wrapper" id="bySubmission">
      <article v-for="s in selection.slice(0, 3)" :key="s.submission_id">
        <h6>{{s.team_name}} ({{f(s.overall_score)}})</h6>
        <roc-chart :summary="s" />
      </article>
    </div>
    <div class="wrapper" id="byClass">

    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import RocChart from './RocChart';
import { Tabs } from 'materialize-css';
import {format} from 'd3-format';
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

  private f = format('.4f');

  public mounted() {
    Tabs.init(this.$el.querySelector('.tabs')!);
  }
}

</script>
<style lang="scss" scoped>
.plots {
  display: flex;
  flex-direction: column;
  color: black;
  min-width: 25vw;
}

.wrapper {
  flex: 1 1 0;
  overflow: auto;
}

</style>
