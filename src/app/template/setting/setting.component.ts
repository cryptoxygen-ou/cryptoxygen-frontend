import { UserService } from './../../services/user.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { GoogleService } from '../../services/google.service';

@Component({
  selector: 'app-settings',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SettingComponent implements OnInit {
  text:any
  msgs: Message[] = [];
  isAuth:boolean=false;
  constructor(@Inject(DOCUMENT) private document: Document,
      public userservice:UserService,
      private messageservice: MessageService,
      private googleService : GoogleService
) { }

  ngOnInit() {
      this.googleService.isGoogle2fa.subscribe(resp => this.isAuth = resp);
      this.userservice.changeValue('dashboard');
      this.document.body.classList.add('dashboard');
      this.googleService.getGoogle2faStatus().subscribe((suc:any)=>{
          if(suc.json().success && suc.json().data.google2fa_status==1){
              this.isAuth = true;
          }
      });
  }
  ngOnDestroy(){}
}
