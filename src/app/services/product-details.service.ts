import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http: HttpClient) { }

  getProductDetails(productId: string,userId:string='') {
    const url = `${environment.apiUrl}products/details?productId=${productId}&userId=${userId}`;
    return this.http.get(url);
  }
  getProductDetailBySlug(variantSlug: string,userId:string='') {
    const url = `${environment.apiUrl}products/detailsbyslug?variantSlug=${variantSlug}&userId=${userId}`;
    return this.http.get(url);
  }

  submitReview(reviewData: any) {
    const url = `${environment.apiUrl}review/add`;
    return this.http.post(url, reviewData);
  }

  getQuote(quoteData: any) {
    const url = `${environment.apiUrl}quote/add`;
    return this.http.post(url, quoteData);
  }

  checkPincode(pincodeData: any) {
    const url = `${environment.apiUrl}address/checkpincode`;
    return this.http.post(url, pincodeData);
  }

  getReview(productId:string, variantId:string){
    const url = `${environment.apiUrl}review?productId=${productId}&variantId=${variantId}`;
    return this.http.get(url);
  }

}
