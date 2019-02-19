import { Message } from 'primeng/components/common/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserService } from './../../services/user.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  text:any
  msgs: Message[] = [];
  loading = true;

  constructor(@Inject(DOCUMENT) private document: Document,
      public userservice:UserService,
      private messageservice: MessageService,
      private router: Router,

) { }

  ngOnInit() {
    if (this.loading = true) {
      this.document.body.classList.add('hide-overflow');
    }
    this.document.body.classList.add('bgWhite');
  }
  ngOnDestroy(){
    this.document.body.classList.remove('bgWhite');
  }
  ngAfterContentInit(){
    setTimeout( async (router: Router) => {
      await this.loadFormScript3();
      this.loading = false;
      this.document.body.classList.remove('hide-overflow');
      },1500);    
  }
  public loadFormScript3(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = './assets/js/wave_animation.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
 
  submit(f)
  {
       // insert kyc detail
       this.userservice.contact(f.value)
        .subscribe(response => {
          let result = response.json();

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

}