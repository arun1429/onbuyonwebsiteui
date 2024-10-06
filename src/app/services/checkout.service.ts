import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  addAddress(body) {
    const url = `${environment.apiUrl}address/add`;
    return this.http.post(url, body);
  }

  editAddress(body) {
    const url = `${environment.apiUrl}address/update`;
    return this.http.put(url, body);
  }

  getStates() {
    return this.http.get("assets/state_district.json");
  }

  getAddress() {
    const url = `${environment.apiUrl}address/list`;
    return this.http.get(url);
  }

  placeOrder(body) {
    const url = `${environment.apiUrl}order/placeorder`;
    return this.http.post(url, body);
  }
  deleteAddress(addressId) {
    const url = `${environment.apiUrl}address/delete/${addressId}`;
    return this.http.delete(url);
  }
  getProductDetailsByVariantId(variantId, selectedQty) {
    const url = `${environment.apiUrl}products/getvariantdetails?variantId=${variantId}&selectedQuantity=${selectedQty}`;
    return this.http.get(url);
  }

  updateQuantity(productId, variantId, quantity, cartId) {
    const body = {
      productId: productId,
      variantId: variantId,
      selectQuantity: quantity,
      cartId: cartId
    };
    const url = `${environment.apiUrl}cart/update/quantity`;
    return this.http.post(url, body)
  }

  cartValidate(addressId: string,paymentMethod : string) {
    const url = `${environment.apiUrl}cart/validate/list?addressId=${addressId}&paymentMethod=${paymentMethod}`;
    return this.http.get(url);
  }

}
