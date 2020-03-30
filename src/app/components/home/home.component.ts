import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   globalData;
   globalhist;
   chartOptions = {
    responsive: true
  };
  chartData = [];

  chartLabels = [];
 


  constructor(private api: ApiService) { 
    this.api.getGlobal().subscribe((data) =>{
      this.globalData = data;
    });
    this.api.getHistoricalALL().subscribe((data) =>{
      this.globalhist=data;
      this.chartData = [{data: Object.values(this.globalhist.cases),label:"Cas d'infection"},{data: Object.values(this.globalhist.deaths),label:"fatalités"} ];
      this.chartLabels = Object.keys(this.globalhist.cases);
      
    });

  }

  ngOnInit(): void {
  }

  onChartClick(event) {
    console.log(event);
  }
}
