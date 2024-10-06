import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  emittedMoney = new BehaviorSubject("");
  emittedValue = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  setEmittedMoney(amount) {
    this.emittedMoney.next(amount)
  }
  getEmittedMoney(): Observable<String> {
    return this.emittedMoney.asObservable()
  }

  getOrderHistory() {
    const url = `${environment.apiUrl}order/list`;
    return this.http.get(url).pipe(map(res => res["data"]));
  }

  cancelOrder(body) {
    const url = `${environment.apiUrl}order/cancel`;
    return this.http.put(url, body);
  }

  getInvoiceOnMail(orderId) {
    const url = `${environment.apiUrl}order/invoice/${orderId}`
    return this.http.get(url)
  }

  getOrderDetailsByOrderId(orderId) {
    const url = `${environment.apiUrl}order/details/${orderId}`;
    return this.http.get(url).pipe(map(res => res["data"]));
  }

  getprofile() {
    const url = `${environment.apiUrl}users/getprofile`;
    return this.http.get(url);
  }

  updateProfile(profileData: any) {
    const url = `${environment.apiUrl}users/profile/update`;
    return this.http.put(url, profileData);
  }

  getWallet() {
    const url = `${environment.apiUrl}users/getprofile`;
    return this.http.get(url);
  }

  updatePaymentStatus(body) {
    const url = `${environment.apiUrl}order/wallet/add`;
    return this.http.post(url, body);
  }

  getTransactionHistory() {
    const url = `${environment.apiUrl}transaction/history`;
    return this.http.get(url);
  }

  getRewardPoints() {
    const url = `${environment.apiUrl}rewards/rewardpoint`;
    return this.http.get(url).pipe(map(res => res["data"]))
  }

  getWishList() {
    const url = `${environment.apiUrl}wishlist/list`;
    return this.http.get(url);
  }

  addToWishList(wishListData: any) {
    const url = `${environment.apiUrl}wishlist/add`;
    return this.http.post(url, wishListData).pipe(
      tap(
        (data: any) => {
          if (data.meta.status) {
            this.emittedValue.next(true);
          }
        }
      )
    );
  }

  removeFromWishList(wishListId: string) {
    const url = `${environment.apiUrl}/wishlist/delete?wishListId=${wishListId}`;
    return this.http.delete(url).pipe(
      tap(
        (data: any) => {
          if (data.meta.status) {
            this.emittedValue.next(true)
          }
        }
      )
    );
  }

  emitWishListData(): Observable<boolean> {
    return this.emittedValue.asObservable();
  }

  refund(body) {
    const url = `${environment.apiUrl}order/refund/web`;
    return this.http.put(url, body);
  }

  exchange(body) {
    const url = `${environment.apiUrl}order/exchange/web`;
    return this.http.put(url, body);
  }


  downloadInvoiceFromVendor(orderId){
    const url=`https://api.toq.co.in/api/vendor/invoice?orderId=${orderId}`
    return this.http.get(url)
  }

  getNotifications(){
    const url = `${environment.apiUrl}users/notification`;
    return this.http.get(url);
  }

}
