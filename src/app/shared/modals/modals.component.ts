
import { environment } from './../../../environments/environment';
import { Component, OnInit, TemplateRef, ViewEncapsulation, Input, AfterViewInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../../services/user.service';
import { GoogleService } from '../../services/google.service';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import * as $ from 'jquery';
@Component({
  selector: 'my-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ModalsComponent implements OnInit,AfterViewInit {
  @Input('text') text:any;
  @ViewChild('faModal') faModal;
  countryList: any[]= [];
  CAPTCHA_KEY :string= environment.CAPTCHA.siteKey;
  constructor(
    private messageservice: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public userservice: UserService,
    public googleService: GoogleService,
    private modalService: BsModalService) { 

    this.userservice.fetchCountryList().subscribe((res)=>{
      this.countryList = res.json().data;
    });
  }

  modalRef: BsModalRef;
  status:any;
  address:any;
  loginstatus:any;
  closemodal : any;
  message:any;
  loginmessage:any;
  invalidLogin:any;
  msgs: Message[] = [];
  loginusername:any;
  loginpassword:any;
  rememberMebtn:boolean=false;
  loginsubmit:boolean=true;
  signupSubmit:boolean=true;
  cmatched:boolean=false;
 loginEmail:string='';
 resendLink:boolean=false;
 captchaResponse:any;
 googleHTML:any;
 loginUsr:any;
 
 ngAfterViewInit(){
   
 }
  openModal(template: TemplateRef<any>) {
    
    this.loadFormScript();
   
   
    this.modalRef = this.modalService.show(template,
    Object.assign({}, { class: 'login_model' })
    );
    // document.getElementById('gAuth').setAttribute('data-sitekey',this.CAPTCHA_KEY);
    // document.getElementById('gAuthReg').setAttribute('data-sitekey',this.CAPTCHA_KEY);
  }

removeKey(){
// var elem = document.getElementsByClassName("g-recaptcha-response");
//  elem.parentElement.removeChild(elem);
}
  register(f){
    this.captchaResponse = $('#tab2 textarea.g-recaptcha-response').val();
   // console.log(f);
    // this will insert data

    if(this.captchaResponse == undefined || this.captchaResponse == ""){
      this.messageservice.add({severity:'error', summary:'Login Failed', detail:'Captcha field is required.'});
      this.signupSubmit = true;
      return false;
     }
    f.value.google_auth_token= this.captchaResponse;
    this.userservice.postinsertuserdata(f.value)
    .subscribe(response => {
      let result = response.json();
     
      // if(result && result.token)
      // {
      //      localStorage.setItem('token',result.token);
      //      this.messageservice.add({severity:'success', summary:'Registration Success', detail:'Please verify your email, Verification email has been sent to your email address'});
      //      setTimeout((router: Router) => {
      //         this.router.navigate(['/dashboard']);
      //         return true;
      //       }, 3000);    
      // }
      
             
      this.status = response.json().success;
      if(this.status == false)
      {
        this.signupSubmit = true
        this.loginstatus = false;
        this.messageservice.add({severity:'error', summary:'Registration Failed', detail:response.json().error});
        this.loginmessage = response.json().error
        
      }else{
        this.messageservice.add({severity:'success', summary:'Registration Success', detail:'Please verify your email and login.'});
        setTimeout(() => {
          
          this.modalRef.hide();
        }, 2000);
      }
   

  });
}

login(f){

  this.captchaResponse = $('#tab1 textarea.g-recaptcha-response').val();
   
   
   this.loginsubmit = false
  if(f.value.password != f.value.cpassword){
      this.cmatched = true;
      return false;
  }
  else{
      this.cmatched = false;
  }
  this.loginEmail = f.value.useremail;
  if(this.captchaResponse == "" || this.captchaResponse == undefined){
      this.messageservice.add({severity:'error',summary:'Login Failed', detail:'Captcha field is required.'});
      this.loginsubmit = true;
      return false;
  }
  f.value.google_auth_token= this.captchaResponse;
  this.userservice.submitLogin(f.value)
  .subscribe(response => {
    let result = response.json();
    if(result && result.token){
        this.loginUsr = result;
        this.loginUsr['input']=f.value;
        if(result.data.google2fa_status==1){
            this.modalRef.hide();
            this.modalRef = this.modalService.show(this.faModal,Object.assign({},{class: 'login_model google_auth_mdl'}));
        }
        else{
            this.redirectAfterLogin();
        } 
    }
      
     
      this.loginstatus = response.json().success;
      if(this.loginstatus == false){
         this.loginsubmit = true
         this.messageservice.add({severity:'error', summary:'Login Failed', detail:response.json().message});
       if(response.json().message == "Your email has not been verified."){
        this.loginsubmit = true
        this.resendLink = true;
       }
         
      }
  

  });
}
redirectAfterLogin(){
    localStorage.setItem('token',this.loginUsr.token);
    this.resendLink =false;
    this.userservice.generateEthAddress().subscribe((res)=>{
        if(res.json().data != undefined){
            if(res.json().data.address != undefined){
              this.address = res.json().data.address;
            }
        }
    });
    
    this.modalRef.hide();
    this.messageservice.add({severity:'success', summary:'Login Success', detail:'Now redirecting to dashboard....'});
    
    setTimeout((router: Router) => {
        if(this.loginUsr.input.remberMe){
            let remember = {
                auth  : btoa(this.loginUsr.input.userpass),
                usern : btoa(this.loginUsr.input.useremail)
            }
            localStorage.setItem('remember',JSON.stringify(remember));
        }
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
        
        this.router.navigate([returnUrl || '/dashboard']);
        return true;
    }, 3000);
}
forgotpassword(template)
{
    this.modalRef.hide();
    
    this.modalRef = this.modalService.show(template,
    Object.assign({}, { class: 'login_model signup_model forget_model' })

  );  
}
forgotsubmit(f)
{
  this.userservice.forgotPassword(f.value)
  .subscribe(response => {
    // console.log(response)
    this.status = response.json().success;
    if(this.status != false)
    {
       let successmessage = response.json().message;
       this.messageservice.add({severity:'success', summary:'Mail Sent', detail:successmessage});
       setTimeout((router: Router) => {
       this.modalRef.hide();
       },3000);
    }
    else
    {
       let errormessage = response.json().message;
       this.messageservice.add({severity:'error', summary:'Error', detail:errormessage});
 
   }
  
  });

}
    verify2fa(f){
        console.info("******************************************")
        this.googleService.verifySigninToken(f.value.token,this.loginUsr.token).subscribe((resp:any) => {
            console.log("verify2fa ->",resp);
            if(resp.status){
                this.redirectAfterLogin();
            }
            else{
                this.messageservice.add({severity:'error', summary:'Error', detail:resp.message});
            }
        },(error)=>{
            this.messageservice.add({severity:'error', summary:'Error', detail:error.message});
        });
    }
  ngOnInit() {

    let rember = JSON.parse(localStorage.getItem('remember'));
    // console.log(rember)
    if(rember){
      
        this.loginusername = atob(rember.usern);
        this.loginpassword = atob(rember.auth);
        this.rememberMebtn = true;

    }
  }
  checkpassword(c,p){
    if(c != p){
      this.cmatched = true;
      return false;
    }else{
      this.cmatched = false;
    }
  }
  resendemail(){
    this.userservice.resendVerificationEmail(this.loginEmail).subscribe((res)=>{
      this.resendLink = false;
      this.messageservice.add({severity:'success', summary:'Mail Sent', detail:res.json().message});
    },(error)=>{
      this.messageservice.add({severity:'error', summary:'Error', detail:error.json().message});
    });
  }
  
  public loadFormScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.google.com/recaptcha/api.js';

      scriptElement.async = true;
      scriptElement.defer = true;
      scriptElement.onload = resolve;
      document.head.appendChild(scriptElement);
      document.body.appendChild(scriptElement);


    }).then(()=>{
      
    });
  }

}
