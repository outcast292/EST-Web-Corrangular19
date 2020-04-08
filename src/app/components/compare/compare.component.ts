import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  country;
  countries;
  chartOptions = {
    responsive: true
  };
  chartData = [];
  chartLabels = [];

  constructor(private api: ApiService) {

    this.api.getData().subscribe((data) => {
      this.countries = data;
    });

    this.api.getHistorical(this.country).subscribe((data) => {
      this.chartData = [{data: Object.values(this.country.timeline.cases),label:"Cas d'infection"},{data: Object.values(this.country.timeline.deaths),label:"fatalités"} ];
      this.chartLabels = Object.keys(this.country.timeline.cases);
      console.log(data);
    });

   }

  ngOnInit(): void {
  }

  onChartClick(event) {
    console.log(this.chartData);
    
  }



  getCountryLabels(){

    
      
  }

}
