import { Component, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss'
})
export class ChartCardComponent {

  @Input() title!: string;
  @Input() label!: string;
  @Input() values!: number[];
  @Input() labels!: string[];

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  public lineChart!: Chart;

  ngOnChanges() {
    if (this.areInputsValid() && this.chartCanvas) {
      this.buildChart(this.labels, this.values);
    }
  }

  private areInputsValid(): boolean {
    return [
      this.title,
      this.label,
      this.labels,
      this.values
    ].every(input => input != null && input.length > 0);
  }

  buildChart(labels: string[], values: number[]) {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: this.label,
            data: values,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
    this.lineChart = lineChart;
  }
}
