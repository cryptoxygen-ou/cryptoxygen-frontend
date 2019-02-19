import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricetimer',
  templateUrl: './pricetimer.component.html',
  styleUrls: ['./pricetimer.component.css']
})
export class PricetimerComponent implements OnInit {
  @Input('coin') coin:any

  constructor(
    public userservice: UserService,

  ) { }

  status:any;
  coinenddate:any;
  total:any;

  ngOnInit() {


    this.userservice.getcoinprice('eth')
    .subscribe(response => {
      // console.log(response)
      this.status = response.json().success;
      if(this.status == true)
      {
        
        this.coinenddate = response.json().data['end_date'];
        
        
      }
    
    });


    this.userservice.getcoinTotalcollection(this.coin)
    .subscribe(response1 => {
      // console.log(response)
      this.status = response1.json().success;
      if(this.status == true)
      {
          // console.log(response1.json())
           this.total = response1.json().data;
          
      }
    
    });



  }

  ngAfterContentInit(){
    setTimeout((router: Router) => {
      this.loadFormScript();
     },1500);
 }

 public loadFormScript(): Promise<any> {
   return new Promise((resolve, reject) => {
     const scriptElement = document.createElement('script');
     scriptElement.src = './assets/js/timer-dash.js';
     scriptElement.onload = resolve;
     document.body.appendChild(scriptElement);
   });
 }

}
