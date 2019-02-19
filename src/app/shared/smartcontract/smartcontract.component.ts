import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, Inject, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/components/common/messageservice';
import { Address } from '../interfaces/address';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-smartcontract',
  templateUrl: './smartcontract.component.html',
  styleUrls: ['./smartcontract.component.css']
})
export class SmartcontractComponent implements OnInit {

  constructor(
    public userservice: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private messageservice: MessageService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  result:any;
  copytext:string;
  modalRef: BsModalRef;
  address: any;
  status: any;
  smartAddress :any;
  dirPath:string=environment.DIRPATH;


  openModal(template: TemplateRef<any>) {
    this.document.body.classList.add('common_model_open');
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'comn_model login_model' })
    );
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
    // console.log('Oops, unable to copy');
  } finally {
    document.body.removeChild(txtArea);
  }
  return false;
}

  ngOnInit() {
      this.copytext = "Copy"
      

      this.userservice.getSmartAddress()
      .subscribe(response => {
        this.status = response.json().success;
        if(this.status == true)
        {
           this.address = response.json().data; 
           // in percent for home page progress bar
        
        }  
      });


  }

}
