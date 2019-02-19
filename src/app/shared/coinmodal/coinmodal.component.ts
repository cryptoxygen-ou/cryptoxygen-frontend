import { Component, TemplateRef, OnInit, ViewEncapsulation, Input, Inject } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserService } from '../../services/user.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-coinmodal',
  templateUrl: './coinmodal.component.html',
  styleUrls: ['./coinmodal.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CoinmodalComponent implements OnInit {
  @Input('coin') coin:any
  result:any;
  constructor(
    private messageservice: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public userservice: UserService,
    private modalService: BsModalService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  modalRef: BsModalRef;
  status: any;
  address: any;
  coinprice:any;
  copytext:string;
  totalvgw:any;
  totalcoin:any;
  mincoin:any
  
  openModal(template: TemplateRef<any>) {
    if(this.coin == "ETH"){
     this.userservice.generateEthAddress().subscribe((res)=>{
         if(res.json().data != undefined){
              if(res.json().data.address != undefined){
                this.address = res.json().data.address;
              }
         }
     });
    }
    this.document.body.classList.add('common_model_open');
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'comn_model wallet_add login_model' })
    );
  }
  copyToClipboard() {
    this.result = this.copyTextToClipboard(this.address);
    if (this.result) {
      this.messageservice.add({severity:'success', summary:'copied', detail:''});
      this.copytext = "Copied"
      setTimeout((router: Router) => {
        this.copytext = "Copy"
      }, 3000);     
    }
 }
  copyTextToClipboard(text) {
  var txtArea = document.createElement("textarea");
  txtArea.id = 'txt';
  txtArea.style.position = 'fixed';
  txtArea.style.top = '0';
  txtArea.style.left = '0';
  txtArea.style.opacity = '0';
  txtArea.value = text;
  document.body.appendChild(txtArea);
  txtArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    // console.log('Copying text command was ' + msg);
    if (successful) {
      return true;
    }
  } catch (err) {
    console.log('Oops, unable to copy');
  } finally {
    document.body.removeChild(txtArea);
  }
  return false;
}

  ngOnInit() {
    this.totalcoin = 0;
    this.copytext = "Copy"
    // console.log(this.coin);

  //  console.log(this.coin)
    if(this.coin == 'ETH')
    {
        this.mincoin = 0.2
    }
    else if(this.coin == 'BTC' )
    {
      this.mincoin = 0.01
    }
    else if(this.coin == 'LTC')
    {
      this.mincoin = 1
    }


    this.userservice.getAddress(this.coin)
    .subscribe(response => {
      this.status = response.json().success;
      if(this.status == false)
      {
        if(this.coin == "ETH"){
          this.address = "ETH address will be ready in 1-2 minutes";
        }else{

          this.address = 'Fetching address please wait ...';
        }
      }
      else
      {
        this.address = response.json().data['address'];
      }
      
     

    });



  }

  getvgwvalue(event: any)
  {
     let coinval = event.target.value;

      


     // get current price of coin 

     let mycoin = this.coin.toLowerCase();





    //  this.userservice.getcoinprice(this.coin.toLowerCase())
    //  .subscribe(response => {
    //    this.status = response.json().success;
    //    if(this.status != false)
    //    {
    //      this.totalvgw = response.json().data['vgw_tokens'];
    //       // now calculate total price

    //      this.totalcoin = this.totalvgw * coinval;
    //      console.log(this.totalcoin);

    //    }

    //   });


    this.userservice.getcoinprice('eth')  // no coin imacting any operation
    .subscribe(response => {
      console.log(response);
      
      this.status = response.json().success;
      if(this.status != false)
      {
        // console.log(response.json().data.oneltc_to_vgw)
        if(mycoin == 'btc')
        {
          this.totalvgw = response.json().data.onebtc_to_erc20;
        }
        else if(mycoin == 'ltc')
        {
          this.totalvgw = response.json().data.oneltc_to_erc20;
        }
        else if(mycoin == 'eth')
        {
          this.totalvgw = response.json().data.erc_tokens;
        }
        this.totalcoin = Math.round(this.totalvgw * coinval * 100000 ) / 100000 ;
      }
    
    });







  }


  

}
