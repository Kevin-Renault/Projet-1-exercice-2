import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { COUNTRY_NAME } from 'src/app/constants/constants.utils';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  readonly dataService = inject(DataService);
  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;

  public medalsPerYear!: string[];
  public years!: number[];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.loadCountryList();
  }

  loadCountryList() {
    let countryName: string | null = null
    this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get(COUNTRY_NAME));
    if (countryName) {
      this.dataService.getCountryWithStats(countryName).subscribe({
        next: (countryWithStats) => {
          if (!countryWithStats) {
            this.error = 'Pays non trouvé';
            return;
          }

          // Affectation directe des propriétés
          this.titlePage = countryWithStats.country.country;
          this.totalEntries = countryWithStats.country.participations.length;
          this.years = countryWithStats.years;
          this.medalsPerYear = countryWithStats.medals;
          this.totalMedals = countryWithStats.totalMedals;
          this.totalAthletes = countryWithStats.totalAthletes;
        },
        error: (error) => {
          this.error = error.message;
        }
      });
    }
  }
}
