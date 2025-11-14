import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss'
})
export class ChartCardComponent {

  @Input() title!: string;
  @Input() label!: string;
  @Input() values!: string[];
  @Input() years!: number[];

  public lineChart!: Chart<"line", string[], number>;


  ngOnChanges() {
    if (this.areInputsValid()) {
      this.buildChart(this.years, this.values);
    }
  }

  private areInputsValid(): boolean {
    return [
      this.title,
      this.label,
      this.years,
      this.values
    ].every(input => input != null && input.length > 0);
  }

  buildChart(years: number[], values: string[]) {
    const lineChart = new Chart(this.title, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: this.label,
            data: values,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
    this.lineChart = lineChart;
  }
}
