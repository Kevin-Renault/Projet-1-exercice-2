import { Component, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { PieChartData } from 'src/app/models/pie-chart-data.model';
import { ColorUtils } from 'src/app/utils/color-utils';

@Component({
  selector: 'app-dashboard-pie-chart',
  templateUrl: './dashboard-pie-chart.component.html',
  styleUrl: './dashboard-pie-chart.component.scss'
})
export class DashboardPieChartComponent {

  @Input() pieChartDatas!: PieChartData[];
  @Input() countryNames!: string[];
  @Input() sumOfAllMedalsYears!: number[];

  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;

  public pieChart!: Chart;

  constructor(private router: Router) { }


  ngOnChanges() {
    // Vérifie si l'Input est défini et non vide
    if (this.pieChartDatas && this.pieCanvas) {
      this.buildPieChart(this.pieChartDatas.map(item => item.id), this.pieChartDatas.map(item => item.country), this.pieChartDatas.map(item => item.medals));
    }
  }

  ngOnDestroy() {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  }

  buildPieChart(ids: number[], countryNames: string[], sumOfAllMedalsYears: number[]) {
    const ctx = this.pieCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: countryNames,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: ColorUtils.generateDistinctColors(countryNames.length),
          hoverOffset: 4
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryName = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              const id = ids[firstPoint.index];
              this.router.navigate(['country', id]);
            }
          }
        }
      }
    });
    this.pieChart = pieChart;
  }
}

