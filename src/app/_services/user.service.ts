import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = new BehaviorSubject(false);
  private user = new BehaviorSubject(<any>null);
  private store = new BehaviorSubject(null);

  constructor() { }

  // output to Auth Guard and Other Component
  getAuth(): Observable<boolean> {
    return this.auth.asObservable();
  }

  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  // If login is true
  updateUser(authState: boolean, user: any) {
    this.auth.next(authState);
    this.user.next(user);
  }

  getStore(): Observable<any> {
    return this.store.asObservable();
  }

  updateStore(store: any) {
    this.store.next(store);
  }

}
