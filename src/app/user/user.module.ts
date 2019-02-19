import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from '../services/user.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
  HttpModule,   
  CommonModule,
    FormsModule,
    UserRoutingModule
   
  ],
  providers: [
    UserService
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class UserModule { }
