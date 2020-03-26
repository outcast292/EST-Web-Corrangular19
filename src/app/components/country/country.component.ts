import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {

  data;
  searchText;
  clickedVar: boolean = false;
  selectedCountry;

  constructor(private _router:Router){
    fetch('https://corona.lmao.ninja/countries')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.data = data; // Prints result from `response.json()` in getRequest
      })
      .catch(error => console.log('error'))
  }

  ngOnInit(): void {
  }

  showDetails(d){
    this._router.navigateByUrl("/details-country" );
  }

}
