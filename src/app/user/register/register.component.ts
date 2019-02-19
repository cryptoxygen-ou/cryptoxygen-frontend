import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Http } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private userservice:UserService) { }

  ngOnInit() {
  }

  status : any;
  message: any; 


  submit(f){
  
     // this will insert data
     this.userservice.postinsertuserdata(f.value)
     .subscribe(response => {
      this.status = response.json().status;
      this.message = response.json().message;

  });

  }
  

}
