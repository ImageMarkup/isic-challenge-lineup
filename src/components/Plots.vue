<template>
  <aside class="plots">
    <div class="panel">
      <ul class="tabs">
        <li class="tab"><a class="active" href="#bySubmission">by Submission</a></li>
        <li class="tab"><a href="#byClass">by Class</a></li>
      </ul>
      <a class="btn btn-flat waves-effect waves-light" @click="toggleFullscreen()"><i class="material-icons">{{ closeIcon }}</i></a>
    </div>
    <by-submission :selection="selection" class="wrapper" id="bySubmission" />
    <by-class :selection="selection" class="wrapper" id="byClass" />
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import RocChart from './RocChart';
import { Tabs } from 'materialize-css';
import {format} from 'd3-format';
import { ISubmissionSummary } from '../model';
import BySubmission from './BySubmission.vue';
import ByClass from './ByClass.vue';

@Component({
  components: {
    RocChart,
    BySubmission,
    ByClass
  }
})
export default class Plots extends Vue {
  @Prop({
    required: true
  })
  private selection!: ISubmissionSummary[];
  @Prop({
    required: true
  })
  private fullscreen!: boolean;

  private f = format('.4f');

  public mounted() {
    Tabs.init(this.$el.querySelector('.tabs')!);
  }

  get closeIcon() {
    return this.fullscreen ? 'close' : 'zoom_in';
  }

  @Emit('toggle')
  private toggleFullscreen() {
    return !this.fullscreen;
  }
}

</script>
<style lang="scss" scoped>
.plots {
  display: flex;
  flex-direction: column;
  color: black;
  min-width: 25vw;
  max-width: 30vw;
}

.panel {
  display: flex;
  align-items: center;
  margin-top: 0.2rem;

  > ul {
    flex: 1 1 0;
  }
}

.wrapper {
  flex: 1 1 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;

  &.active {
    display: flex !important;
  }
}

</style>
