import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
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


  casesOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Cumul des cas confirmé​s par jour',
      position: 'bottom',
      fontColor: '#856c8b'
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

  pieChart: any = [];
  pieData = {};

  cases = [];
  deaths = [];

  chartLabels = [];

  dates;
  fromDate;
  toDate;
  isValideDate: boolean = true;


  onChartClick(event) {
    console.log(event);
  }


  constructor(private api: ApiService, private _router: Router) {
    if (CountryDetailsComponent.countryData == null) {
      this._router.navigate(['/country/']);
    }
    this.api.getHistorical(CountryDetailsComponent.countryName).subscribe((data) => {
      this.countryHistorical = data;

      this.cases = [
        {
          data: Object.values(this.selectedCountry.timeline.cases),
          label: "Cas d'infection",
          backgroundColor: '#fff0b3',
          borderColor: '#ffdc4d',
          pointBackgroundColor: '#ffd21a'
        }
      ];

      this.deaths = [
        {
          data: Object.values(this.selectedCountry.timeline.deaths),
          label: "fatalités",
          backgroundColor: '#cec4d1',
          borderColor: '#9d89a2',
          pointBackgroundColor: '#856c8b'
        }
      ];

      this.pieData = {
        datasets: [{
          data: [this.SelectedCountryData.cases, this.SelectedCountryData.deaths, this.SelectedCountryData.recovered],
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

      this.chartLabels = this.dates = Object.keys(this.selectedCountry.timeline.cases);
    });

  }

  ngOnInit(): void {
  }

  setCountryName(x) {
    CountryDetailsComponent.countryName = x;
  }
  setCountryData(x) {
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

  applyFilter() {

    if (this.fromDate != null && this.toDate != null) {
      this.isValideDate = true;
      if (new Date(this.fromDate).getTime() > new Date(this.toDate).getTime()) {
        [this.fromDate, this.toDate] = [this.toDate, this.fromDate];
      }
      if (this.fromDate == this.toDate) {
        this.chartLabels = [this.fromDate, this.fromDate];
      }
      else {
        this.chartLabels = this.dates.slice(this.dates.indexOf(this.fromDate), this.dates.indexOf(this.toDate) + 1);

      }
      this.cases = [
        {
          data: (this.fromDate != this.toDate) ? Object.entries(this.selectedCountry.timeline.cases).slice(this.dates.indexOf(this.fromDate), this.dates.indexOf(this.toDate) + 1).map(entry => entry[1]) : Object.entries(this.selectedCountry.timeline.cases).slice(this.dates.indexOf(this.fromDate), this.dates.indexOf(this.toDate) + 1).map(entry => entry[1]).concat(Object.entries(this.selectedCountry.timeline.cases).slice(this.dates.indexOf(this.fromDate), this.dates.indexOf(this.toDate) + 1).map(entry => entry[1])),
          label: "Cas d'infection",
          backgroundColor: '#fff0b3',
          borderColor: '#ffdc4d',
          pointBackgroundColor: '#ffd21a'
        }
      ];
      this.deaths = [
        {
          data: (this.fromDate != this.toDate) ? Object.entries(this.selectedCountry.timeline.deaths).slice(this.dates.indexOf(this.fromDate), this.dates.indexOf(this.toDate) + 1).map(entry => entry[1]) : Object.entries(this.selectedCountry.timeline.deaths).slice(this.dates.indexOf(this.fromDate), this.dates.indexOf(this.toDate) + 1).map(entry => entry[1]).concat(Object.entries(this.selectedCountry.timeline.deaths).slice(this.dates.indexOf(this.fromDate), this.dates.indexOf(this.toDate) + 1).map(entry => entry[1])),
          label: "fatalités",
          backgroundColor: '#cec4d1',
          borderColor: '#9d89a2',
          pointBackgroundColor: '#856c8b'
        }
      ];

    } else {
      this.isValideDate = false;
    }


  }


}

