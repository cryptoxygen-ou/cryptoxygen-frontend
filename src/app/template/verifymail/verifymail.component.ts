import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DOCUMENT } from '@angular/platform-browser';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
@Component({
  selector: 'app-verifymail',
  templateUrl: './verifymail.component.html',
  styleUrls: ['./verifymail.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class VerifymailComponent implements OnInit {
  userid : any;
  msgs: Message[] = [];
  status:any;
  statusText:any = "Thanks for your email confirmation, Redirecting to home page ... "
  modalRef: BsModalRef;
  constructor(
    public userservice: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private messageservice: MessageService,
    @Inject(DOCUMENT) private document: Document,
    private modalService: BsModalService

  ) { }

  ngOnInit() {
    this.document.body.classList.add('bgWhite');
    this.route.params.subscribe(params => {
      //  console.log(params);
       if (params['id']) { 
           this.userid = params['id']
       }
       else{
         this.router.navigate(['/']);
       }
     });

     // now verify mail of this user
     


     this.userservice.verifymail(this.userid).subscribe(response => {
       console.log("verify email resp -> ",response);
       this.status = response.json().success;
       if(this.status != false){
          console.log("resp status ->",this.status);
          this.statusText = "Thanks for your email confirmation, Redirecting to home page ... ";
           let successmessage = response.json().message;
           this.messageservice.add({severity:'success', summary:'Success', detail:successmessage});
           setTimeout((router: Router) => {
             this.router.navigate(['/']);
             return true;
           }, 3000); 
       }
       else{
         let errormessage = response.json().message;
         this.statusText = errormessage;
         this.messageservice.add({severity:'error', summary:'Error', detail:errormessage});
       }
      })
  }


  ngOnDestroy(){
    this.document.body.classList.remove('bgWhite');
  }
  resendemail(det){
    this.modalRef.hide();
    this.userservice.resendVerificationEmail(det.value.email).subscribe((res)=>{
      // this.resendLink = false;
      this.messageservice.add({severity:'success', summary:'Mail Sent', detail:res.json().message});
    },(error)=>{
      this.messageservice.add({severity:'error', summary:'Error', detail:error.json().message});
    });
  }
  openPop(template){
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'login_model signup_model forget_model'}));  
  }
}
