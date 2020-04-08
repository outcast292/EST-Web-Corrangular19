import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   globalData;
   globalhist;
   casesOptions = {
    responsive: true,
    title:{
      display:true,
      text:'Cumul des cas confirmé​s par jour',
      position:'bottom',
      fontColor: '#856c8b'
    },
  };

  deathsOptions = {
    responsive: true,
    title:{
      display:true,
      text:'Cumul des décés par jour',
      position:'bottom',
      fontColor: '#856c8b'
    },
  };

  pieChart:any = [];
  pieData = {};

  cases = [];
  deaths = [];

  chartLabels = [];
 


  constructor(private api: ApiService) { 
    this.api.getGlobal().subscribe((data) =>{
      this.globalData = data;
      
      this.pieData = {

        datasets: [{
          data: [this.globalData.cases, this.globalData.deaths, this.globalData.recovered],
          backgroundColor: ["#ffc107", "#dc3545", "#28a745"]

        }],

        labels: [
          'Cas confirmés',
          'Déces',
          'Guèris'
        ]

      };

      this.pieChart = new Chart("canvas", {
        type: 'pie',
        data: this.pieData,
      }); 

    });
    this.api.getHistoricalALL().subscribe((data) =>{
      this.globalhist=data;
      this.cases = [
        {
          data: Object.values(this.globalhist.deaths),
          label: "fatalités",
          backgroundColor: '#cec4d1',
          borderColor:'#9d89a2',
          pointBackgroundColor:'#856c8b'
        }
      ];

      this.deaths = [
        {
          data: Object.values(this.globalhist.cases),
          label: "Cas d'infection",
          backgroundColor: '#fff0b3',
          borderColor:'#ffdc4d',
          pointBackgroundColor:'#ffd21a'
        }
      ];

      this.chartLabels = Object.keys(this.globalhist.cases);
      
    });

  }

  ngOnInit(): void {
  }

  onChartClick(event) {
    console.log(event);
  }
}
