import { Component, OnInit } from '@angular/core';
import { Address } from '../interfaces/address';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-erc',
  templateUrl: './erc.component.html',
  styleUrls: ['./erc.component.css']
})
export class ErcComponent implements OnInit {

  addressdata = {} as Address;

  update: Number;
  status:any;
  constructor(
    private messageservice: MessageService,
    public userservice: UserService,
  ) { }

 // here insert or update
  
 submit(f)
 {
    this.userservice.updateErcAddress(f.value.address,this.update)
    .subscribe(response => {
      let result = response.json();
      if(result.success)
      {
          this.update = 1;
         
          let message = response.json().message;
          this.addressdata = response.json().data;

         

          this.messageservice.add({severity:'success', summary:'Success', detail:message});


          // show message and pass address value to
          // this.addressdata = response.json().data; 
      }
      else
      {
        let message = response.json().message;
        this.messageservice.add({severity:'error', summary:'Success', detail:message});

        
      }
    })
 }



  ngOnInit() {

    this.userservice.userErcAddress()
    .subscribe(response => {
      this.status = response.json().success;
      if(this.status == true)
      {
          // get all data for this user

          this.addressdata = response.json().data;
          this.update = 1
        
      }
      else
      {
        this.update = 0;
      }
    });

  }

}
