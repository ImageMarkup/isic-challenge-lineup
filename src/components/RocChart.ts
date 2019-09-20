import { Scatter } from 'vue-chartjs';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { IRocEntry } from '../model';

@Component({
  extends: Scatter
})
export default class RocChart extends Vue {
  @Prop({
    required: true
  })
  private lines!: Array<{ id: string, color: string, roc: IRocEntry[] }>;


  public mounted() {
    this.update();
  }

  @Watch('lines')
  public onChange() {
    this.update();
  }

  public update() {
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
      datasets: [reference].concat(this.lines.map((d, i) => ({
        label: d.id,
        backgroundColor: d.color,
        borderColor: d.color,
        pointRadius: 2,
        spanGaps: true,
        showLine: true,
        fill: false,
        data: d.roc ? d.roc.map((entry) => ({ x: entry.fpr, y: entry.tpr })) : []
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
