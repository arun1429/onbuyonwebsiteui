import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GlobalService } from 'src/app/services/global.service';
import { CartService } from 'src/app/services/cart.service';
import { SEOService } from 'src/app/_services/seo.service';
import { MetakeywordsService } from 'src/app/_services/metakeywords.service';
import { StartService } from 'src/app/services/start.service';
@Component({
  selector: 'app-buyone-products',
  templateUrl: './buyone-products.component.html',
  styleUrls: ['./buyone-products.component.css']
})
export class BuyoneProductsComponent  implements OnInit,OnDestroy {

  products: any = [];
  shopName: string;
  currentPageNumber = 1;
  discountStatus:boolean
  offerPrise:any;
  currentUser: any;
  price:any
  isloading = true
  constructor(
    private routes: ActivatedRoute,
    public _AS: AlertService,
    private globalSrv: GlobalService,
    private _SPS: StartService,
    private _CS: CartService,private seoService: SEOService,private updateMetaTagSrv:MetakeywordsService,
    private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    
  }

  ngOnInit(): void {
    this.shopName = "All";
    if (isPlatformBrowser(this.platformId)) {
    var currentPage =  localStorage.getItem("currentPageNumber")
   if(currentPage != null){
     this.currentPageNumber = Number(currentPage)
   }
    this.shopName = "All"
    this.shopName  = localStorage.getItem("shopName")
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
    this.getAllProducts(this.shopName);
    this.updateMetaTagSrv.getSeoContent('BuyOne Products').subscribe(
      (dataseo: any) => {
        if (dataseo.meta.status) {
          this.updateMetaTagSrv.updateMetaKeywords(dataseo.data.title,dataseo.data.description,dataseo.data.keywords,"https://onbuyon.in/specialofferproducts"+dataseo.categorySlug,dataseo.data.imageUrl)
        }
      }
    )
    this.seoService.updateCanonicalUrl('https://onbuyon.in/buyonegetoneproducts')
  }

  ngOnDestroy(): void{
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("currentPageNumber",this.currentPageNumber.toString())
    }
  }
  getAllProducts(shopName:string) {
    this._SPS.getVendorBuyProducts(shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.products = data.data;
           this.isloading = true
          } else {
            this.products = []
            this.isloading = false
        }
       
      }
    )
  }
  

  async addToCart(product :any) {
    if (isPlatformBrowser(this.platformId)) {
    if(this.currentUser){
      var totalCartCount =   localStorage.getItem("totalCartCount")
      if(product.subCategoryId == '65ab57a30af25e301ddb52f8' && totalCartCount == "0"){
        //this.alertMessage({ type: "danger", title: "No item in cart ", value: "Please add any different product to add empty gift box" });
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
          //this.alertMessage({ type: "danger", title: "Error Occured", value: "Please login first" });
        }
      );
      }
    }else {
      var lastSavedCart = []
       lastSavedCart =   JSON.parse(localStorage.getItem("lastSavedCart"))
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
        this.globalSrv.theItem = lastSavedCart.length.toString()
        await localStorage.setItem("lastSavedCart" , JSON.stringify(lastSavedCart))
    
      }else {
        lastSavedCart = []
        if(product.subCategoryId == '65ab57a30af25e301ddb52f8'){
        //  this.alertMessage({ type: "danger", title: "No item in cart ", value: "Please add any different product to add empty gift box" });
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
