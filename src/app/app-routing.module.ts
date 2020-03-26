import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { PreventionComponent } from './components/prevention/prevention.component';


const routes: Routes = [
  {
    path: "country",
    component: CountryComponent,
  },
  {
    path: "prevention",
    component: PreventionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
