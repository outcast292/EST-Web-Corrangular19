import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { CountryDetailsComponent } from './country-details/country-details.component';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers:[ApiService]
})
export class CountryComponent implements OnInit {

  data;
  searchText;
  clickedVar: boolean = false;
  selectedCountry;

  constructor( private api:ApiService, 
               private _router:Router,
               private details:CountryDetailsComponent ){
      this.api.getData().subscribe((data) =>{
        this.data = data;
      });
  }

  ngOnInit(): void {
  }

  showDetails(d){
    this.details.setCountryName(d.country);
    this.details.setCountryData(d);

    this._router.navigate(['/country-details/']);
  }
  

}
