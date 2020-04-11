import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  country;
  countries;
  Selectedcountries = [];
  isAdded:boolean;
  isEmpty:boolean = true;
  historicalCountry;
  cases = [];
  deaths = [];

  newCase;
  newDeath;
  
  casesOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Cumul des cas confirmé​s par jour',
      position: 'bottom',
      fontColor: '#856c8b'
    },
    onClick : function(mouseEvent,chart){
        console.log(chart);
    },
  };

  deathsOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Cumul des décés par jour',
      position: 'bottom',
      fontColor: '#856c8b'
    },
  };

  chartLabels;
  chartOptions = {
    responsive: true
  };

  constructor(private api: ApiService) {
    this.api.getData().subscribe((data) =>{
      console.log(data);
      this.countries = data;
    });
    if(this.Selectedcountries.length = 0) {
      this.isEmpty = true;
    }
   }

  ngOnInit(): void {
  }

  get RandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  addCountry(){
    if(this.Selectedcountries.includes(this.country)){
      this.country="";
      this.isAdded = true;
      this.isEmpty = false;

      return;
    }
    if(this.country != ""){
      this.Selectedcountries.push(this.country);
      this.isEmpty = false;
      this.drawCharts();
      this.country="";
    }
    
  }

  drawCharts(){
    this.cases=[];
    this.deaths=[];
    this.Selectedcountries.forEach(country => {

      this.api.getHistorical(country).subscribe((data) => {
        this.historicalCountry = data;
  
        var color = this.RandomColor;
        this.newCase = {
          data: Object.values(this.historicalCountry.timeline.cases),
          label: "Cas d'infection au " + this.historicalCountry.country,
          borderColor: color,
          backgroundColor: color,
          fill: false,
        };
  
        this.cases.push(this.newCase);
  
        this.newDeath =
        {
          data: Object.values(this.historicalCountry.timeline.deaths),
          label: "Fatalités au " + this.historicalCountry.country,
          borderColor: color,
          backgroundColor: color,
          fill: false,
        };
        this.deaths.push(this.newDeath)
  
        this.chartLabels = Object.keys(this.historicalCountry.timeline.cases);
      });



    })
  }
  removeCountry(e){
    let index = this.Selectedcountries.indexOf(e);
    this.countries = this.countries.filter(item => item !=e);
    this.Selectedcountries = this.Selectedcountries.filter((item,key) =>  key!=index);
    this.drawCharts();
}
}
