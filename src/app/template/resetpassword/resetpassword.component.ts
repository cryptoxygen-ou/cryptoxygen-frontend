import { DOCUMENT } from '@angular/platform-browser';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserService } from '../../services/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ResetpasswordComponent implements OnInit {

  userid : any;
  msgs: Message[] = [];
  status:any;
  constructor(
    public userservice: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private messageservice: MessageService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.document.body.classList.add('bgWhite');
    this.route.params.subscribe(params => {
     // console.log(params);
      if (params['id']) { 
          this.userid = params['id']
      }
      else
      {
        this.router.navigate(['/']);
      }
    });
  }

  resetpassword(f)
  {
    // console.log(f.value,this.userid)
    if(f.value.pass != f.value.cpass)
    {
      this.messageservice.add({severity:'error', summary:'Error', detail:'password and confirm password should be same'});
      return false;
    }

    this.userservice.resetPassword(this.userid,f.value.pass)
      .subscribe(response => {
        this.status = response.json().success;
        if(this.status != false)
        {
            let successmessage = response.json().message;
            this.messageservice.add({severity:'success', summary:'Success', detail:successmessage});
            setTimeout((router: Router) => {
              this.router.navigate(['/']);
             
              return true;
            }, 3000); 
        }
        else
        {
          let errormessage = response.json().message;
          this.messageservice.add({severity:'error', summary:'Error', detail:errormessage});
        }
      
    });

  }

  ngOnDestroy(){
    this.document.body.classList.remove('bgWhite');
  }
 

}
