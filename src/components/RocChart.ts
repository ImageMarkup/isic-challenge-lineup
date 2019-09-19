import { Scatter } from 'vue-chartjs';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { possibleCategories } from './constants';
import { ISubmissionSummary, ECategory, IRocEntry } from '../model';
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
    // Overwriting base render method with actual data.
    const generateData = (d: string) => {
      const info = this.summary.details!.raw[d as ECategory];
      if (!info) {
        return [];
      }
      const map = (entry: IRocEntry) => ({ x: entry.fpr, y: entry.tpr });
      if (info.roc.length < 10) {
        return info.roc.map(map);
      }
      const simplifier = simplifyLine(info.roc, (v) => v.fpr, (v) => v.tpr);
      const simple = simplifier(0.0001);
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
      datasets: [reference].concat(possibleCategories.map((d) => ({
        label: d.id,
        backgroundColor: d.color,
        borderColor: d.color,
        pointRadius: 2,
        spanGaps: true,
        showLine: true,
        fill: false,
        data: this.summary.details ? generateData(d.id) : []
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
}
