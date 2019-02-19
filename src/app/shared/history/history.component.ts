import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  status: any;
  btctrans: any;
  ethtrans: any;
  ltctrans: any;
  bnktrans: any
  constructor(
    public userservice: UserService,
  ) { }

  ngOnInit() {  

    this.userservice.gettransactions('btc')
    .subscribe(response => {
      this.status = response.json().success;
      if(this.status != false)
      {
        this.btctrans = response.json().data;
       
      }
    
    });

    this.userservice.gettransactions('eth')
    .subscribe(response => {
      this.status = response.json().success;
      if(this.status != false)
      {
        this.ethtrans = response.json().data;
       
      }
    
    });

    this.userservice.gettransactions('ltc')
    .subscribe(response => {
      this.status = response.json().success;
      if(this.status != false)
      {
       
        this.ltctrans = response.json().data;
       
      }
    
    });

    this.userservice.gettransactions('bnk')
    .subscribe(response => {
      // console.log(response.json())
      this.status = response.json().success;
      if(this.status != false)
      {
        // console.log("here ")
        this.bnktrans = response.json().data;
       
      }
    
    });



  }

}
