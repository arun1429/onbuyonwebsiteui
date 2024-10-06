import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { GlobalService } from 'src/app/services/global.service';
import { GlobalWishService } from 'src/app/services/globalwish.service';
import { StartService } from 'src/app/services/start.service';
@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent  implements OnInit ,OnDestroy{

  products: any = [];
  searchKey: string;
  currentPageNumber =  1;
  discountStatus:boolean
  offerPrise:any;
  price:any
  currentUser: any;
  constructor(
    private routes: ActivatedRoute,
    public _AS: AlertService,
    private globalSrv: GlobalWishService,
    private _SPS: StartService,
    private _CS: CartService,private seoService: SEOService,private updateMetaTagSrv:MetakeywordsService,
    private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    var currentPage =  localStorage.getItem("currentPageNumber")
   console.log("currentPage: "+currentPage)
   if(currentPage != null){
     this.currentPageNumber = Number(currentPage)
   }
    this.routes.queryParams.subscribe(
      data => {
        if (data && data.search && data.search.length > 0) {
          this.searchKey = data.search;
          this.getAllSearchProducts();
        }
      }
    )
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getDiscount(this.offerPrise,this.price)
    this.seoService.updateCanonicalUrl('https://onbuyon.in/search')
  }
  }
  ngOnDestroy(): void{
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("currentPageNumber",this.currentPageNumber.toString())
    }
  }
  getAllSearchProducts() {
    this._SPS.searchProduct(this.searchKey).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.products = data.data;
        } else {
          this.products = []
        }
      }
    )
  }
  

  async addToCart(product :any) {
    if (isPlatformBrowser(this.platformId)) {
    console.log(" this.currentUser : "+this.currentUser)
    if(this.currentUser){
      var totalCartCount =   localStorage.getItem("totalCartCount")
      if(product.subCategoryId == '65ab57a30af25e301ddb52f8' && totalCartCount == "0"){
      //  this.alertMessage({ type: "danger", title: "No item in cart ", value: "Please add any different product to add empty gift box" });
      }else {
      const cartData = {
        categoryId: product.categoryId,
        vendorId: product.vendorId,
        productId: product.productId,
        selectQuantity: 1,
        subCategoryId: product.subCategoryId,
        variantId: product.variantId,
        personalisedMessage: "",
        cardType :  "",
        giftTo :  "",
        giftFrom : "",
      };
      this._CS.addToCart(cartData).subscribe(
        (data: any) => {
          if (data.meta.status) {
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          } else {
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        },
        err => {
          this.router.navigateByUrl("/profile/login");
       //   this.alertMessage({ type: "danger", title: "Error Occured", value: "Please login first" });
        }
      );
      }
    }else {
      var lastSavedCart = []
       lastSavedCart =   JSON.parse(localStorage.getItem("lastSavedCart"))
       console.log(" lastSavedCart : "+JSON.stringify(lastSavedCart))
       if(lastSavedCart != null  && lastSavedCart.length != 0){
        var checkLastIndex = -1;
        for(let i=0; i<lastSavedCart.length;i++){
         if(lastSavedCart[i].variantId == product.variantId){
         checkLastIndex = i
         break;
         }
        }
        if(checkLastIndex != -1){
          lastSavedCart[checkLastIndex].selectQuantity =  1
        }else {
          lastSavedCart.push({
            categoryId: product.categoryId,
        vendorId: product.vendorId,
        productId: product.productId,
        variantImg:  product.variantImg,
        productName: product.productName,
        brand: product.brand,
        selectQuantity: 1,
        subCategoryId: product.subCategoryId,
        variantId: product.variantId,
        offerPrice: product.offerPrice,
        totalDiscountedPrice: Number(product.offerPrice),
        personalisedMessage: "",
        cardType :  "",
        giftTo :  "",
        giftFrom : "",
          })
        }
        console.log("lastSavedCart.length 1: "+JSON.stringify(lastSavedCart.length))
        this.globalSrv.theItem = lastSavedCart.length.toString()
        await localStorage.setItem("lastSavedCart" , JSON.stringify(lastSavedCart))
    
      }else {
        lastSavedCart = []
        if(product.subCategoryId == '65ab57a30af25e301ddb52f8'){
         // this.alertMessage({ type: "danger", title: "No item in cart ", value: "Please add any different product to add empty gift box" });
        }else {
        lastSavedCart.push({
          categoryId: product.categoryId,
          vendorId: product.vendorId,
          productId: product.productId,
          variantImg:  product.variantImg,
          productName: product.productName,
          brand: product.brand,
          selectQuantity: 1,
          subCategoryId: product.subCategoryId,
          variantId: product.variantId,
          offerPrice: product.offerPrice,
          totalDiscountedPrice: Number(product.offerPrice),
          personalisedMessage: "",
        cardType :  "",
        giftTo :  "",
        giftFrom : "",
        })
        console.log("lastSavedCart.length 1: "+JSON.stringify(lastSavedCart.length))
        this.globalSrv.theItem = lastSavedCart.length.toString()
        await localStorage.setItem("lastSavedCart" , JSON.stringify(lastSavedCart))
      }
    }
      }
    }
    }
  
  getDiscount(offerPrice,price){
    
    let percentage=(offerPrice/price)*100
    
    let p= (100-percentage).toFixed(0)
    if(Number(p)!==0){
     
      this.discountStatus=true
    }
    else{
      this.discountStatus=false
    }
    return p

  }

}
