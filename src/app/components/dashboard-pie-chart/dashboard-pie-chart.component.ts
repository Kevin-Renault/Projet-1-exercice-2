import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { ColorUtils } from 'src/app/utils/color-utils';

@Component({
  selector: 'app-dashboard-pie-chart',
  templateUrl: './dashboard-pie-chart.component.html',
  styleUrl: './dashboard-pie-chart.component.scss'
})
export class DashboardPieChartComponent {

  
  @Input()  keyValueInput!: Record<string, number>;;

  @Input()  countryNames!: string[];
  @Input()  sumOfAllMedalsYears!: number[];
  
  public pieChart!: Chart<"pie", number[], string>;

  constructor(private router: Router) { }


  ngOnChanges() {
    // Vérifie si les deux Inputs sont définis et non vides
    if (this.keyValueInput && Object.keys(this.keyValueInput)) {
      this.buildPieChart(Object.keys(this.keyValueInput), Object.values(this.keyValueInput));
    }
  }
  
  buildPieChart(countryNames: string[], sumOfAllMedalsYears: number[]) {
    const pieChart = new Chart("DashboardPieChart", {
      type: 'pie',
      data: {
        labels: countryNames,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: ColorUtils.generateDistinctColors(countryNames.length)  ,
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryName = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              this.router.navigate(['country', countryName]);
            }
          }
        }
      }
    });    
    this.pieChart = pieChart;
  }
}

