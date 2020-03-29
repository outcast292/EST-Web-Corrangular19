import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  static countryName="";
  countryHistorical;

  constructor(private api:ApiService) { 
    this.api.getHistorical(CountryDetailsComponent.countryName).subscribe((data) =>{
      this.countryHistorical = data;
      console.log(this.countryHistorical);
    });
    var chart = document.getElementById("LineChart");
    console.log(chart);

  }

  ngOnInit(): void {
  }

  setCountryName(x)
  {
      CountryDetailsComponent.countryName = x;
  }
  get selectedCountry(){
    return CountryDetailsComponent.countryName;
  }

}
