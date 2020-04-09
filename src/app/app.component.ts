import { Component } from '@angular/core';
import { ApiService } from './api.service';
import{Router, NavigationEnd} from '@angular/router';
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "CORANGULAR19"
  constructor(public router: Router){   
    this.router.events.subscribe(event => {
       if(event instanceof NavigationEnd){
           gtag('config', 'UA-59187428-4', 
                 {
                   'page_path': event.urlAfterRedirects
                 }
                );
        }
     }
  )}


}
