import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "https://corona.lmao.ninja/v2/";
  historical = "https://corona.lmao.ninja/v2/historical/";

  constructor(private http: HttpClient) { }


  getData(){
    return this.http.get(`${this.url}countries`, );
  }

  getHistorical(country){
    return this.http.get(`${this.historical}` + country, );
  }

  getGlobal(){
    return this.http.get(`${this.url}all`,)
  }
  getHistoricalALL(){
    return this.http.get(`${this.historical}all`, );
  }

}
