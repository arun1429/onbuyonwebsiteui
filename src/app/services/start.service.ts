import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StartService {

  private group = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getAllStores() {
    const url = `${environment.apiUrl}store/list`;
    return this.http.get(url);
  }

  getAllGroups(shopName) {
    const url = `${environment.apiUrl}categories/listallcategoryforvendor?shopName=`+shopName;
    return this.http.get(url);
  }
  getAllPromos(shopName: string) {
    const url = `${environment.apiUrl}banner/getpromoslist?shopName=${shopName}`;
    return this.http.get(url);
  }

  changeStore() {
    const url = `${environment.apiUrl}cart/change/store`;
    return this.http.get(url);
  }

  logout() {
    const url = `${environment.apiUrl}users/logout`;
    return this.http.post(url, {});
  }

  contactUs(contactData: any,shopName) {
    const url = `${environment.apiUrl}contactus/addcontactquery?shopName=`+shopName;
    return this.http.post(url, contactData);
  }

  getGroups(): Observable<any> {
    return this.group.asObservable();
  }

  updateGroups(group: any) {
    this.group.next(group);
  }

  getContactDetails(shopName) {
    const url = `${environment.apiUrl}vendor/vendordetailsforshop?shopName=`+shopName;
    return this.http.get(url);
  }
  getFooterKeywords(shopName) {
    const url = `${environment.apiUrl}footerkeywords/listweb?shopName=`+shopName;
    return this.http.get(url);
  }
  getSocialMediaDetails(shopName) {
    const url = `${environment.apiUrl}vendor/socialmediaforshop?shopName=`+shopName;
    return this.http.get(url);
  }
  getVendorSalesProducts(shopName: string){
    const url = `${environment.apiUrl}products/salesproductsbyvendor?shopName=`+shopName+'&requestCount=1000';
    return this.http.get(url);
  }
  getVendorBestProducts(shopName) {
    const url = `${environment.apiUrl}products/bestsellerbyvendor?shopName=`+shopName+'&requestCount=1000';
    return this.http.get(url);
  }
  searchProduct(searchKey:string) {
    const url = `${environment.apiUrl}products/search?searchKey=${searchKey}`;
    return this.http.get(url);
  }

  register(registerData: any) {
    const url = `${environment.apiUrl}users/signup`;
    return this.http.post(url, registerData);
  }

  getAllLatestProducts(shopName){
    const url = `${environment.apiUrl}products/latestarrivalbyvendor?shopName=`+shopName+'&requestCount=1000';
    return this.http.get(url);
  }

  getVendorBuyProducts(shopName: string){
    const url = `${environment.apiUrl}products/buyoneproductsbyvendor?shopName=`+shopName+'&requestCount=1000';
    return this.http.get(url);
  }
  getAllContent(shopName) {
    const url = `${environment.apiUrl}contactinfo/allwebcontent?shopName=`+shopName;
    return this.http.get(url);
  }
}
