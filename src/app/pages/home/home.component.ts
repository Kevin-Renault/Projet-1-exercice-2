import { Component, inject, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { DataService } from 'src/app/services/data.service';

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


  public medalsByCountry!: Record<string, number>;

  ngOnInit() {
    this.loadCountryList();
  }

  loadCountryList() {
    this.dataService.getCountryList().subscribe({
      next: (data: Country[]) => {
        const allYears: number[] = data.flatMap(country => country.participations.map(participation => participation.year));
        this.totalJOs = this.totalJOs = new Set(allYears).size;
        this.medalsByCountry = this.dataService.medalsByCountry;
        this.totalCountries = Object.keys(this.medalsByCountry).length;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des pays :', error);
      }
    });
  }
}

