import { UserService } from '../../services/user.service';
import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { GoogleService } from '../../services/google.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-google-auth',
    templateUrl: './google-auth.component.html',
    styleUrls: ['./google-auth.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoogleAuthComponent implements OnInit {
    modalRef: BsModalRef;
    constructor(private userservice:UserService,
        private modalService: BsModalService,
        private googleservice:GoogleService,
        private messageservice: MessageService,
        private router:Router
    ) { }

    msgs: Message[] = [];

    qrImage:any
    qrSecret:any
    google:any
    mykey:any
    ngOnInit() {
      // this.userservice.changeValueFooter(false);
    }


    openModal(template: TemplateRef<any>) {

        // now hit api that will return image and secret

        // console.log("test")

        this.googleservice.getQrimage().subscribe(response => {
            this.qrImage = response.json().qrImgUrl
            this.qrSecret = response.json().secret
            this.mykey = this.qrSecret 
            //  console.log(response)
        },(error)=>{
            this.messageservice.add({severity:'error', summary:'Error', detail:error.json().message});
        })

        this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'login_model google_auth_enabled' }));
    }



    verify(f){

      console.log(f.value.token)
      // verify if this token is valid or not

      this.googleservice.verifyToken(this.qrSecret,f.value.token).subscribe(response => {

          console.log(response.json().status)

          if(response.json().status){
              this.messageservice.add({severity:'success', summary:'Verified', detail:response.json().message});
              setTimeout((router: Router) => {
                  this.router.navigate(['/settings']);
                  this.googleservice.changeValueGoogle2fa(true);
                  this.modalRef.hide();
                  return true;
              }, 3000); 
          }
          else{
              this.messageservice.add({severity:'error', summary:'Error', detail:"An error has been occured"});
          }
          //  console.log(response)
      },(error)=>{
          this.messageservice.add({severity:'error', summary:'Error', detail:error.json().message});
      }
    )}
}



