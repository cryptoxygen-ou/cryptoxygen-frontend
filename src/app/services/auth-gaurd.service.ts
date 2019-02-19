import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router,
    private userservice:UserService
  ) { }


  canActivate(route,state:RouterStateSnapshot){
   
    if(this.userservice.isLoggedIn()) return true;

    this.router.navigate(['/'],{ queryParams:{

      returnUrl:state.url 

    } });

    return false;

  }

   

  }