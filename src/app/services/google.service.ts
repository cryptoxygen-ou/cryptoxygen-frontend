import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
// import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

// import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class GoogleService {
    constructor(
        private router:Router,
        private http:Http
    ){}
    


    // getorders(coin){
    //     let header = new Headers();
    //     header.append('Content-Type', 'application/json');
    //     header.append('Authorization',localStorage.getItem('token') );
    //     // header.append('Authorization', "JWT eyJhbGciOiJIUzI1NiJ9.Nzk.Yf3iFE07_nysgnJDttnewvoVwRapmuL5OyMoWbMWNQw" );

    //     return this.http.get(environment.APIURL+'/orders/myorders/'+coin+' ',{headers:header});
    // }

// User Login
    private google = new BehaviorSubject<boolean>(false);
    isGoogle2fa = this.google.asObservable();
    changeValueGoogle2fa(changevalue){
        this.google.next(changevalue);
    }

    getQrimage(){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('token') );
        return this.http.post(environment.APIURL+'/google2fa',{issuer:'Zedxe'},{headers:header})
    }

    disableGoogle(token){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('token') );
        return this.http.post(environment.APIURL+'/google2fadisable',{token:token,action:'disable' },{headers:header})
    }

    verifyToken(secret,token){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('token') );
        return this.http.post(environment.APIURL+'/google2favalidate',{token:token,secret:secret},{headers:header})
    }

    tokenLost(){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('tokentemp') );
        return this.http.post(environment.APIURL+'/google2falost',{},{headers:header})
    }

    verifySigninToken(token,userToken){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',userToken);
        return this.http.post(environment.APIURL+'/google2falogin',{token:token},{headers:header})
    }
    getGoogle2faStatus(){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization',localStorage.getItem('token'));
        return this.http.post(environment.APIURL+'/google2fastatus',{},{headers:header});
    }
}