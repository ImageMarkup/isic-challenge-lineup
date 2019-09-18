<template>
  <div class="lu" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { ISubmissionSummary } from '../model';
import { builder, Taggle, LocalDataProvider, buildStringColumn, buildNumberColumn, buildRanking, buildBooleanColumn, buildCategoricalColumn, buildActionsColumn } from 'lineupjs';
import { debounce } from 'lodash';
import { integralMetricTypes, thresholdMetricTypes } from './constants';


@Component
export default class LineUp extends Vue {
  @Prop({
    required: true,
    default: () => []
  })
  private data!: ISubmissionSummary[];

  @Prop({
    required: true,
    default: () => []
  })
  private selection!: number[];

  @Prop({
    required: true
  })
  private loaded!: number;

  private lineup: Taggle | null = null;

  public mounted() {
    const b = builder(this.data);
        // {
        //   text: 'Used External Data',
        //   subText: `${this.usedExternalCount} yes`,
        //   value: 'approach_uses_external_data',
        // },

    b.rowHeight(32, 2);

    const generateName = (v: ISubmissionSummary) => {
      return `${v.team_name}<br>${v.team_institution_name ? `<a class="instituteLink" href="${v.team_institution_url}" target="blank" rel="noopener">${v.team_institution_name}</a>` : ''}`;
    };

    const generateApproach = (v: ISubmissionSummary) => {
      if (v.approach_manuscript_url) {
        return `<a href="${v.approach_manuscript_url}" target="blank" rel="noopener">${v.approach_name}</a>`;
      }
      return v.approach_name;
    };

    b.column(buildStringColumn('team_name')
      .label('Team').html().width(300)
      .custom('accessor', (row: {v: ISubmissionSummary}) => generateName(row.v)));
    b.column(buildStringColumn('approach_name')
      .label('Approach').html().width(400)
      .custom('accessor', (row: {v: ISubmissionSummary}) => generateApproach(row.v)));

    b.column(buildCategoricalColumn('approach_uses_external_data').categories([
      {
        label: 'yes',
        name: 'y',
        color: 'darkgreen'
      },
      {
        label: 'no',
        name: 'n',
        color: 'darkred'
      }
    ]).label('Used External Data')
      .custom('accessor', (row: {v: ISubmissionSummary}) => row.v.approach_uses_external_data ? 'y' : 'n'));

    b.column(buildNumberColumn('overall_score', [0, 1]).label('Score'));

    for (const metric of integralMetricTypes) {
      b.column(buildNumberColumn(`details.${metric.id}`, [0, 1]).label(metric.name).description(metric.detail));
    }
    for (const metric of thresholdMetricTypes) {
      b.column(buildNumberColumn(`details.${metric.id}`, [0, 1]).label(metric.name).description(metric.detail || metric.name));
    }

    b.column(buildActionsColumn().label('&nbsp;').width(30).action({
      name: 'Show Details',
      icon: 'zoom_in',
      className: 'material-icons cursor',
      action: (row: {v: ISubmissionSummary}) => this.open(row.v)
    }));

    b.deriveColors();

    b.ranking(buildRanking()
      .aggregate().rank().selection()
      .column('team_name').column('approach_name').column('approach_uses_external_data')
      .column('overall_score')
      .sortBy('overall_score', 'desc')
    );

    this.lineup = b.buildTaggle(this.$el as HTMLElement);
    this.lineup.on('selectionChanged', (indices) => {
      this.$emit('selectionChanged', indices);
    });

    this.patchLineUp();
    this.updateLineUp = debounce(() => this.lineup!.update(), 300);
  }

  private updateLineUp: (() => any) = () => undefined;

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
    (this.lineup!.data as LocalDataProvider).setData(this.data);
  }

  @Watch('selection')
  private onSelectionChanged() {
    this.lineup!.setSelection(this.selection);
  }

  @Watch('loaded')
  private onLoadingChanged() {
    this.updateLineUp();
  }

  @Emit('open')
  private open(s: ISubmissionSummary) {
    return s;
  }
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

.le-td.lu-renderer-string[data-group=d] {
  white-space: unset !important;
  flex-direction: column;
  align-items: start;

  > .instituteLink {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 80%;
  }
}

.lu-renderer-rank {
  align-items: center;
}

.material-icons.cursor {
  cursor: pointer;
}

//  flex-direction: column;

</style>
