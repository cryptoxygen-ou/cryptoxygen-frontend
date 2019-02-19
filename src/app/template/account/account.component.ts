import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../shared/interfaces/account';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { environment } from '../../../environments/environment';
import { Tree } from '@angular/router/src/utils/tree';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AccountComponent implements OnInit {
  CAPTCHA_KEY = environment.CAPTCHA.siteKey;
  countryArr:any[] = [];
  selectedCountry:any='';
  selfie_image:string;
  selfie_exist:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userservice: UserService,
    private messageservice: MessageService,
    @Inject(DOCUMENT) private document: Document
  ) { 
    
    this.loadFormScript();

  }
 
  accountdata = {} as Account;
  status:any;
  update:number;
  msgs: Message[] = [];
  seletedFile: any;
  doc:any;
  doc_img :any;
  userstatus:any;
  phoneCode:any='';
  selectedSelfie:any;
  captchaResponse:any;
  submit(f){
    // this.captchaResponse = document.getElementById("g-recaptcha-response");

    // if(this.captchaResponse == undefined || this.captchaResponse.value == undefined || this.captchaResponse.value == ""){
    //   this.messageservice.add({severity:'error', summary:'Login Failed', detail:'Captcha field is required.'});
    //   return false;
    //  }
    // f.value.google_auth_token= this.captchaResponse.value;
    if(this.update == 0){
      if(!this.seletedFile){
        this.messageservice.add({severity:'error', summary:'Document Required', detail:'Please upload document ...'});
        return false;
      }
      if(!this.selectedSelfie){
        this.messageservice.add({severity:'error', summary:'Document Required', detail:'Please upload selfie with document ...'});
        return false;
      }
      
       // insert kyc detail


       this.userservice.postinsertuserdatakyc(f.value).subscribe(response => {
          let result = response.json();
          if(result.success){ 

              // now upload image on insert
              if(this.seletedFile){
  
                 // now upload  
                 this.userservice.updateimage(this.seletedFile,'doc').subscribe(response1 =>{
                      let result1 = response1.json();
  
                      if(result1.success)
                      {
                        // this.messageservice.add({severity:'success', summary:'KYC information updated', detail:'Redirecting to dashboard ...'});
                      }
                      else
                      {
                        this.messageservice.add({severity:'error', summary:'Upload error', detail:'error while uploading image ...'});
                      }
  
                 })
               
              }
              if(this.selectedSelfie){
  
                 // now upload  
                 this.userservice.updateimage(this.selectedSelfie,'selfie')
                 .subscribe(response1 => {
                      let result1 = response1.json();
  
                      if(result1.success)
                      {
                        // this.messageservice.add({severity:'success', summary:'KYC information updated', detail:'Redirecting to dashboard ...'});
                      }
                      else
                      {
                        this.messageservice.add({severity:'error', summary:'Upload error', detail:'Error while uploading image ...'});
                      }
  
                 })
               
              }

              this.messageservice.add({severity:'success', summary:'Your KYC has been send for admin approval.', detail:'Redirecting to dashboard ...'});
              setTimeout((router: Router) => {
                this.router.navigate(['/dashboard']);
                return true;
              }, 3000);  
          }else{
            this.messageservice.add({severity:'error', summary:'Upload error', detail:result.message});
          }
        },(error)=>{
          this.messageservice.add({severity:'error', summary:'Upload error', detail:error.json().message});
        });
    }
    else{
      this.userservice.postupdateuserdatakyc(f.value).subscribe(response => {
        let result = response.json();
        if(result.success){
            // now hit update image
            if(this.seletedFile){
               // now upload  
               this.userservice.updateimage(this.seletedFile,'doc').subscribe(response1 => {
                    let result1 = response1.json();
                    if(result1.success){
                      // this.messageservice.add({severity:'success', summary:'KYC information updated', detail:'Redirecting to dashboard ...'});
                    }
                    else{
                      this.messageservice.add({severity:'error', summary:'Upload error', detail:'Error while uploading image ...'});
                    }
               })             
            }
            if(this.selectedSelfie){
               // now upload  
               this.userservice.updateimage(this.selectedSelfie,'selfie').subscribe(response1 => {
                    let result1 = response1.json();
                    if(result1.success){
                      // this.messageservice.add({severity:'success', summary:'KYC information updated', detail:'Redirecting to dashboard ...'});
                    }
                    else{
                      this.messageservice.add({severity:'error', summary:'Upload error', detail:'error while uploading image ...'});
                    }
               })             
            }
            this.messageservice.add({severity:'success', summary:'KYC information updated', detail:'Redirecting to dashboard ...'});
            setTimeout((router: Router) => {
                this.router.navigate(['/dashboard']);
                return true;
            }, 3000); 
        }
        else{
           // show error messages        
  
        }
      });
    }
  }

  ngOnInit() {
    this.userservice.fetchCountryList().subscribe((res)=>{
      this.countryArr = res.json().data;
  
    });
     

    let userdetail = this.userservice.currentUser;
    let id = userdetail.id;
    this.accountdata.f_name = userdetail.name
    this.accountdata.l_name = userdetail.last_name
    this.accountdata.country = userdetail.country
    this.accountdata.phone = userdetail.phone
  
    // console.log(userdetail)
    this.userservice.userkyc(id)
    .subscribe(response => {
      let result = response.json();
     
      this.status = response.json().success;
      if(this.status == true)
      {
       if(response.json().data != undefined){
          // get all data for this user
          let userstatus = response.json().data.kyc_status;
          
          this.userstatus = userstatus
          this.selectedCountry = response.json().data.country;
          let opt =  {
            value: response.json().data.country 
          }
          this.selfie_exist = true;
          this.selfie_image = response.json().data.selfie_upload;
          this.getOption(opt);
          this.accountdata = response.json().data;
          
          this.update = 1
          this.doc = true;
          this.doc_img = response.json().data.document_upload;
        }else{
          this.update = 0;
          this.userstatus = 0
        }
      }
      else
      {
        
        this.update = 0;
        this.userstatus = 0
      }
    });

    this.userservice.changeValue('dashboard');
    this.document.body.classList.add('dashboard');
  }


  upload(e,type)
  {

    let seletedFile: File = e.target.files[0];
  
    let validate = this.validateFile(seletedFile.name,e.target.id,seletedFile.size);
    if(validate === false){
      
      return false;
    }else{
      if(type=='doc'){

        this.seletedFile = seletedFile
      }else{
        this.selectedSelfie = seletedFile
      }

    }
  }

  validateFile(name: String,typeis,size) {
    size = Math.round((size/1000))/1024;
   
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if(typeis == "photo"){
      if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
  
        if(size <= 4){
          return true;
        }else{
          this.messageservice.add({severity:'error', summary:'Error', detail:'Document size should be less than 4 Mb.'});
          
          return false;
        }
      
      }
      else {
        this.messageservice.add({severity:'error', summary:'Error', detail:'Profile image format should be png or jpg.'});
        return false;
      }
    }else{
        if (ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
  
            if(size <= 4){
              return true;
            }else{
              this.messageservice.add({severity:'error', summary:'Error', detail:'Document size should be less than 4 Mb.'});
              return false;
            }
           
         }
        else {
          this.messageservice.add({severity:'error', summary:'Error', detail:'Document format should be doc,pdf,png or jpg'});
          return false;
        }
    }
  
    }


    getOption(ev){
      // console.log(ev.value);
      setTimeout(() => {
        
        let selectedOption = this.countryArr.filter(x=> x.id== ev.value);
        // console.log("selectedOption",selectedOption);
        if(selectedOption.length> 0)
          this.phoneCode = selectedOption[0].phonecode;
      }, 2000);
    }
    isPdf(url){
        if(url.lastIndexOf('.pdf')==-1){
            return false;
        }
        else{
          return true;
        }
    }
    public loadFormScript(): Promise<any> {
      return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://www.google.com/recaptcha/api.js';
        scriptElement.onload = resolve;
        
        document.body.appendChild(scriptElement);
      }).then(()=>{
       
      });
    }
}
