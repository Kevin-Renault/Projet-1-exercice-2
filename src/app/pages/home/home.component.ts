import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { Olympic } from 'src/app/models/olympic.model';
import { PieChartData } from 'src/app/models/pie-chart-data.model';
import { DataService } from 'src/app/services/data.service';
import { Option } from 'src/app/models/option.model';
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

  public options!: Option[];
  ngOnInit() {
  }

  constructor() {
    effect(() => {
      this.setValues()
    });
  }
  setValues() {
    const data = this.olympicList();
    if (data) {
      const allYears: number[] = data.flatMap(country => country.participations.map(participation => participation.year));
      this.totalJOs = this.totalJOs = new Set(allYears).size;
      this.pieChartDatas = this.dataService.pieChartDatas;
      this.totalCountries = this.pieChartDatas.length;
      this.options =
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
    }
  }
}
