import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {
  data;
  constructor(){
    fetch('https://corona.lmao.ninja/all')
      .then(response => response.json())
      .then(data => {
        this.data = data; // Prints result from `response.json()` in getRequest
      })
      .catch(error => console.error(error))
  }

  ngOnInit(): void {
  }

}
