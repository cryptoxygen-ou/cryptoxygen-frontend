import { DOCUMENT } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TutorialComponent implements OnInit {
 dirPath:string = environment.DIRPATH;
  constructor(
    private userService:UserService,
    @Inject(DOCUMENT) private document: Document
  )
  { 

    this.userService.changeValue('dashboard');
    this.document.body.classList.add('dashboard');
  }
 
ngOnInit(){

}
    
  

}
