<template>
  <aside class="plots">
    <div v-for="s in selection" :key="s.submission_id">
      {{s.submission_id}}
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {Modal} from 'materialize-css';
import { ISubmissionSummary } from '../model';

@Component({
})
export default class Plots extends Vue {
  @Prop({
    required: true
  })
  private selection!: ISubmissionSummary[];
}

</script>
