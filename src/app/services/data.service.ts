import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, of } from 'rxjs';
import { Participation } from '../models/participation.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly DATA_URL = './assets/mock/olympic.json';
  private countryList!: Observable<Country[]>
  private isCountryAllReadyLoaded = false;

  constructor(private http: HttpClient) { }

  public medalsByCountry: Record<string, number> = {};

  getCountryList(): Observable<Country[]> {
    if (!this.isCountryAllReadyLoaded) {
      this.countryList = this.http.get<Country[]>(this.DATA_URL).pipe(
        map((countries: Country[]) => {
          if (!Array.isArray(countries)) {
            throw new Error('Les données ne sont pas un tableau');
          }
          countries.forEach(country => {
            const totalMedals = country.participations.reduce(
              (sum, participation) => sum + participation.medalsCount,
              0
            );
            this.medalsByCountry[country.country] = totalMedals;
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

  getCountryByName(name: string): Observable<Country | undefined> {
    return this.getCountryList().pipe(
      map((countries: Country[]) => {
        return countries.find(country => country.country.toLowerCase() === name.toLowerCase());
      })
    );
  }

  // Récupère un pays par son nom + calcule les totaux
  getCountryWithStats(name: string): Observable<{
    country: Country;
    totalMedals: number;
    totalAthletes: number;
    years: number[];
    medals: string[];
  } | null> {
    return this.getCountryByName(name).pipe(
      map((country: Country | undefined) => {
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
