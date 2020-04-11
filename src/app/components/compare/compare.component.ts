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

  country="usa";
  countries;

  historicalCountry;
  cases;
  deaths;

  casesChart:any ;

  chartLabels;
  chartOptions = {
    responsive: true
  };

  constructor(private api: ApiService) {
    this.api.getHistorical(this.country).subscribe((data) => {
      this.historicalCountry = data;
      console.log(data);

      this.cases = [
        {
          data: Object.values(this.historicalCountry.timeline.cases),
          label: "Cas d'infection",
          backgroundColor: '#fff0b3',
          borderColor: '#ffdc4d',
          pointBackgroundColor: '#ffd21a'
        }
      ];
      console.log(this.cases);

      this.deaths = [
        {
          data: Object.values(this.historicalCountry.timeline.deaths),
          label: "fatalités",
          backgroundColor: '#cec4d1',
          borderColor: '#9d89a2',
          pointBackgroundColor: '#856c8b'
        }
      ];
      console.log(this.deaths);

      this.chartLabels = Object.keys(this.historicalCountry.timeline.cases);
      console.log(this.chartLabels);
    });
   }

  ngOnInit(): void {
  }

  
  addCountry(){
    
    
  }

}
