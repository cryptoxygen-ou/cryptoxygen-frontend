import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { esLocale } from 'ngx-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation:ViewEncapsulation.None
 
})

export class DashboardComponent implements OnInit {
  
  constructor(
    
    private route: ActivatedRoute,
    private router: Router,
    public userservice: UserService,
    private messageservice: MessageService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  coin:any;
  status:any;
  status1:any;
  coinprice:any;
  msgs: Message[] = [];
  ethpervega:any;
  btcpervega:any;
  ltcpervega:any;
  ltccount:any;
  ethcount:any;
  btccount:any;
  usdcount:any;
  userrotalvgw:any;
  ethtotal:any;
  btctotal:any;
  ltctotal:any;

  eth(){
      this.userservice.getcoinprice('eth').subscribe(response => {
          this.status = response.json().success;
          if(this.status != false){
              this.coinprice = response.json().data['erc_tokens'];
          }
      });
      this.userservice.changeValueCoin('ETH');
  }
  btc(){
    this.userservice.getcoinpriceOnline('btc')
    .subscribe(response => {
      this.status = response.json().success;
      if(this.status != false)
      {
        // console.log(response.json().data.onebtc_to_vgw)
        this.coinprice = response.json().data.onebtc_to_erc20;
      }
    
    });

    this.userservice.changeValueCoin('BTC');

    

  }
  ltc(){
    this.userservice.getcoinpriceOnline('btc')
    .subscribe(response => {
      this.status = response.json().success;
      if(this.status != false)
      {
        // console.log(response.json().data.oneltc_to_vgw)
        this.coinprice = response.json().data.oneltc_to_erc20;
      }
    
    });



    this.userservice.changeValueCoin('LTC');

  }
  credit(id){

   
    // check if user has already done kyc and profile is active

    this.userservice.userkyc(id)
    .subscribe(response => {
      let result = response.json();
     
      this.status = response.json().success;
 
      if(this.status == true)
      {
          // check if user submmitted profile but not approve from admin
          let userstatus;
          if(response.json().data != undefined){

            userstatus  = response.json().data.kyc_status;
            if(userstatus == 1)
            {
              // this.sendEmailToTeam();
              this.router.navigate(['/payment']); 
             
            } 
            else
            {
              
              // user is ready to purchase
            // now redirect to form with all fields
            this.messageservice.add({severity:'info', summary:'KYC approval pending', detail:'Your KYC approval is pending'});
            setTimeout((router: Router) => {
               this.router.navigate(['/account']);
            }, 3000);  
            return false;
            }
          }else{
            this.messageservice.add({severity:'warn', summary:'KYC detail required', detail:'Redirecting ...'});
        setTimeout((router: Router) => {
          this.router.navigate(['/account']);
        }, 3000);   
  
          }
         
         
     
      }
      else
      {
        this.messageservice.add({severity:'warn', summary:'KYC detail required', detail:'Redirecting ...'});
        setTimeout((router: Router) => {
          this.router.navigate(['/account']);
        }, 3000);    
      }

  });

   
  }

  ngOnInit() {

    
    this.userservice.cast1.subscribe(coin => this.coin = coin);
    this.userservice.changeValue('dashboard');
   
    this.document.body.classList.add('dashboard');
    
    this.userrotalvgw = 0;

    this.userservice.getuservgw().subscribe(response => {
      // console.log(response)
      this.status = response.json().success;
      if(response.json().data != null)
      {
        this.userrotalvgw =   response.json().data
        
      }
      else
      {
        this.userrotalvgw = 0;
      }
    
    });
  
    this.userservice.getcoinpriceOnline('eth').subscribe(response => {
      this.status = response.json().success;
      if(this.status != false){
        
        let ethvgw = response.json().data.oneeth_to_erc20;
        let btcvgw = response.json().data.onebtc_to_erc20;
        let ltcvgw = response.json().data.oneltc_to_erc20;
        let usdvgw = response.json().data.oneerc20_to_doller;

        this.ethcount = ( 1 / ethvgw * this.userrotalvgw)
        this.btccount = ( 1 / btcvgw * this.userrotalvgw)
        this.ltccount = ( 1 / ltcvgw * this.userrotalvgw)
        this.usdcount = (usdvgw * this.userrotalvgw )
      }
    
    });


    this.userservice.getcoinprice('eth').subscribe(response => {
        this.status = response.json().success;
        if(this.status == true){
            this.coinprice = response.json().data['erc_tokens'];
        }
    });

    

    // get total eth sum



    this.userservice.changeValueCoin('ETH');

  }

  
 sendEmailToTeam(){
   this.userservice.sendMailForCreditCard().subscribe((res)=>{
    this.messageservice.add({severity:'info', summary:'Email Sent', detail:res.json().message});
   },(error)=>{
    this.messageservice.add({severity:'error', summary:'Error', detail:error.json().message});
   });
 }

}
