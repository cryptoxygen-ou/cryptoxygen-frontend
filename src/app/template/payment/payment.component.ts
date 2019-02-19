import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
      public userservice: UserService,
      private messageservice: MessageService,
      private router: Router,
      @Inject(DOCUMENT) private document: Document

  ) {}
  paybtnStatus: boolean=false;
  check:any;
  mynounce:any;
  nounce:any;
  status:any
  usd:any
  vgw:any=1
  tempprice:any
  onevgw_to_doller:any
  msgs: Message[] = [];
  years: any[] =[];
  besRateEnabled:boolean=false;
  result:any;
  address: any;
  copytext:string;
  textToCopy:any;
  
  ngOnInit() {
    this.copytext = "Copy"
    this.userservice.getAddress('ETH').subscribe(response => {
      this.status = response.json().success;
      if(this.status == false)
      {
     
          this.address = "ETH address will be ready in 1-2 minutes";
       
        
      }else{
        this.address = response.json().data['address'];
      }
    });

    
   
   
    for(let y = new Date().getFullYear(); y<= new Date().getFullYear()+50; y++ ){
      
      this.years.push(y);
    }
    
    this.mynounce = '';
    this.userservice.changeValue('dashboard');
    this.document.body.classList.add('dashboard');
   // this.loadSquareScript();

   this.userservice.getcoinpriceOnline('')  // no coin imacting any operation
   .subscribe(response => {
     this.status = response.json().success;
     if(this.status != false){
        this.onevgw_to_doller = response.json().data.oneerc20_to_doller
        this.usd = this.onevgw_to_doller
        this.tempprice = this.onevgw_to_doller

     }
    })



  }

  change1(){
    if(isNaN(this.usd) || isNaN(this.vgw)){
        this.usd = this.tempprice
        this.vgw = 1
        this.messageservice.add({severity:'error', summary:'Error', detail:'Enter valid value'});
        return true

    }
    this.vgw = Math.round(this.usd/this.onevgw_to_doller * 100000) / 100000
    
  }
  change2()
  {
    if(isNaN(this.usd) || isNaN(this.vgw))
    {
        this.usd = this.tempprice
        this.vgw = 1
        this.messageservice.add({severity:'error', summary:'Error', detail:'Enter valid value'});
        return true

    }

    this.usd = Math.round(this.onevgw_to_doller * this.vgw * 100000) / 100000
  }


 change()
 {

  if(this.usd <= 0 || this.vgw <= 0)
  {
      this.messageservice.add({severity:'error', summary:'Error', detail:'value cannot be 0'});
      this.usd = this.tempprice
      this.vgw = 1
      this.paybtnStatus= false;
      return true
  }


 }

  ngAfterContentInit(){

  }

  // public loadFormScript(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const scriptElement = document.createElement('script');
  //     scriptElement.src = './assets/js/payment.js';
  //     scriptElement.onload = resolve;
  //     document.body.appendChild(scriptElement);
  //   });
  // }
  public loadFormScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://bestrate.org/brw_v2/widget.bestrate.js';
      scriptElement.onload = resolve;
      
      document.body.appendChild(scriptElement);
    }).then(()=>{
      this.loadFormScript1();
    });
  }
  public loadFormScript1(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML= 'BRWidget.init("bestrate-widget", "3e2f06b250d853c6ce2ed924e1d8ee72");';
      scriptElement.onload = resolve;
      
      document.body.appendChild(scriptElement);
    });
  }

  // public loadSquareScript(): Promise<any> {
  //     return new Promise((resolve, reject) => {
  //       const scriptElement = document.createElement('script');
  //       scriptElement.src = 'https://js.squareup.com/v2/paymentform';
  //       scriptElement.onload = resolve;
  //       document.body.appendChild(scriptElement);
  //     });
  //   }


//   pay(f)
//   {

//  this.paybtnStatus= true;


//     let price = this.usd
    


//     if(isNaN(this.usd) || isNaN(this.vgw))
//     {
//         this.usd = this.tempprice
//         this.vgw = 1
//         this.paybtnStatus= false;
//         this.messageservice.add({severity:'error', summary:'Error', detail:'Enter valid value'});
//         return true

//     }


//     if(price <= 0)
//     {
//         this.paybtnStatus= false;
//         this.messageservice.add({severity:'error', summary:'Error', detail:'Enter Price greater than 0'});
//         return true
//     }

//     // if(price < 1)
//     // {
//     //     this.messageservice.add({severity:'error', summary:'Error', detail:'Enter Price more than $1'});
//     //     return true
//     // }

//     let nonce =  document.getElementById('card-nonce').attributes.getNamedItem('value').value;

//     // Now pass this info to node backend ro process this information
    
//     this.userservice.submitpayment(nonce,price,this.vgw)
//     .subscribe(response => {
//       this.status = response.json().success;
//       if(this.status != false)
//       {
//          this.paybtnStatus= true;
//           // now notify user and redirect to dashboard
//           this.messageservice.add({severity:'success', summary:'Success', detail: response.json().message});
//           setTimeout((router: Router) => {
            
//             this.router.navigate(['/dashboard']);
//             return true;
//           }, 2000); 
//       }
//       else
//       {
//          this.paybtnStatus= false;
//           this.messageservice.add({severity:'error', summary:'Error', detail:response.json().message});
//       }
//     },(error)=>{
//       this.paybtnStatus= false;
//         this.messageservice.add({severity:'error', summary:'Error', detail:error.json().message});
//     });

//   }  
  
  
  pay(val){
    console.log(val);
    this.paybtnStatus= true;


        let price = this.usd
        
    
    
        if(isNaN(this.usd) || isNaN(this.vgw))
        {
            this.usd = this.tempprice
            this.vgw = 1
            this.paybtnStatus= false;
            this.messageservice.add({severity:'error', summary:'Error', detail:'Enter valid value'});
            return true
    
        }
    
    
        if(price <= 0)
        {
            this.paybtnStatus= false;
            this.messageservice.add({severity:'error', summary:'Error', detail:'Enter Price greater than 0'});
            return true
        }
    
        if(price < 1)
        {
            this.messageservice.add({severity:'error', summary:'Error', detail:'Enter Price more than $1'});
            return true
        }
     val.value.price  = price;
     val.value.exp_month = val.value.exp_date_mm;
     val.value.exp_year  = val.value.exp_date_yy.substr(2,2);
     this.userservice.payment(val.value).subscribe((res)=>{

      this.status = res.json().success;
      if(this.status != false)
            {
      this.messageservice.add({severity:'success', summary:'Success', detail: res.json().message});
                setTimeout((router: Router) => {
                  
                  this.router.navigate(['/dashboard']);
                  return true;
                }, 2000); 

              }else{
                this.paybtnStatus= false;
                this.messageservice.add({severity:'error', summary:'Error', detail:res.json().message});
              }

     },(error)=>{
            this.paybtnStatus= false;
              this.messageservice.add({severity:'error', summary:'Error', detail:error.json().message});
          });
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
}



