import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class UserService {

  constructor(
    private router:Router,
    private http:Http){}
  postinsertuserdata(postdata)
  {
    return this.http.post(environment.APIURL+'/register',postdata);
  }
  isLoggedIn(){
    return tokenNotExpired();
  }

  logout(){

    localStorage.removeItem('token');
    localStorage.removeItem('remember');
    
    this.router.navigate(['/']);
  }
  fetchCountryList(){
    let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.get(environment.APIURL+'/fetchcountrycodes',{headers:header});
  }
  get currentUser()
  {

    let token = localStorage.getItem('token');
    if(!token) return null;
    return new JwtHelper().decodeToken(token);


  }

 userkyc(id){
   
    return this.http.post(environment.APIURL+'/kycdetail',{id:id});
 }

 userErcAddress()
 {
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/userErcAddress',{},{headers:header});
 }
 updateErcAddress(address,update)
 {
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/updateErcAddress',{address:address,update:update},{headers:header});
 }

 postinsertuserdatakyc(postdata)
 {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization',localStorage.getItem('token') );
    return this.http.post(environment.APIURL+'/kycinsert',postdata,{headers:header});
 }

 getAddress(postdata){
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization',localStorage.getItem('token') );
    return this.http.post(environment.APIURL+'/getaddress',{coin:postdata},{headers:header});
 }

 getcoinTotalcollection(postdata)
 {
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/getcoinTotalcollection',{coin:postdata},{headers:header});
}

getSmartAddress()
{
 let header = new Headers();
 header.append('Content-Type', 'application/json');
 header.append('Authorization',localStorage.getItem('token') );
 return this.http.post(environment.APIURL+'/getSmartAddress',{},{headers:header});
}


getsoftcap()
{
 let header = new Headers();
 header.append('Content-Type', 'application/json');
 header.append('Authorization',localStorage.getItem('token') );
 return this.http.post(environment.APIURL+'/getsoftcap',{},{headers:header});
}

 gettransactions(postdata)
 {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization',localStorage.getItem('token') );
    return this.http.post(environment.APIURL+'/gettransactions',{coin:postdata},{headers:header});
 }


 getcoinprice(postdata)
 {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization',localStorage.getItem('token') );
    return this.http.post(environment.APIURL+'/getcoinprice',{coin:postdata},{headers:header});
 }

 postupdateuserdatakyc(postdata)
 {
  let header = new Headers();
  header.append('Content-Type', 'application/json;charset=utf-8');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/kycupdate',postdata,{headers:header});
 }

 postuserFeedback(postdata)
 {
  let header = new Headers();
  header.append('Content-Type', 'application/json;charset=utf-8');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/feedback',postdata,{headers:header});
 }
 contact(postdata)
 {
  let header = new Headers();
  header.append('Content-Type', 'application/json;charset=utf-8');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/contact',postdata,{headers:header});
 }

 updateimage(seletedFile,typeImage)
 {
       let header = new Headers();
       header.append('Authorization',localStorage.getItem('token') );
      const fd = new FormData();
      if(typeImage == 'doc'){

        fd.append('image',seletedFile,seletedFile.name)
      }else{
        fd.append('selfie_upload',seletedFile,seletedFile.name)
      }
      return this.http.post(environment.APIURL+'/updatedoc',fd,{headers:header});
 }


  private panel = new BehaviorSubject<string>('home');
  cast = this.panel.asObservable();

  changeValue(changevalue){
    this.panel.next(changevalue);
  }

  private coin = new BehaviorSubject<string>('ETH');
  cast1 = this.coin.asObservable();

  changeValueCoin(changevalue){
    this.coin.next(changevalue);
  }

submitLogin(postData){

    return this.http.post(environment.APIURL+'/login',postData)
   
 }

 submitpayment(nounce,price,vgw)
 {

  let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/noncepay',{nonce:nounce,price:price,vgw:vgw},{headers:header});

 }

 forgotPassword(postdata)
 {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization',localStorage.getItem('token') );
    return this.http.post(environment.APIURL+'/forgotPassword',postdata,{headers:header});
 }

 verifymail(postdata)
 {
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/verifymail',{hash:postdata},{headers:header});
 }
 resetPassword(userid,pass)
 {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization',localStorage.getItem('token') );
    return this.http.post(environment.APIURL+'/resetPassword',{hash:userid,pass:pass},{headers:header});

 }

 getcoinpriceOnline(postdata)
 {
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/getcoinpriceOnline',{coin:postdata},{headers:header});

 }

 getcoinsum()
 {
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/getcoinsum',{get:"params"},{headers:header});

 }

 getuservgw(){
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization',localStorage.getItem('token') );
    // return this.http.post(environment.APIURL+'/getuservgw',{},{headers:header});
    return this.http.post(environment.APIURL+'/getusertoken',{},{headers:header});
 }
 generateEthAddress(){
    let header = new Headers();
    console.log("user service->",localStorage.getItem('token'));
    header.append('Content-Type', 'application/json');
    header.append('Authorization',localStorage.getItem('token'));
    console.log("user service->",header,environment.APIURL_ETH);
    return this.http.get(environment.APIURL_ETH+'/get_eth_address',{headers:header});
 }
 resendVerificationEmail(email){
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/resendverifyemail',{'user_email':email},{headers:header});
 }
 sendMailForCreditCard(){
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.get(environment.APIURL+'/creditcardEmail',{headers:header});
 }
 payment(det){
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization',localStorage.getItem('token') );
  return this.http.post(environment.APIURL+'/capture_card_payment',det,{headers:header});
 }
}