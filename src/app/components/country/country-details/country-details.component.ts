import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  static countryName = "";
  static countryData;
  countryHistorical;
  public lineChartData: ChartDataSets[];

  constructor(private api: ApiService,private _router:Router,) {
    if(CountryDetailsComponent.countryData==null){
      this._router.navigate(['/country/']);
    }
    this.api.getHistorical(CountryDetailsComponent.countryName).subscribe((data) => {
      this.countryHistorical = data;
      //console.log(CountryDetailsComponent.countryData);
      //console.log(this.countryHistorical.timeline.cases);
    });
    //var chart = document.getElementById("LineChart");
    //console.log(chart);
    //this.lineChartData.concat(date:Object.values( this.countryHistorical.timeline.cases))

  }

  ngOnInit(): void {
  }

  setCountryName(x) {
    CountryDetailsComponent.countryName = x;
  }
  setCountryData(x) {
    console.log(x);

    CountryDetailsComponent.countryData = x;
  }
  get selectedCountry() {
    if (this.countryHistorical == null) return null;
    return this.countryHistorical;
  }
  get SelectedCountryData() {
    if (this.countryHistorical == null) return null;
    return CountryDetailsComponent.countryData;

  }

  get firstCaseDate() {
    if (this.selectedCountry == null) return "";
    //Object.keys(this.selectedCountry.timeline.cases)[0];
    for (const [key, value] of Object.entries(this.selectedCountry.timeline.cases)) {
      if (value != 0)
        return key;
    }
  }
}
