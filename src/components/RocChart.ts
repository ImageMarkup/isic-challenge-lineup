import { Scatter } from 'vue-chartjs';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { simplifyLine } from '../data';
import { IRocEntry } from '../model';

@Component({
  extends: Scatter
})
export default class RocChart extends Vue {
  @Prop({
    required: true
  })
  private lines!: Array<{id: string, color: string, roc: IRocEntry[]}>;

  public mounted() {
    const minArea = parseFloat(this.getParam('minArea', '0.001'));

    const generateData = (roc: IRocEntry[]) => {
      if (!roc) {
        return [];
      }
      const map = (entry: IRocEntry) => ({ x: entry.fpr, y: entry.tpr });
      if (roc.length < 10) {
        return roc.map(map);
      }
      const simplifier = simplifyLine(roc, (v) => v.fpr, (v) => v.tpr);
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
      datasets: [reference].concat(this.lines.map((d, i) => ({
        label: d.id,
        backgroundColor: d.color,
        borderColor: d.color,
        pointRadius: 2,
        spanGaps: true,
        showLine: true,
        fill: false,
        data: generateData(d.roc)
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
