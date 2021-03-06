import { Bar } from 'vue-chartjs';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  extends: Bar
})
export default class GroupedBarChart extends Vue {
  @Prop({
    required: true
  })
  private datasets!: Array<{ id: string, color: string, data: number[] }>;
  @Prop({
    required: true
  })
  private labels!: string[];

  public mounted() {
    this.update();
  }

  @Watch('datasets')
  public onChange() {
    this.update();
  }

  private update() {
    (this as any).renderChart({
      labels: this.labels,
      datasets: this.datasets.map((d) => ({
        label: d.id,
        backgroundColor: d.color,
        data: d.data
      })),
    }, {
        animation: false,
        legend: {
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 1
            }
          }]
        }
    });
  }
}
