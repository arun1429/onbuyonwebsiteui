import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  sendOtp(loginData: any) {
    const url = `${environment.apiUrl}users/sendotp`;
    return this.http.post(url, loginData);
  }
  
  login(loginData: any) {
    const url = `${environment.apiUrl}users/login`;
    return this.http.post(url, loginData);
  }

  otpVerify(otpData: any) {
    const url = `${environment.apiUrl}users/verifyotp`;
    return this.http.post(url, otpData);
  }

  socialLogin(obj){
    const url=`${environment.apiUrl}users/social/login`
    return this.http.post(url,obj)
  }

}
