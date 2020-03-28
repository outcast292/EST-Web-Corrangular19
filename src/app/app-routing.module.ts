import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  
  {
    path: "country",
    component: CountryComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
