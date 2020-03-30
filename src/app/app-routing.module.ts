import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { HomeComponent } from './components/home/home.component';
import { CountryDetailsComponent } from './components/country/country-details/country-details.component';
import { AproposComponent } from './components/apropos/apropos.component';


const routes: Routes = [
  
  {
    path: "country",
    component: CountryComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
    {
    path: "apropos",
    component: AproposComponent,
  },
  {
    path: "country-details",
    component: CountryDetailsComponent,
  },
  {
    path:'',
    redirectTo: "/home",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
