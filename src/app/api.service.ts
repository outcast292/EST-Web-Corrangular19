import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  getData(){
    return this.http.get("https://coronavirus-19-api.herokuapp.com/all");
  }
}
