import { Component, OnInit } from '@angular/core';
import { AlertService } from "../../_services/index";
import { Router } from "@angular/router";
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishListComponent  implements OnInit {

  products: any = [];
  statusOff:boolean;
  discountStatus:boolean;
  offerPrise: any;
  price: any;
  constructor(
    public _AS: AlertService,
    private router: Router,
    private _PFS: ProfileService,
    
    private _CS: CartService,@Inject(PLATFORM_ID) private platformId: Object
  ) {
    
  }

  ngOnInit(): void {
    this.getWishListData();
    this._PFS.emitWishListData().subscribe(x => {
      if (x) {
        this.getWishListData();
      }
    });
  }

  getWishListData() {
    this._PFS.getWishList().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.products = data.data;
        } else {
          this.products = [];
        }
      }
    )
    this.getDiscount(this.offerPrise,this.price)
  }

  removeFromWishList(wishListId: string) {
    this._PFS.removeFromWishList(wishListId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        } else {
          //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    );
  }

  moveToCart(e) {
    if (isPlatformBrowser(this.platformId)) {
    var totalCartCount =   localStorage.getItem("totalCartCount")
    if(e.subCategoryId == '65ab57a30af25e301ddb52f8' && totalCartCount == "0"){
     // this.alertMessage({ type: "danger", title: "No item in cart ", value: "Please add any different product to add empty gift box" });
    }else {
    const body = {
      categoryId: e.categoryId,
      productId: e.productId,
      selectQuantity: 1,
      subCategoryId: e.subCategoryId,
      vendorId: e.vendorId,
      variantId: e.variantId
    };
    this._CS.addToCart(body).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.removeFromWishList(e._id);
          //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        } else {
          //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      },
      err => {
      //  this.alertMessage({ type: "danger", title: "Error Occured", value: "Please login first" });
        this.router.navigate(['/login']);
      }
    );
    }
  }
  }
  getDiscount(offerPrice,price){
    
    if(offerPrice !== price){
      this.statusOff=false
    let percentage=(offerPrice/price)*100
    
    let p= (100-percentage).toFixed(0)
    if(Number(p)!==0){
     
      this.discountStatus=true
    }
    else{
      this.discountStatus=false
    }
    return p
  }else{
    this.statusOff=true
  }
}
}
