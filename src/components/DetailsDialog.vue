<template>
  <div class="modal modal-open">
    <div class="modal-content">
      <h4>{{submission.team_name}}</h4>
      <p>{{submission.details.overall}}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat" @click="this.$emit('close')">Close</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import {Modal} from 'materialize-css';
import { ISubmissionSummary } from '../model';

@Component({
})
export default class DetailsDialog extends Vue {
  @Prop({
    required: true
  })
  private submission!: ISubmissionSummary;

  public mounted() {
    Modal.init(this.$el, {}).open();
  }

  @Watch('submission')
  private onSubmissionChanged() {
    Modal.getInstance(this.$el).open();
  }

}

</script>
