
import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Option } from 'src/app/models/option.model';
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

  public medalsPerYear!: number[];
  public years!: string[];


  readonly entryId = Number(this.route.snapshot.paramMap.get("id"));

  readonly dataServiceResponse = toSignal(
    this.dataService.getCountryWithStatsById(this.entryId).pipe(
      map((country) => ({
        value: country,
        error: undefined
      })),
      catchError((error) => of({ value: undefined, error: error }))
    )
  );

  readonly loading = computed(() => this.dataServiceResponse() == undefined);
  readonly error = computed(() => this.dataServiceResponse()?.error != undefined);
  readonly entryData = computed(() => this.dataServiceResponse()?.value);


  public options!: Option[];



  constructor(private route: ActivatedRoute) {
    effect(() => {
      this.setValues()
    });
  }

  ngOnInit(): void {
  }

  setValues() {
    const data = this.entryData();
    if (data) {
      this.titlePage = data.olympic.country;
      this.totalEntries = data.olympic.participations.length;
      this.years = data.years;
      this.medalsPerYear = data.medals;
      this.totalMedals = data.totalMedals;
      this.totalAthletes = data.totalAthletes;
      this.options = [
        {
          libelle: "Number of entries",
          value: this.totalEntries
        },
        {
          libelle: "Total Number of medals ",
          value: this.totalMedals
        },
        {
          libelle: "Total Number of athletes ",
          value: this.totalAthletes
        }
      ];
    }
  }
}

