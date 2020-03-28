import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

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

  constructor(private api:ApiService){

      this.api.getData().subscribe((data) =>{
        this.data = data;
      });

  }

  ngOnInit(): void {
  }

  showDetails(d){
    console.log(d);
  }
  

}
