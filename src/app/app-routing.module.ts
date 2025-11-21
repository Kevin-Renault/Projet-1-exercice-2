import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from "./pages/country/country.component";
import { COUNTRY_NAME, ID } from './constants/constants.utils';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'country/:' + ID,
    component: CountryComponent
  },
  {
    path: 'country/:' + COUNTRY_NAME,
    component: CountryComponent
  },

  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
