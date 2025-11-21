import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from "./pages/country/country.component";
import { DashboardPieChartComponent } from './components/dashboard-pie-chart/dashboard-pie-chart.component';
import { ChartCardComponent } from "src/app/components/chart-card/chart-card.component";
import { HeaderComponent } from "src/app/components/header/header.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, CountryComponent, DashboardPieChartComponent, ChartCardComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule { }
