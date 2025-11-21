import { Component, computed, inject, OnInit } from '@angular/core';
import { Olympic } from 'src/app/models/olympic.model';
import { PieChartData } from 'src/app/models/pie-chart-data.model';
import { DataService } from 'src/app/services/data.service';
import { Stat } from 'src/app/models/stat.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  readonly dataService = inject(DataService);

  public totalCountries: number = 0
  public totalJOs: number = 0
  public error!: string
  titlePage: string = "Medals per Country";

  public countryNames!: string[];
  public sumOfAllMedalsYears!: number[];


  readonly olympicList = toSignal(
    this.dataService.getCountryList(),
    { initialValue: [] }
  );

  readonly loading = computed(() => this.olympicList().length === 0);
  readonly hasError = computed(() => this.error != undefined);





  public pieChartDatas!: PieChartData[];
  public stats!: Stat[];
  ngOnInit() {
    this.loadCountryList();
    //this.error = "Error";
  }

  loadCountryList() {
    this.dataService.getCountryList().subscribe({
      next: (data: Olympic[]) => {
        const allYears: number[] = data.flatMap(country => country.participations.map(participation => participation.year));
        this.totalJOs = this.totalJOs = new Set(allYears).size;
        this.pieChartDatas = this.dataService.pieChartDatas;
        this.totalCountries = this.pieChartDatas.length;
        this.stats =
          [
            {
              libelle: "Number of countries",
              value: this.totalCountries
            },
            {
              libelle: "Number of JOs",
              value: this.totalJOs
            },
          ];
      },
      error: (error) => {
        console.error('Erreur lors du chargement des pays :', error);
        this.error = 'Erreur lors du chargement des pays :' + error;
      }
    });
  }
}
