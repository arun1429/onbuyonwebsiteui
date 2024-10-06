import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from 'src/app/_services';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CartService } from 'src/app/services/cart.service';
import * as moment from "moment";
import { Router, RouterLink } from '@angular/router';
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { GlobalService } from 'src/app/services/global.service';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgFor } from '@angular/common';
// import { Product } from '../../domain/product';

declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [NgFor, RouterLink]
})
export class CartComponent  implements OnInit {
  productNames: string[] = [ 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
    "GeeksforGeeks", 
  ]; 
  carts: any = [];
  lastSavedCart :any = []
  cartSum: number = 0;
  total: number = 0;
  totalDiscount: Number = 0;
  deliveryCharges: Number = 0;
  convenienceFee: Number = 0;
  Cgst:Number=0;
  Igst:Number=0;
  discountName: string;
  appliedPromocode: any;
  currentUser: any;
  vendorId: string;

  constructor(
    public _AS: AlertService,
    private _CS: CartService,
    private _US: UserService,
    private globalSrv: GlobalService,
    private _route:Router,
    private _CHS: CheckoutService,private updateMetaTagSrv:MetakeywordsService,private seoService: SEOService,
    private primengConfig: PrimeNGConfig,@Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("currentPageNumber","1")
    this.primengConfig.ripple = true;
    this._CS.emitCardData().subscribe(x => {
      if (x) {
        this.getCartItems();
      }
    });
    this.seoService.updateCanonicalUrl('https://onbuyon.in/cart')
    this.updateMetaTagSrv.getSeoContent('Cart Page').subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.updateMetaTagSrv.updateMetaKeywords(data.data.title,data.data.description,data.data.keywords,"https://onbuyon.in/cart",data.data.imageUrl)
        }
      }
    )
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser){
      this.getCartItems();
    }else {
       this.lastSavedCart = []
       this.lastSavedCart =   JSON.parse(localStorage.getItem("lastSavedCart"))
       if(this.lastSavedCart.length !=0){
        for(let i=0; i<this.lastSavedCart.length;i++){
          this.cartSum = Number(this.cartSum + this.lastSavedCart[i].totalDiscountedPrice)
        }
        this.total = this.cartSum
      }
        
  }
}
  }

  getCartItems() {
    this._US.getAuth().subscribe(res => {
      if (res) {
        this._CS.getCartProducts().subscribe(
          (data: any) => {
            if (data.meta.status) {
              this.vendorId = data.data[0].vendorId
              this.carts = data.data;
              localStorage.setItem("totalCartCount" , data.data.length.toString())
              this.deliveryCharges = data.deliveryCharge;
              this.convenienceFee = data.convenienceFee;
              this.cartSum = data.subTotal;
              this.total = data.grandTotal;
              this.Cgst=data.cgst;
              this.Igst=data.igst
              this.totalDiscount = data.discount;
          this.discountName = data.promoCodeName.discountName;
          this.appliedPromocode = data.promoCodeName;
            }
            else {
           //   this._route.navigate(['/']);
              this.vendorId = undefined;
              this.carts = [];
              this.deliveryCharges = 0;
              localStorage.setItem("totalCartCount" , "0")
              this.convenienceFee = 0;
              this.cartSum = 0;
              this.total = 0;
              this.totalDiscount = 0;
              this.Cgst=0;
              this.Igst=0;
            }
          }
        )
      }
    })
  }
  increaseDecreaseProductNumber(event, id, variantId, cartId) {
    let selectedQuanity = Number(event.target.value);
    this.checkProductQuantity(id, variantId, selectedQuanity, cartId);
  }

  checkProductQuantity(productId, variantId, selectedQuanity, cartId) {
    const quantityPurchased = Number(selectedQuanity);
    this._CHS.updateQuantity(productId, variantId, quantityPurchased, cartId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this._CS.emittedValue.next(true);
        } else {
          this._CS.emittedValue.next(true);
          //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    );
  }

  removeFromCart(productSubId) {
    this._CS.removeFromCart(productSubId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.total = 0;
          //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        } else {
          this._route.navigate(['/']);
          //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    );
  }
 async removeFromCartLocal(variantId) {
  
    var lastSavedCartNew = []
    if(this.lastSavedCart){
      for(let i=0; i<this.lastSavedCart.length;i++){
        if(this.lastSavedCart[i].variantId != variantId){
          lastSavedCartNew.push(this.lastSavedCart[i])
        }
      }
      this.lastSavedCart = lastSavedCartNew
      this.globalSrv.theItem = lastSavedCartNew.length.toString()
      if (isPlatformBrowser(this.platformId)) {
        await localStorage.setItem("lastSavedCart" , JSON.stringify(lastSavedCartNew))
      }
      this.cartSum = 0
     for(let i=0; i<this.lastSavedCart.length;i++){
       this.cartSum = Number(this.cartSum + this.lastSavedCart[i].totalDiscountedPrice)
     }
     this.total = this.cartSum
    }
  }
  applyPromocode() {
    if (this.discountName) {
      this._CS.applyPromocode(this.discountName).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.getCartItems();
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          } else {
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      )
    }
  }

  removePromocode() {
    this._CS.removePromocode().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.getCartItems();
          //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        } else {
          //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }

  showCouponModal() {
    $('#coupenModal').modal('show')
  }

  hideCouponModal() {
    $('#coupenModal').modal('hide')
  }

  increaseDecreaseQuantity(cart,quantity,selectedQuantity){
    let q=Number(selectedQuantity)+(Number(quantity))
     this._CHS.updateQuantity(cart.productId,cart.variantId,q,cart._id).subscribe(res=>{
       if(res['meta']['status']){
        this._CS.emittedValue.next(true);
         this.ngOnInit()
       }
     })

  }
  getSeverity (product: any) {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
  }
}
