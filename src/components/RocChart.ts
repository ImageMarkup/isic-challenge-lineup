import { Scatter } from 'vue-chartjs';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { possibleCategories } from './constants';
import { ISubmissionSummary, ECategory, IRocEntry, ITypedScore } from '../model';
import { simplifyLine } from '../data';

@Component({
  extends: Scatter
})
export default class RocChart extends Vue {
  @Prop({
    required: true
  })
  private summary!: ISubmissionSummary;

  public mounted() {
    const minArea = parseFloat(this.getParam('minArea', '0.001'));

    const generateData = (score: ITypedScore) => {
      if (!score.roc) {
        return [];
      }
      const map = (entry: IRocEntry) => ({ x: entry.fpr, y: entry.tpr });
      if (score.roc.length < 10) {
        return score.roc.map(map);
      }
      const simplifier = simplifyLine(score.roc, (v) => v.fpr, (v) => v.tpr);
      const simple = simplifier(minArea);
      return simple.map(map);
    };

    const reference: any = {
      label: 'Reference',
      backgroundColor: 'black',
      borderColor: 'black',
      borderWidth: 1,
      borderDash: [4, 2],
      pointRadius: 1,
      spanGaps: true,
      showLine: true,
      fill: false,
      data: [{ x: 0, y: 0 }, { x: 1, y: 1 }]
    };

    (this as any).renderChart({
      datasets: [reference].concat(possibleCategories.map((d, i) => ({
        label: d.id,
        backgroundColor: d.color,
        borderColor: d.color,
        pointRadius: 2,
        spanGaps: true,
        showLine: true,
        fill: false,
        data: this.summary.details ? generateData(this.summary.details!.scores[i]) : []
      }))),
    }, {
        title: {
          display: true,
          text: 'RoC Curve',
          position: 'top'
        },
        legend: {
          position: 'bottom'
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'FPR'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'TPR'
            }
          }]
        }
    });
  }

  private getParam(key: string, defaultValue: string) {
    const s = new URL(window.location.href).searchParams;
    return s.has(key) ? s.get(key)! : defaultValue;
  }
}
