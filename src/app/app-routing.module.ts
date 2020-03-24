import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalComponent } from './components/global/global.component';
import { CountryComponent } from './components/country/country.component';


const routes: Routes = [
  {
    path: "global",
    component: GlobalComponent
  },
  {
    path: "country",
    component: CountryComponent
  },
  {
    path: '',
    redirectTo: '/global',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/global',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
