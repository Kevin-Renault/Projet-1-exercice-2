import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss'
})
export class ChartCardComponent {

    @Input()  medals!: string[];
    @Input()  years!: number[];
    
  public lineChart!: Chart<"line", string[], number>;
  
  
  ngOnChanges() {
    // Vérifie si les deux Inputs sont définis et non vides
    if (this.years && this.medals && this.years.length > 0 && this.medals.length > 0) {
      this.buildChart(this.years, this.medals);
    }
  }


  buildChart(years: number[], medals: string[]) {
    const lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: "medals",
            data: medals,
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
