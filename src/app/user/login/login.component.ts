import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Http } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservice:UserService) { }

  ngOnInit() {
  }
  invalidLogin : boolean;
  status : boolean;
  message : any;
    


}
