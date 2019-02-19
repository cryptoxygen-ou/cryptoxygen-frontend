import { environment } from './../../../environments/environment';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  dirPath:any=environment.DIRPATH;
  constructor(public userservice: UserService
  ) { }

  panel : any;
  text  : any;
 

  ngOnInit() {
   
    this.userservice.cast.subscribe(panel => this.panel = panel)
  }

}
