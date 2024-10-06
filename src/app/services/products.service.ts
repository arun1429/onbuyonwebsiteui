import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductByGroupId(groupId: string) {
    const url = `${environment.apiUrl}products/group/${groupId}`;
    return this.http.get(url);
  }

  getAllCategoriesByGroupId(groupId: string) {
    const url = `${environment.apiUrl}categories/categorybygroup?groupId=${groupId}`;
    return this.http.get(url);
  }
  getRecommendedProductBycatIdSubCatId(catData: any) {
    const url = `${environment.apiUrl}products/getrecommendedbycategoryandsubcategoryid`;
    return this.http.post(url, catData);
  }
  

  getProductBycatIdSubCatId(catData: any) {
    const url = `${environment.apiUrl}products/bycategoryandsubcategoryid`;
    return this.http.post(url, catData);
  }
  getProductBySlug(catData: any) {
    const url = `${environment.apiUrl}products/bycategoryslugandsubcategoryslug`;
    return this.http.post(url, catData);
  }
  getProductByVendor(newData: any) {
    const url = `${environment.apiUrl}vendor/vendordetails`;
    return this.http.post(url, newData);
  }
  
  getProductByGroupIdState(groupId: string,state) {
    const url = `${environment.apiUrl}products/group/${groupId}?state=${state}`;
    return this.http.get(url);
  }
  getWebContent(page) {
    const url = `${environment.apiUrl}webcontent/details?page=${page}`;
    return this.http.get(url);
  }
}
