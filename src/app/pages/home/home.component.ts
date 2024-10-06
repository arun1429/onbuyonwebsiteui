import { Component, OnInit, AfterViewInit, ChangeDetectorRef, NgZone,QueryList, ViewChildren,ElementRef   } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { HomeService } from "src/app/services/home.service";
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { GlobalService } from 'src/app/services/global.service';
import { CartService } from 'src/app/services/cart.service';
import { JsonLDService } from '../../_services//json-ld.service';
import { BlogService } from 'src/app/services/blog.service';
import { Category } from './category.model';
import { Meta, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PipesModule } from "../../_pipes/pipes.module";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  host: {ngSkipHydration: 'true'},
  imports: [FormsModule,ReactiveFormsModule,RouterModule,CommonModule,RouterModule,CarouselModule,
    PipesModule, NgxSliderModule, NgxPaginationModule
],
})
export class HomeComponent  implements OnInit, AfterViewInit {
  shopName: string;
  show = false;
  currentContent: any;
  blogsData: any = [];
  videos: any = [];
  products: any = [];
  categories: any = [];
  stock: number = 0;
  discountStatus: boolean;
  statusOff: boolean;
  banners: any = [];
  brandAmbass: any = [];
  @ViewChildren('videoPlayer') videoPlayers: QueryList<ElementRef<HTMLVideoElement>>;

  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    nav: false,
    margin:20,
    autoplaySpeed: 800,
    autoplayTimeout: 10000,
    items: 3,
    dots: false,
    navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 2,
      },
      992: {
        items: 5,
      },

    }
  };

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


  productCarouselOption: OwlOptions = {
    autoplay: true,
    loop: true,
    nav: true,
    margin:20,
    autoplaySpeed: 1000,
    autoplayTimeout: 10000,
    items: 3,
    dots: false,
    navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 2,
      },
      992: {
        items: 4,
      },

    }
  }

  
  productCarouseloption2: OwlOptions = {
    autoplay: true,
    loop: true,
    nav: true,
    margin: 20,
    autoplaySpeed: 1000,
    autoplayTimeout: 10000,
    items: 4,
    dots: false,
    navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 4,
      },
    }
  }
  categoryCarouselOption: OwlOptions = {
    autoplay: true,
    loop: true,
    margin: 20,
    nav: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 10000,
    items: 3,
    dots: false,
    navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 3,
      },
    }
  }

  currentUser: any;
  latestProducts: any = [];
  salesProducts: any = [];
  buyOneProducts: any = [];
  
  
  currentURL='';
  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    public _AS: AlertService,
    private globalSrv: GlobalService,
    private _PS: HomeService,
    public JLDS:JsonLDService,
    private _CS: CartService,
    private _BS: BlogService,
    private updateMetaTagSrv:MetakeywordsService,
    private routes: ActivatedRoute,private seoService: SEOService,
    private titleService: Title ,private metaService: Meta,
    private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    
  }

  ngOnInit(): void {
    this.shopName = "All"
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("shopName",this.shopName)
    localStorage.setItem("currentPageNumber","1")
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.getVendorBanners();
    this.getVendorCategory();
    this.getVendorAmbass();
    this.getVendorBestProducts();
    this.getVendorLatestProducts();
    this.getVendorSalesProducts();
    this.getVendorBuyOneProducts();
    this.getWebContent()
    this.getProductsWeb()
    this.getBlogs()
    this.updateMetaTagSrv.getSeoContent('Home').subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.titleService.setTitle(data.data.title);
   
    this.metaService.addTag(
      { name: 'description', content:data.data.description }
    );
    this.metaService.addTag(
      { name: 'keywords', content: data.data.keywords }
    );
    this.metaService.addTag(
      { property: 'og:site_name', content: "OnBuyOn" }
    );
    this.metaService.addTag(
      { property: 'og:url', content: 'https://onbuyon.in/' }
    );
    this.metaService.addTag(
      { property: 'og:title', content: data.data.keywords }
    );
    this.metaService.addTag(
      { property: 'og:type', content: "website" }
    );
    this.metaService.addTag(
      { property: 'og:description', content:data.data.description }
    );
    this.metaService.addTag(
      { property: 'og:image', content: data.data.imageUrl }
    );
    this.metaService.addTag(
      { property: 'og:image:secure_url', content: data.data.imageUrl }
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
      { property: 'twitter:title', content: data.data.keywords }
    );
    this.metaService.addTag(
      { property: 'twitter:description', content: data.data.description }
    );
    this.metaService.addTag(
      { property: 'google-site-verification', content: "Sg_Wrdlj_mKvHiSnIA6pKcur1Y3Zj0ksxe7ROtn6Lzc" }
    );
        }
      }
    )
    this.seoService.updateCanonicalUrl('https://onbuyon.in/')
   // this.alertMessage({ type: "success", title: "Success", value: "data.meta.msg" });
    this.currentURL = window.location.href; 
    const newData1= {
      "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://onbuyon.in/",
        "name": "OnBuyOn",
}
    const newData= {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "OnBuyOn",
      "url": "https://onbuyon.in/",
      "contactPoint" : [{
              "@type" : "ContactPoint",
              "telephone" : "8826061888",
              "contactType" : "Customer Service"
            }],
      "description": "Artificial Jewellery- Shop for stunning designer jewellery online only at OnBuyOn India.  Check out earrings, necklaces, bracelets, and rings in our trendy collection. Cash on Delivery and Easy Returns. shipping.","telephone": "8826061888","sameAs": ["https://www.facebook.com/profile.php?id=61555004910741/","https://in.pinterest.com/Toq_lifestyle/","https://www.instagram.com/toq_co//"],"address": {
          "@type": "PostalAddress",
          "streetAddress": "H 88, Gali 6, Sant Nagar Ext.",
          "addressLocality": "New Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110001",
          "addressCountry": "India"
      },"logo": "https://onbuyon.in/assets/img/new_logo.png"}
  this.JLDS.insertSchema(newData1)
  this.JLDS.insertSchema(newData)


  }
  ngAfterViewInit() {
    this.outOfStock();
    this.cdr.detectChanges();
    // Set the muted property of all video elements to true after they are initialized
    this.videoPlayers.forEach(videoPlayer => {
      const videoElement = videoPlayer.nativeElement;
      videoElement.muted = true;
      // videoElement.autoplay = true;
      // Add 'preload' attribute to preload the video metadata for faster playback
      videoElement.preload = 'metadata';
    });
  }
  getVendorBanners() {
    this._PS.getVendorBanners(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.banners = data.data;
        } else {
          this.banners =[]
        }
      }
    )
  }
  
  getWebContent() {
    this._PS.getWebContent("Home").subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.currentContent = data.data;
        } else {
          this.currentContent = ""
        }
      }
    )
  }
  getProductsWeb() {
    this._PS.getProductsWeb().subscribe(
      (data: any) => {
        if (data.meta.status) {
        } else {
        }
      }
    )
  }
  getVendorAmbass() {
    this._PS.getVendorBrandAmbassador(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.brandAmbass = data.data;
        } else {
          this.brandAmbass =[]
        }
      }
    )
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
  outOfStock() {
    if (this.stock !== 0) {
      this.stock = 0;
    } else {
      this.stock = 1;
    }
  }
  getVendorBestProducts() {
    this._PS.getVendorBestProducts(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.products = data.data;
        } else {
          this.products = []
        }
      }
    )
  }



  getVendorCategory() {
    
    this._PS.getVendorCategory(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.categories = data.data;
          this.videos = this.categories.map((category:any) => ({
            ...category,
            categoryVideo: category.categoryVideo + '?timestamp=' + Date.now() // Ensure unique URL for each video
          }));
         
          console.log(this.videos)
        } else {
          this.categories = []
        }
      }
    )
  }

  getVendorLatestProducts() {
    this._PS.getVendorLatestProducts(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.latestProducts = data.data;
        } else {
          this.latestProducts =[]
        }
      }
    )
  }
  getVendorSalesProducts() {
    this._PS.getVendorSalesProducts(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.salesProducts = data.data;
        } else {
          this.salesProducts = []
        }
      }
    )
  }
  getVendorBuyOneProducts() {
    this._PS.getVendorBuyOneProducts(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.buyOneProducts = data.data;
        } else {
          this.buyOneProducts = []
        }
      }
    )
  }
  async addToCart(product :any) {
    if (isPlatformBrowser(this.platformId)) {
    if(this.currentUser){
      var totalCartCount =   localStorage.getItem("totalCartCount")
      if(product.subCategoryId == '65ab57a30af25e301ddb52f8' && totalCartCount == "0"){
     //   this.alertMessage({ type: "danger", title: "No item in cart ", value: "Please add any different product to add empty gift box" });
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
getBlogs() {
  this._BS.getBlogs(this.shopName,6).subscribe((data: any) => {
    if (data.meta.status) {
      this.blogsData = data.data;
    } else {
      this.blogsData = []
    }
  });
}
redirectToPages(callFor : string) {
  if (isPlatformBrowser(this.platformId))  {
     localStorage.setItem("currentPageNumber","1")}
  if(callFor == 'Special'){
    this.router.navigateByUrl("/specialofferproducts");
  }else if(callFor == 'Selling'){
    this.router.navigateByUrl("/bestsellingproducts");
  }else if(callFor == 'New'){
    this.router.navigateByUrl("/newarrivalproducts");
  }else if(callFor == 'BuyOne'){
    this.router.navigateByUrl("/buyonegetoneproducts");
  }else if(callFor == 'Blogs'){
    this.router.navigateByUrl("/blogs");
  }

  
}
redirectToProductPage(categorySlug : string) {
  if (isPlatformBrowser(this.platformId)) {
  localStorage.setItem("currentPageNumber","1")
  }
    this.router.navigateByUrl("/products/"+categorySlug);
   
}



}
