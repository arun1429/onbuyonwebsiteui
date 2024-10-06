import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  sendOtp(registerData: any) {
    const url = `${environment.apiUrl}users/forgotpassword`;
    return this.http.post(url, registerData);
  }
  setnewPassword(registerData: any) {
    const url = `${environment.apiUrl}users/setnewpassword`;
    return this.http.put(url, registerData);
  }
}
