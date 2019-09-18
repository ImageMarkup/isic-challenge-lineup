import { Scatter } from 'vue-chartjs';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { possibleCategories } from './constants';
import { ISubmissionSummary, ECategory } from '@/model';

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
      return info.roc.map((entry) => ({ x: entry.fpr, y: entry.tpr }));
    };

    (this as any).renderChart({
      datasets: possibleCategories.map((d) => ({
        label: d.id,
        backgroundColor: d.color,
        pointRadius: 1,
        data: this.summary.details ? generateData(d.id) : []
      })),
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
