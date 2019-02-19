import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth-gaurd.service';
import { UserService } from './services/user.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import {GrowlModule} from 'primeng/growl';
import {Message} from 'primeng/api';
import { UserIdleModule } from 'angular-user-idle';
import { MessageService } from 'primeng/components/common/messageservice';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpModule,
        SelectDropDownModule,
        BrowserModule,
        AppRoutingModule,
        UserIdleModule.forRoot({idle: 300, timeout: 300, ping: 120})
    ],
    providers: [UserService,AuthGuard,MessageService],
    bootstrap: [AppComponent]
})
export class AppModule { }
