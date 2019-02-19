import { UserService } from './../../services/user.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { DOCUMENT } from '@angular/platform-browser';
import { Message } from 'primeng/components/common/api';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
  // encapsulation:ViewEncapsulation.None
})
export class FeedbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userservice: UserService,
    private messageservice: MessageService,
    @Inject(DOCUMENT) private document: Document
  ) { }
 
  accountdata = {} as Account;
  status:any;
  update:number;
  msgs: Message[] = [];
  seletedFile: any;
  doc:any;
  doc_img :any;
  userstatus:any
  
  
  submit(f)
  {
       // insert kyc detail
       this.userservice.postuserFeedback(f.value)
        .subscribe(response => {
          let result = response.json();

          // console.log(result)

          if(result.success)
          { 
              // now upload image on insert
              this.messageservice.add({severity:'success', summary:'Thanks', detail:result.message});

              setTimeout((router: Router) => {
                this.router.navigate(['/dashboard']);
                return true;
              }, 3000); 

          }
          else
          {
            this.messageservice.add({severity:'error', summary:'error', detail:'An error has been occured'});

          }
        });

    
  }

  ngOnInit() {

    
    let userdetail = this.userservice.currentUser;
    let id = userdetail.id;


    // console.log(userdetail)
    this.userservice.userkyc(id)
    .subscribe(response => {
      let result = response.json();
     
      this.status = response.json().success;
      if(this.status == true)
      {
          // get all data for this user
          let userstatus = response.json().data.kyc_status;
          this.userstatus = userstatus

          this.accountdata = response.json().data;
          
          this.update = 1
          this.doc = true;
          this.doc_img = environment.FILEPATH+response.json().data.document_upload;
        
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





}
