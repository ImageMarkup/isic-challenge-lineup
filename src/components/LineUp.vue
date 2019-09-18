<template>
  <div class="lu" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { ISubmissionSummary } from '../model';
import { builder, Taggle, LocalDataProvider } from 'lineupjs';


@Component
export default class LineUp extends Vue {
  @Prop({
    required: true,
    default: () => []
  })
  private data!: ISubmissionSummary[];

  private lineup: Taggle | null = null;

  public mounted() {
    const b = builder(this.data)

    this.lineup = b.buildTaggle(this.$el as HTMLElement);

    this.patchLineUp();
  }

  private patchLineUp() {
    // patch switch button
    const side = this.$el.querySelector<HTMLElement>('.lu-rule-button-chooser');
    if (side) {
      side.classList.add('switch');
      const input = side.querySelector<HTMLElement>('input')!;
      input.insertAdjacentHTML('afterend', `<span class="lever"></span>`);
      input.insertAdjacentHTML('beforebegin', `<span>Item</span>`);
    }
  }

  @Watch('data')
  private onDataChanged() {
    // render lineup
    (this.lineup!.data as LocalDataProvider).setData(this.data);
  }

  @Emit('open')
  private open(s: ISubmissionSummary) {
    return s;
  }


// {
//           text: 'Rank',
//           subText: `${this.submissionsCount} total`,
//           value: 'rank',
//         },
//         {
//           text: 'Team',
//           subText: `${this.uniqueTeamCount} unique teams`,
//           value: 'team_name',
//         },
//         {
//           text: 'Approach Name',
//           value: 'approach_name ',
//           sortable: false,
//         },
//         {
//           text: 'Manuscript',
//           subText: this.admin ? `${this.missingManuscriptCount} missing` : null,
//           value: 'approach_manuscript_url',
//           sortable: false,
//         },
//         {
//           text: 'Used External Data',
//           subText: `${this.usedExternalCount} yes`,
//           value: 'approach_uses_external_data',
//         },
//         {
//           text: 'Primary Metric Value',
//           subText: this.task.primaryMetricName,
//           value: 'overall_score',
//         },
}
</script>

<style lang="scss">

.lu {
  position: absolute !important;
  left: 2px;
  top: 5px;
  right: 2px;
  bottom: 2px;
}

</style>
