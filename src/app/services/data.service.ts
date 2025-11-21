import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Olympic } from '../models/olympic.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, of } from 'rxjs';
import { Participation } from '../models/participation.model';
import { PieChartData } from '../models/pie-chart-data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly DATA_URL = './assets/mock/olympic.json';
  private countryList!: Observable<Olympic[]>
  private isCountryAllReadyLoaded = false;

  constructor(private http: HttpClient) { }

  public pieChartDatas: PieChartData[] = [];

  getCountryList(): Observable<Olympic[]> {
    if (!this.isCountryAllReadyLoaded) {
      this.countryList = this.http.get<Olympic[]>(this.DATA_URL).pipe(
        map((countries: Olympic[]) => {
          if (!Array.isArray(countries)) {
            throw new Error('Les données ne sont pas un tableau');
          }
          countries.forEach(country => {
            const totalMedals = country.participations.reduce(
              (sum, participation) => sum + participation.medalsCount,
              0
            );
            const pieChartData: PieChartData =
            {
              id: country.id,
              country: country.country,
              medals: totalMedals,
            }
            this.pieChartDatas[country.id - 1] = pieChartData;
          });
          return countries.map(item => ({
            id: Number(item.id),
            country: String(item.country),
            participations: Array.isArray(item.participations)
              ? item.participations.map((p: Participation) => ({
                id: Number(p.id),
                year: Number(p.year),
                city: String(p.city),
                medalsCount: Number(p.medalsCount),
                athleteCount: Number(p.athleteCount)
              }))
              : []
          }));
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des pays :', error);
          this.isCountryAllReadyLoaded = false;
          return of([]); // Retourne un tableau vide en cas d'erreur
        })
      );
      this.isCountryAllReadyLoaded = true;
    }
    return this.countryList;
  }

  getCountryByName(name: string): Observable<Olympic | undefined> {
    return this.getCountryList().pipe(
      map((countries: Olympic[]) => {
        return countries.find(country => country.country.toLowerCase() === name.toLowerCase());
      })
    );
  }

  getCountryById(id: number): Observable<Olympic | undefined> {
    return this.getCountryList().pipe(
      map((countries: Olympic[]) => {
        return countries.find(country => country.id == id);
      })
    );
  }

  // Récupère un pays par son nom + calcule les totaux
  getCountryWithStatsByName(name: string): Observable<{
    country: Olympic;
    totalMedals: number;
    totalAthletes: number;
    years: number[];
    medals: string[];
  } | null> {
    return this.getCountryByName(name).pipe(
      map((country: Olympic | undefined) => {
        if (!country) return null;
        return {
          country,
          totalMedals: this.calculateTotalMedals(country.participations),
          totalAthletes: this.calculateTotalAthletes(country.participations),
          years: country.participations.map(p => p.year),
          medals: country.participations.map(p => p.medalsCount.toString())
        };
      })
    );
  }

  // Récupère un pays par son nom + calcule les totaux
  getCountryWithStatsById(id: number): Observable<{
    country: Olympic;
    totalMedals: number;
    totalAthletes: number;
    years: number[];
    medals: string[];
  } | null> {

    console.log("getCountryWithStatsById");
    return this.getCountryById(id).pipe(
      map((country: Olympic | undefined) => {
        if (!country) return null;
        return {
          country,
          totalMedals: this.calculateTotalMedals(country.participations),
          totalAthletes: this.calculateTotalAthletes(country.participations),
          years: country.participations.map(p => p.year),
          medals: country.participations.map(p => p.medalsCount.toString())
        };
      })
    );
  }

  private calculateTotalMedals(participations: Participation[]): number {
    return participations.reduce((sum, p) => sum + p.medalsCount, 0);
  }

  private calculateTotalAthletes(participations: Participation[]): number {
    return participations.reduce((sum, p) => sum + p.athleteCount, 0);
  }

}
