import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  emittedValue = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  removeFromCart(cartId: string) {
    const url = `${environment.apiUrl}cart/delete?cartId=${cartId}`;
    return this.http.delete(url).pipe(
      tap(
        (res: any) => {
          if (res.meta.status) {
            this.emittedValue.next(true);
          }
        }
      )
    );
  }

  addToCart(cartData) {
    const url = `${environment.apiUrl}cart/add`;
    return this.http.post(url, cartData).pipe(
      tap((res: any) => {
        if (res.meta.status) {
          this.emittedValue.next(true);
        }
      })
    );
  }

  emitCardData(): Observable<boolean> {
    return this.emittedValue.asObservable();
  }

  getCartProducts() {
    const url = `${environment.apiUrl}cart/list`;
    return this.http.get(url);
  }

  applyPromocode(discountName: string) {
    const url = `${environment.apiUrl}cart/applypromocode?discountName=${discountName}`;
    return this.http.post(url, {});
  }

  removePromocode() {
    const url = `${environment.apiUrl}cart/promocode`;
    return this.http.delete(url);
  }

  getAllPromocode(vendorId: string) {
    const url = `${environment.apiUrl}banner/getpromocode?vendorId=${vendorId}`;
    return this.http.get(url);
  }

 
}
