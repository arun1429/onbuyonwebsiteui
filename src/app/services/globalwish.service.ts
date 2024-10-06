import {BehaviorSubject} from 'rxjs';   
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({providedIn: 'root'})
export class GlobalWishService {
 itemValue = new BehaviorSubject(this.theItem);
 constructor(@Inject(PLATFORM_ID) private platformId: Object) {  }
 set theItem(value) {
    this.itemValue.next(value);
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('wishCount', value);
    }
 }

 get theItem() {
  if (isPlatformBrowser(this.platformId)) {
   return localStorage.getItem('wishCount');
  }
 }
}