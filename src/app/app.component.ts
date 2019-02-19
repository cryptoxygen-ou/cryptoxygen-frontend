import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './template/header/header.component';
import { Router, NavigationStart } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { UserService } from './services/user.service';
import { MessageService } from 'primeng/components/common/messageservice';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit{
    title = 'app';
    constructor(
        private router:Router,
        private userIdle: UserIdleService,
        private userservice : UserService,
        private messageservice :MessageService
    ){}
    ngOnInit(){
        let lt = new Date().getTime();
        if(localStorage.lt==undefined){
            localStorage.setItem('lt',lt.toString())
        }
        else if(parseInt(localStorage.lt)+1800000<lt){
            localStorage.clear();
        }
        this.userIdle.startWatching();
        this.userIdle.onTimerStart().subscribe(count => console.log(count));
        this.userIdle.onTimeout().subscribe(() => {
            console.log('Time is up!')
            // if(this.userservice.isLoggedIn()){
            //     localStorage.clear();
            //     this.messageservice.add({severity:'error', summary:'Error', detail:"Your session has been expired, Please login again!"});
            //     setTimeout(() => {
                  
            //       this.router.navigate(['/member/signin']);     
            //     }, 3000);
            // }
        });
    }
    stop() {
        this.userIdle.stopTimer();
    }
     
    stopWatching() {
        this.userIdle.stopWatching();
    }
     
    startWatching() {
        this.userIdle.startWatching();
    }
     
    restart() {
        this.userIdle.resetTimer();
    }
}
