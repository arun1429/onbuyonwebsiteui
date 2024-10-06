import { Component, OnInit, AfterViewInit, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from "src/app/services/products.service";
import { Options } from '@angular-slider/ngx-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CheckoutService } from 'src/app/services/checkout.service';
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { GlobalService } from 'src/app/services/global.service';
import { JsonLDService } from '../../_services//json-ld.service';
import { Meta, Title } from '@angular/platform-browser';
import { HomeService } from 'src/app/services/home.service';
import { StartService } from 'src/app/services/start.service';
@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.css'],

})
export class VendorProductsComponent  implements OnInit,OnDestroy, AfterViewInit {
  offerPrise: any;
  price: any;
  show = false;
  currentContent: any;
  categoryId: string;
  shopName:string;
  products: any = [];
  categories: any = [];
  banners: any = [];
  selectedIndex: number = -1;
  sortingType: boolean;
  sortingElement: string;
  isloading = true
  isNoData = true
  //stock: number = 0;
  minPrice: number = 0;
  states:any=[]
  maxPrice: number = 3000;
  options: Options = {
    floor: 0,
    step: 100,
    minRange: 500,
    ceil: 3000
  };
  filterCity=''
  currentPageNumber = 1;
  contactDetails: any;
  discountStatus: boolean;
  statusOff: boolean;
  currentUser: any;
  currentURL='';
  bannerCarouselOption: OwlOptions = {
    animateOut: 'fadeOut',
    autoplay: true,
    loop: false,
    rewind: true,
    nav: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 10000,
    items: 1,
    autoHeight: true,
    dots: true,
    navText: ['<i class="ion-chevron-left"></i>', '<i class="ion-chevron-right"></i>'],
  }
  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    public JLDS:JsonLDService,
    public _AS: AlertService,
    private globalSrv: GlobalService,
    private _PS: ProductsService,
    private _HS: HomeService,
    private _SS: StartService,
    private routes: ActivatedRoute,
    private titleService: Title ,private metaService: Meta,
    private _CS: CartService,private seoService: SEOService,private updateMetaTagSrv:MetakeywordsService,
    private _CHS: CheckoutService,
    private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
   var currentPage =  localStorage.getItem("currentPageNumber")

   console.log("currentPage: "+currentPage)
   if(currentPage != null){
     this.currentPageNumber = Number(currentPage)
   }
    this.routes.params.subscribe(
      data => {
        this.shopName = data.shopName;
        this.getAllCategories()
       this.getProductByVendor(data.shopName)
       this.getVendorBanners();
       this.getContactDetails();
        this.seoService.updateCanonicalUrl("https://onbuyon.in/"+data.shopName)
        this.getWebContent(data.categoryshopNameSlug)
        this.updateMetaTagSrv.getSeoContent(data.shopName).subscribe(
          (dataseo: any) => {
            if (dataseo.meta.status) {
              if (data.meta.status) {
                this.titleService.setTitle(dataseo.data.title);
         
          this.metaService.addTag(
            { name: 'description', content:dataseo.data.description }
          );
          this.metaService.addTag(
            { name: 'keywords', content: dataseo.data.keywords }
          );
          this.metaService.addTag(
            { property: 'og:site_name', content: "All" }
          );
          this.metaService.addTag(
            { property: 'og:url', content: "https://onbuyon.in/"+data.shopName }
          );
          this.metaService.addTag(
            { property: 'og:title', content: dataseo.data.keywords }
          );
          this.metaService.addTag(
            { property: 'og:type', content: "website" }
          );
          this.metaService.addTag(
            { property: 'og:description', content:dataseo.data.description }
          );
          this.metaService.addTag(
            { property: 'og:image', content: dataseo.data.imageUrl }
          );
          this.metaService.addTag(
            { property: 'og:image:secure_url', content: dataseo.data.imageUrl }
          );
          this.metaService.addTag(
            { property: 'og:image:width', content: "1920" }
          );
          this.metaService.addTag(
            { property: 'og:image:height', content: "500" }
          );
          this.metaService.addTag(
            { name: 'twitter:site', content : "onbuyon" }
          );
          this.metaService.addTag(
            { property: 'twitter:card', content: "summary_large_image" }
          );
          this.metaService.addTag(
            { property: 'twitter:title', content: dataseo.data.keywords }
          );
          this.metaService.addTag(
            { property: 'twitter:description', content: dataseo.data.description }
          );
          this.metaService.addTag(
            { property: 'google-site-verification', content: "Sg_Wrdlj_mKvHiSnIA6pKcur1Y3Zj0ksxe7ROtn6Lzc" }
          );
              }
            }
          }
        )
      }
    ) 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }
  getContactDetails() {
    this._SS.getContactDetails(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.contactDetails = data.data;
        }
      }
    )
  }
  getWebContent(newPage) {
    this._PS.getWebContent(newPage).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.currentContent = data.data;
        } else {
          this.currentContent = ""
        }
      }
    )
  }
  
  getVendorBanners() {
    this._HS.getVendorBanners(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.banners = data.data;
        } else {
          this.banners =[]
        }
      }
    )
  }
  ngOnDestroy(): void{
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("currentPageNumber",this.currentPageNumber.toString())
    }
  }
  
  getStates() {
    this._CHS.getStates().subscribe(
      (data: any) => {
        if (data && data.states) {
          this.states = data.states;
        }
      }
    )
    window.scroll(0,0);
  }

  ngAfterViewInit() {
    //this.outOfStock();
    this.cdr.detectChanges();
  }

  checkSelectedIndex(indexValue: number) {
    this.selectedIndex = indexValue;
  }

  sort(key, status) {
    this.sortingType = status;
    this.sortingElement = key;
  }

  // outOfStock() {
  //   if (this.stock !== 0) {
  //     this.stock = 0;
  //   } else {
  //     this.stock = 1;
  //   }
  // }

  getAllCategories() {
    this._HS.getVendorCategory(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.categories = data.data;
        }
      }
    )
  }
  getProductByCategoryId(subCategorySlug: string, indexValue?: number) {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("currentPageNumber","1")
    }
    this.currentPageNumber =1
    this.getProductBySlug(subCategorySlug)
    window.scroll(0,0);
  }
  getProductByVendor(shopName: string) {
    let obj = {
      shopName: shopName
    }
    this.isloading = true
    this._PS.getProductByVendor(obj).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.products = data.data;
          this.isNoData = true;
          this.getMaxPrice();
          if(this.products.size !=0){
            this.categoryId = this.products[0].categoryId
            this.currentURL = window.location.href; 
            const newData= {
              "@context": "https://schema.org/", 
              "@type": "Product", 
              "url":this.currentURL,
              "name":this.products[0].categoryName,
              "image":"https://onbuyon.in/assets/img/new_logo.png",
              "description": this.products[0].description,
              "brand": "OnBuyOn",
              "product": {
                  "@type": "Product",
                  "url":this.currentURL,
              "name":this.products[0].categoryName,
              "image":"https://onbuyon.in/assets/img/new_logo.png",
              "description": this.products[0].description,
                }
          }
          this.JLDS.insertSchema(newData)
          window.scroll(0,0);
          }
        } else {
          this.products =[]
          this.isNoData = false;
        }
        this.isloading = false
      }
    )
  }
  getProductBySlug(categorySlug: string) {
    let obj = {
      id: categorySlug
    }
    this.isloading = true
    this._PS.getProductBySlug(obj).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.products = data.data;
          this.isNoData = true;
          this.getMaxPrice();
          if(this.products.size !=0){
            this.categoryId = this.products[0].categoryId
            this.currentURL = window.location.href; 
            const newData= {
              "@context": "https://schema.org/", 
              "@type": "Product", 
              "url":this.currentURL,
              "name":this.products[0].categoryName,
              "image":"https://onbuyon.in/assets/img/new_logo.png",
              "description": this.products[0].description,
              "brand": "OnBuyOn",
              "product": {
                  "@type": "Product",
                  "url":this.currentURL,
              "name":this.products[0].categoryName,
              "image":"https://onbuyon.in/assets/img/new_logo.png",
              "description": this.products[0].description,
                }
          }
          this.JLDS.insertSchema(newData)
          window.scroll(0,0);
          }
        } else {
          this.products =[]
          this.isNoData = false;
        }
        this.isloading = false
      }
    )
  }
  getMaxPrice() {
    let priceArray: any = [];
    this.products.map(data => {
      priceArray.push(data.offerPrice);
    });
    priceArray.sort();
    this.zone.run(() => {
      this.options = {
        floor: 0,
        step: 100,
        minRange: 500,
        ceil: 3000
      }
      this.minPrice = 0;
      this.maxPrice =3000;
      this.options = {
        floor: 0,
        step: 100,
        minRange: 500,
        ceil: 3000
      }
      console.log(priceArray)
      //this.minPrice = Math.min(...priceArray)
      //this.minPrice = 0
      this.maxPrice = 3000
      this.cdr.detectChanges();
    })
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
      // this.alertMessage({ type: "danger", title: "Error Occured", value: "Please login first" });
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
    //    this.alertMessage({ type: "danger", title: "No item in cart ", value: "Please add any different product to add empty gift box" });
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

  trackByProductId(index: number, product: any): string {
    return product.productId;
}

}
