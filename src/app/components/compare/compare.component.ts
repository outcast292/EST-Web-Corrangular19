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
  isAdded: boolean;
  isEmpty: boolean = true;
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
    onClick: function (mouseEvent, chart) {
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
    this.api.getData().subscribe((data) => {
      console.log(data);
      this.countries = data;
    });
    if (this.Selectedcountries.length = 0) {
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
  //add country to SelectedCountries
  async addCountry() {

    this.Selectedcountries.forEach(element => {
      if (element.country == this.country) {
        this.country = "";
        this.isAdded = true;
        this.isEmpty = false;
      }
      return;
    });
    this.isAdded = false;

    if (this.country != "") {
      this.Selectedcountries.push(await this.getCountryData(this.country));

      console.log("addCountry : " + this.Selectedcountries);

      this.isEmpty = false;
      this.country = "";
    }

    this.drawCharts();
  }
  //fix 
  getCountryData(country) {
    return new Promise(resolve => {
      setTimeout(() => {
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
          this.newDeath =
          {
            data: Object.values(this.historicalCountry.timeline.deaths),
            label: "Fatalités au " + this.historicalCountry.country,
            borderColor: color,
            backgroundColor: color,
            fill: false,
          };

          this.chartLabels = Object.keys(this.historicalCountry.timeline.cases);
          var x = { "country": country, "cases": this.newCase, "deaths": this.newDeath ,"color":color };

          console.log("getCountryData" + x);
          resolve(x);

        });
      }, 100);
    });
  }

  //charts update
  drawCharts() {
    console.log("drawCharts : " + this.Selectedcountries);

    this.cases = [];
    this.deaths = [];
    this.Selectedcountries.forEach(country => {
      this.cases.push(country.cases);
      this.deaths.push(country.deaths);
      this.chartLabels = Object.keys(this.historicalCountry.timeline.cases);
    });
  }
  //remove from dict
  removeCountry(e) {
    let index = this.Selectedcountries.indexOf(e);
    this.countries = this.countries.filter(item => item != e);
    this.Selectedcountries = this.Selectedcountries.filter((item, key) => key != index);
    this.drawCharts();
  }

  //remove all from dict
  removeAll() {
    this.Selectedcountries = [];
    this.drawCharts();
    this.isEmpty = true;
    this.isAdded = false;
  }
}
