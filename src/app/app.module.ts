import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryComponent } from './components/country/country.component';
import { Ng2SearchPipeModule } from 'node_modules/ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CountryDetailsComponent } from './components/country/country-details/country-details.component';
import { ChartsModule } from 'ng2-charts';
import { AproposComponent } from './components/apropos/apropos.component';


@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    HomeComponent,
    CountryDetailsComponent,
    AproposComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    ChartsModule
  ],
  exports: [],
  providers: [CountryDetailsComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
