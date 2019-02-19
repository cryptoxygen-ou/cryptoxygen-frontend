import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from '../../services/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GoogleService } from '../../services/google.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-google-auth-dis',
  templateUrl: './google-auth-dis.component.html',
  styleUrls: ['./google-auth-dis.component.css']
})
export class GoogleAuthDisComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    animated: true,
    class: "disable_google_auth"
  };
  constructor(private userservice:UserService,
    private modalService: BsModalService,
    private googleservice:GoogleService,
    private messageservice: MessageService,
    private router:Router
  ) { }

  msgs: Message[] = [];


  ngOnInit() {
    // this.userservice.changeValueFooter(false);
  }


   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);

    // now send sms




  }


  disable(f)
  {

    console.log(f.value.token)
    // verify if this token is valid or not

    this.googleservice.disableGoogle(f.value.token)
    .subscribe(response => {
     
      console.log(response)
      if(response.json().status)
      {
        this.messageservice.add({severity:'success', summary:'Success', detail:response.json().message});

    
        setTimeout((router: Router) => {
          this.router.navigate(['/settings']);
          this.googleservice.changeValueGoogle2fa(false);
          this.modalRef.hide();
          return true;
        }, 3000);    

      }
      else
      {
        this.messageservice.add({severity:'error', summary:'Error', detail:'An error has been occured'});

      }



    },(error)=>{
      this.messageservice.add({severity:'error', summary:'Error', detail:error.json().message});
    })


  }


}
