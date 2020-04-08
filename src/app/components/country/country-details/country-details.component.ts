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
  chartOptions = {
    responsive: true,
    title:{
      display:true,
      text:'Cumul des cas confirmé​s et décés par jour',
      position:'bottom',
      fontColor: '#856c8b'
    },
  };
  chartData = [];

  chartLabels = [];

  onChartClick(event) {
    console.log(event);
  }



  constructor(private api: ApiService, private _router: Router) {
    if (CountryDetailsComponent.countryData == null) {
      this._router.navigate(['/country/']);
    }
    this.api.getHistorical(CountryDetailsComponent.countryName).subscribe((data) => {
      this.countryHistorical = data;
      //console.log(CountryDetailsComponent.countryData);
      //console.log(this.countryHistorical.timeline.cases);
      this.chartData= [
          {
              data: Object.values(this.selectedCountry.timeline.deaths),
              label:"fatalités",
              backgroundColor: '#cec4d1',
              borderColor:'#9d89a2',
              pointBackgroundColor:'#856c8b'
          },
          { 
            data: Object.values(this.selectedCountry.timeline.cases),
            label:"Cas d'infection",
            backgroundColor: '#fff0b3',
            borderColor:'#ffdc4d',
            pointBackgroundColor:'#ffd21a'
          }
        ];
      this.chartLabels = Object.keys(this.selectedCountry.timeline.cases);
    });
    //var chart = document.getElementById("LineChart");
    //console.log(chart);
   

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
    
    for (const [key, value] of Object.entries(this.selectedCountry.timeline.cases)) {
      if (value != 0)
        return key;
    }



  }
}
