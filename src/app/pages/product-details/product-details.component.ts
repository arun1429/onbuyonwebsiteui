import { Component, OnInit, ViewChild ,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { NgxSpinnerService } from "ngx-spinner";
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProfileService } from 'src/app/services/profile.service';
import { SlidesOutputData,OwlOptions } from 'ngx-owl-carousel-o';
import { JsonLDService } from '../../_services//json-ld.service';
import { ProductDetailsService } from "src/app/services/product-details.service";
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { GlobalService } from 'src/app/services/global.service';
import { CartService } from 'src/app/services/cart.service';
import { GlobalWishService } from 'src/app/services/globalwish.service';
import { ProductsService } from 'src/app/services/products.service';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { NgImageSliderComponent } from 'ng-image-slider';

declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent  implements OnInit {
  // @Input() selectedVariantIndex: number; 
  @ViewChild('bottomCarousel') bottomCarousel: CarouselComponent;
  @ViewChild('nav') slider: NgImageSliderComponent;
	@ViewChild('owlCar', { static: false }) owlCar: any;
  productDetails: any;
  products:[];
  productId: string;
  variantSlug: string;
  ratingsByUser: number = 0;
  lastIndex: number = 0;
  discountStatus = true;
  statusOff = true
  activeSlides: SlidesOutputData;
  isWishListStatus: boolean = false
  responsiveOptions2 = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];

  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  ratingArray = [
    {
      rating: 1,
      isActive: true
    },
    {
      rating: 2,
      isActive: false
    },
    {
      rating: 3,
      isActive: false
    },
    {
      rating: 4,
      isActive: false
    },
    {
      rating: 5,
      isActive: false
    }
  ];
  cartTypeArray = [
    {
      cardType: "Best Wishes",
      cardName: "Best Wishes"
    },
    {
      cardType: "Merry Christmas",
      cardName: "Merry Christmas"
    },
    {
      cardType: "Happy New Year",
      cardName: "Happy New Year"
    },
    {
      cardType: "Happy Birthday",
      cardName: "Happy Birthday"
    },
    {
      cardType: "Love You",
      cardName: "Love You"
    },
    {
      cardType: "Happy Anniversary",
      cardName: "Happy Anniversary"
    },
    {
      cardType: "Congratulations",
      cardName: "Congratulations"
    },
    {
      cardType: "Sorry",
      cardName: "Sorry"
    },
    {
      cardType: "Thankyou",
      cardName: "Thankyou"
    },
    {
      cardType: "Wedding Wishes",
      cardName: "Wedding Wishes"
    },
    {
      cardType: "Bridesmaids Proposal",
      cardName: "Bridesmaids Proposal"
    },
    {
      cardType: "Mother's Day",
      cardName: "Mother's Day"
    },
  ];
  reviewForm: FormGroup;
  reviews: any = [];
  selectedQuanity: number = 1;
  selectedIndexCard: number = 0;
  personalisedMessage: String = "";
  cardType: String = "";
  giftTo: String= "";
  giftFrom: String = "";
  selectedVariantIndex: number = 0;
  quoteFormGroup: FormGroup;
  currentUser: any;
  pincode: number;
  GSTPrice: any;
  offerPrise: any;
  price: any;
  discount: number;
  variantId:string;
  userId: string;
  variantName: any;
  variantRating:any;
  currentURL='';
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
  productCarouseloption3: OwlOptions = {
    autoplay: false,
    loop: false,
    nav: false,
    // margin: 5,
    autoplaySpeed: 1000,
    autoplayTimeout: 10000,
    items: 10,
    autoHeight: true,
    autoWidth: true,
    dots: false,
    navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
    responsive: {
      0: {
        items:3,
      },
      450: {
        items:5,
      },
     
      768: {
        items: 4,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 4,
      },
    }
  }
  productCarouseloption4: OwlOptions = {
    autoplay: false,
    loop: true,
    nav: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 10000,
    items: 1,
    autoHeight: true,
    autoWidth: true,
    dots: false,
    navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    }
  }
  imageObject = [];
  constructor(
    public _AS: AlertService,
    private routes: ActivatedRoute,
    private _PDS: ProductDetailsService,
    private _PS: ProductsService,
    private _FB: FormBuilder,
    private _PFS: ProfileService,
    private globalSrv: GlobalService,
    public JLDS:JsonLDService,
    private globalWishSrv: GlobalWishService,
    private _CS: CartService,private seoService: SEOService,private updateMetaTagSrv:MetakeywordsService,
    private spinnerService: NgxSpinnerService,
    private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {
    
    this.reviewForm = this._FB.group({
      review: ['', Validators.required],
      userName: ['', Validators.required],
      userEmailId: ['', [Validators.required, Validators.email]]
    })
    if (isPlatformBrowser(this.platformId)) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    console.log(" this.currentUser : "+ this.currentUser)
    this.quoteFormGroup = this._FB.group({
      quantity: ['', Validators.required],
      fullName: [this.currentUser && this.currentUser.fullName ? this.currentUser.fullName : '', Validators.required],
      userEmailId: [this.currentUser && this.currentUser.userEmailId ? this.currentUser.userEmailId : '', Validators.required],
      mobileNo: [this.currentUser && this.currentUser.mobileNo ? this.currentUser.mobileNo : '', Validators.required],
    })
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.routes.params.subscribe(
      data => {
        this.variantSlug = data.variantSlug;
        if (this.variantSlug) {
          this.getProductDetailsBySlug();
          this.seoService.updateCanonicalUrl('https://onbuyon.in/product-details/'+this.variantSlug)
        }
      }
    )
    this.getDiscount(this.offerPrise, this.price)
    
  }

  }

  imageList: any
  newImg: any;
  getProductDetailsBySlug() {
    this.currentURL = window.location.href; 
    let tepmLocalStorage = localStorage.getItem('currentUser')
    if (tepmLocalStorage) {
      this.userId = JSON.parse(tepmLocalStorage).userId;
    }
    this.spinnerService.show();
    this._PDS.getProductDetailBySlug(this.variantSlug, this.userId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.productDetails = data.data;
          this.productId = data.data.productId
          this.isWishListStatus=  data.data.wishListStatus
          if(data.data.categoryId == "65aaba800af25e301ddb5094"){
            this.cardType = "Best Wishes";
          }
          console.log(this.productDetails)
          this.spinnerService.hide();
          if (this.productDetails) {
            this.reviews=data.data.reviews;
            this.productDetails.variant.map((val, i) => {
              this.variantId=val.variantId;
             
             
              if (val.variantSlug === this.variantSlug) {
                this.selectedVariantIndex = i
                this.variantName=val.variantName;
                this.getProductBySlug(data.data.categoryId,val.variantId)
               
                this.variantId=val.variantId;
                this.imageList = { image: val.variantImg }
                this.newImg = this.imageList.image[0];
                val.variantImg.map((val) => {
                  this.imageObject.push({
                    image:val,
                    thumbImage: val,
                  })
                })
                this.slider.defaultActiveImage =0
                

                this.updateMetaTagSrv.getSeoContent(data.data.productName).subscribe(
                  (data: any) => {
                    if (data.meta.status) {
                      this.updateMetaTagSrv.updateMetaKeywords(data.data.title,data.data.description,data.data.keywords,"https://onbuyon.in/product-details/"+this.variantSlug,data.data.imageUrl)
                    }
                  }
                )
                this.variantRating=this.productDetails.variant[this.selectedVariantIndex].overAllRating
              }
            });
            const newData= {
              "@context": "https://schema.org/", 
              "@type": "Product", 
              "url":this.currentURL,
              "name":this.productDetails.variantName,
              "image":this.newImg,
              "description": this.productDetails.shortDescription,
              "brand": "OnBuyOn",
              "offers": {
                  "@type": "Offer",
                  "url":this.currentURL,
                  "availability": "http://schema.org/InStock",
                  "price":this.productDetails.offerPrice,
                  "priceCurrency": "INR"	
                }
          
          }
          this.JLDS.insertSchema(newData)
          }
        }
        window.scroll(0,0);
      }
    )
  }
  imageClickHandler(e) {
    this.owlCar.to('https://toqnkart.s3.ap-south-1.amazonaws.com/variantImg-yellow3-1711781798859-826579.jpeg')
    console.log('image click', e);
  }
  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    var currentIndex = Number(data.startPosition +1)
    console.log("currentIndex "+ currentIndex);
    console.log("lastIndex "+ this.lastIndex);
  //  var newIndex = 0
  //   if(this.lastIndex <  currentIndex ){
  //     newIndex = Number(currentIndex +1)
  //   }else  if(this.lastIndex ==  currentIndex){
  //     newIndex = 0
  //   }else {
  //     if (currentIndex == 0 ){
  //       newIndex = Number(currentIndex +1)
  //     }else {
  //       newIndex = Number(currentIndex - 1)
  //     }
     
  //   }
    this.lastIndex  = currentIndex;
   // this.slider.defaultActiveImage = newIndex
  }
  getProductDetails() {
    let tepmLocalStorage = localStorage.getItem('currentUser')
    if (tepmLocalStorage) {
      this.userId = JSON.parse(tepmLocalStorage).userId;
    }
    this.spinnerService.show();
    this._PDS.getProductDetails(this.productId, this.userId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.productDetails = data.data;
          this.isWishListStatus=  data.data.wishListStatus
          if(data.data.categoryId == "65aaba800af25e301ddb5094"){
            this.cardType = "Best Wishes";
          }
          
          console.log(this.productDetails)
          this.spinnerService.hide();
          if (this.productDetails) {
            this.reviews=data.data.reviews;
            this.productDetails.variant.map((val, i) => {
              this.variantId=val.variantId;
             
              if (val.variantSlug === this.variantSlug) {
                this.selectedVariantIndex = i
                this.variantName=val.variantName;
                this.getProductBySlug(data.data.categoryId,val.variantId)
               
                this.variantId=val.variantId;
                this.imageList = { image: val.variantImg }
                this.slider.defaultActiveImage =0
                this.newImg = this.imageList.image[0];
                val.variantImg.map((val) => {
                  this.imageObject.push({
                    image:val,
                    thumbImage: val,
                  })
                })
                
              }
              this.variantRating=this.productDetails.variant[this.selectedVariantIndex].overAllRating
            });
          }
        }
      }

    )
  }
  getProductBySlug(categoryId: string,idd: string) {
    let obj = {
      id: categoryId,
     variantId  : idd
    } 
    this._PS.getRecommendedProductBycatIdSubCatId(obj).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.products = data.data;
        } else {
          this.products =[]
        }
      }
    )
  }
  




  setImg(img) {
    this.newImg = img
    $('#' + this.productDetails?.variant[this.selectedVariantIndex]?.variantImg[img]).trigger('click')
  }

  changeVariant(i, productDetails) {
    this.selectedVariantIndex = i;
    this.router.navigateByUrl("/product-details/"+productDetails.variant[i].variantSlug);
  }
  changeCartType(i,cartDetails) {
    this.selectedIndexCard = i
    this.cardType = cartDetails[i].cardType;
  }
  getDiscount(offerPrice, price) {

    if (offerPrice !== price) {
      this.statusOff = false
      let percentage = (offerPrice / price) * 100

      let p = (100 - percentage).toFixed(0)
      if (Number(p) !== 0) {

        this.discountStatus = true
      }
      else {
        this.discountStatus = false
      }
      return p
    } else {
      this.statusOff = true
    }
  }

  checkDiscount(price, offerPrice) {
    if (price !== offerPrice) {
      return false
    }
    else {
      return true
    }
  }

  checkPincode() {
    if (this.pincode && this.pincode.toString().length >= 6) {
      let obj = {
        pincode: this.pincode,
        productId: this.productDetails.productId,
        variantId: this.productDetails.variant[this.selectedVariantIndex].variantId,
        vendorId: this.productDetails.vendorId,
        // userId: this.currentUser.userId,
      }
      this._PDS.checkPincode(obj).subscribe(
        (data: any) => {
          if (data.meta.status) {
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          } else {
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }, error => {
      //    this.alertMessage({ type: "danger", title: "Error Occured", value: error && error.error && error.error.meta.msg ? error.error.meta.msg : error.message });
        }
      )
    }
  }

  selectRating(i, index) {
    $('.remove').removeClass('svgActive')
    for (let j = 0; j <= index; j++) {
      $(`.add-new-class${j}`).addClass('svgActive');
    }
    this.ratingsByUser = i;
  }

  submitReview() {
    if (this.reviewForm.valid) {
      let reviewData = {
        productId: this.productDetails.productId,
        variantId: this.productDetails.variant[this.selectedVariantIndex].variantId,
        vendorId: this.productDetails.vendorId,
        rating: this.ratingsByUser,
        ...this.reviewForm.value
      }
      this._PDS.submitReview(reviewData).subscribe(
        (data: any) => {
          if (data.meta.status) {
            $('#myTab a[href="#info"]').tab('show');
            this.ratingsByUser = 0;
            this.reviewForm.reset();
            $('.remove').removeClass('svgActive');
            window.scrollTo(0, 0);
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          } else {
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      )
    }
  }

  increment() {
    this.selectedQuanity++;
  }

  decrement() {
    if (this.selectedQuanity > 1) {
      this.selectedQuanity--;
    }
  }

  increaseDecreaseProductNumber(event) {
    this.selectedQuanity = Number(event.target.value);
  }
  changePerMessage(event) {
    this.personalisedMessage = event.target.value;
  }
  changeGiftTo(event) {
    this.giftTo = event.target.value;
  }
  changeGiftFrom(event) {
    this.giftFrom = event.target.value;
  }
  buyNow(product : any) {
    if (isPlatformBrowser(this.platformId)) {
    if(this.currentUser){
      var totalCartCount =   localStorage.getItem("totalCartCount")
      if(product.subCategoryId == '65ab57a30af25e301ddb52f8' && totalCartCount == "0"){
      //  this.alertMessage({ type: "danger", title: "No item in cart ", value: "Please add any different product to add empty gift box" });
      }else {
    const cartData = {
      categoryId: product.categoryId,
      vendorId: product.vendorId,
      productId: product.productId,
      selectQuantity: this.selectedQuanity,
      subCategoryId: product.subCategoryId,
      variantId: product.variant[this.selectedVariantIndex].variantId,
      isBuyNow: true,
      personalisedMessage: this.personalisedMessage,
      cardType :this.cardType,
      giftTo : this.giftTo,
      giftFrom :this.giftFrom
    };
    this._CS.addToCart(cartData).subscribe(
      (data: any) => {
        if (data.meta.status) {
          //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          this.router.navigateByUrl("/checkout")
        } else {
          //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      },
      err => {
        this.router.navigateByUrl("/login");
    //    this.alertMessage({ type: "danger", title: "Error Occured", value: "Please login first" });
      }
    );
      }
    }else {
      this.router.navigateByUrl("/login");
     //   this.alertMessage({ type: "danger", title: "Error Occured", value: "Please login first" });
    }
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
        selectQuantity: this.selectedQuanity,
        subCategoryId: product.subCategoryId,
        variantId: product.variant[this.selectedVariantIndex].variantId,
        personalisedMessage: this.personalisedMessage,
        cardType :this.cardType,
        giftTo : this.giftTo,
        giftFrom :this.giftFrom
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
         if(lastSavedCart[i].variantId == product.variant[this.selectedVariantIndex].variantId){
         checkLastIndex = i
         break;
         }
        }
        if(checkLastIndex != -1){
          lastSavedCart[checkLastIndex].selectQuantity =  this.selectedQuanity
        }else {
          lastSavedCart.push({
            categoryId: product.categoryId,
            vendorId: product.vendorId,
            productId: product.productId,
            variantImg:  product.variant[this.selectedVariantIndex].variantImg,
            productName: product.productName,
            brand: product.brand,
            selectQuantity: this.selectedQuanity,
            subCategoryId: product.subCategoryId,
            variantId: product.variant[this.selectedVariantIndex].variantId,
            offerPrice: product.variant[this.selectedVariantIndex].offerPrice,
            totalDiscountedPrice: Number(product.variant[this.selectedVariantIndex].offerPrice * this.selectedQuanity),
            personalisedMessage: this.personalisedMessage,
            cardType :this.cardType,
            giftTo : this.giftTo,
            giftFrom :this.giftFrom,
            
          })
        }
        console.log("lastSavedCart.length 1: "+JSON.stringify(lastSavedCart.length))
        this.globalSrv.theItem = lastSavedCart.length.toString()
        await localStorage.setItem("lastSavedCart" , JSON.stringify(lastSavedCart))
    
      }else {
        lastSavedCart = []
        if(product.subCategoryId == '65ab57a30af25e301ddb52f8'){
       //   this.alertMessage({ type: "danger", title: "No item in cart ", value: "Please add any different product to add empty gift box" });
        }else {
        lastSavedCart.push({
          categoryId: product.categoryId,
            vendorId: product.vendorId,
            productId: product.productId,
            variantImg:  product.variant[this.selectedVariantIndex].variantImg,
            productName: product.productName,
            brand: product.brand,
            selectQuantity: this.selectedQuanity,
            subCategoryId: product.subCategoryId,
            variantId: product.variant[this.selectedVariantIndex].variantId,
            offerPrice: product.variant[this.selectedVariantIndex].offerPrice,
            totalDiscountedPrice: Number(product.variant[this.selectedVariantIndex].offerPrice * this.selectedQuanity),
        })
        console.log("lastSavedCart.length 1: "+JSON.stringify(lastSavedCart.length))
        this.globalSrv.theItem = lastSavedCart.length.toString()
        await localStorage.setItem("lastSavedCart" , JSON.stringify(lastSavedCart))
      }
    }
      }
    }
    }
   
    async addToWishList(product :any) {
      if (isPlatformBrowser(this.platformId)) {
    console.log(" this.currentUser : "+this.currentUser)
    if(this.currentUser){
      const body = {
        categoryId: product.categoryId,
        productId: product.productId,
        selectQuantity: 1,
        subCategoryId: product.subCategoryId,
        vendorId: product.vendorId,
        variantId: product.variant[this.selectedVariantIndex].variantId
      };
      this._PFS.addToWishList(body).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.getProductDetails();
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          }
        }, error => {
        }
      );
    }else {
      var lastSavedWish = []
      lastSavedWish =   JSON.parse(localStorage.getItem("lastSavedWish"))
      if(lastSavedWish == null  || lastSavedWish.length == 0){
        lastSavedWish = []
        lastSavedWish.push({
          categoryId: product.categoryId,
          productId: product.productId,
          selectQuantity: 1,
          subCategoryId: product.subCategoryId,
          vendorId: product.vendorId,
          variantId: product.variant[this.selectedVariantIndex].variantId
        })
        console.log("lastSavedWish.length 1: "+JSON.stringify(lastSavedWish.length))
        this.globalWishSrv.theItem = lastSavedWish.length.toString()
        this.isWishListStatus =true
        await localStorage.setItem("lastSavedWish" , JSON.stringify(lastSavedWish))
      }else {
        var checkLastIndex = -1;
        for(let i=0; i<lastSavedWish.length;i++){
         if(lastSavedWish[i].variantId == product.variant[this.selectedVariantIndex].variantId){
         checkLastIndex = i
         break;
         }
        }
        console.log("checkLastIndex : "+checkLastIndex)
        if(checkLastIndex == -1){
          lastSavedWish.push({
            categoryId: product.categoryId,
        productId: product.productId,
        selectQuantity: 1,
        subCategoryId: product.subCategoryId,
        vendorId: product.vendorId,
        variantId: product.variant[this.selectedVariantIndex].variantId
          })
          this.isWishListStatus =true
        }else{
          this.isWishListStatus =false
          lastSavedWish.splice(checkLastIndex, 1)
        }
        console.log("lastSavedWish.length 1: "+JSON.stringify(lastSavedWish.length))
        this.globalWishSrv.theItem = lastSavedWish.length.toString()
        await localStorage.setItem("lastSavedWish" , JSON.stringify(lastSavedWish))
       
      }
      }
    }
  }

  scrollDiv(ele: string) {
    $('#myTab a[href="#reviews"]').tab('show')
    let el = document.getElementById(ele);
    el.scrollIntoView({ behavior: "smooth" });
  }

  showCouponModal() {
    if (this.currentUser) {
      this.quoteFormGroup.patchValue(this.currentUser);
    }
    $('#quoteModal').modal('show');
    $('#quoteModal').on('hidden.bs.modal', (e) => {
      this.quoteFormGroup.reset();
    })
  }

  hideCouponModal() {
    $('#quoteModal').modal('hide');
  }

  getQuote() {
    if (this.quoteFormGroup.valid) {
      let obj = {
        productId: this.productDetails.productId,
        variantId: this.productDetails.variant[this.selectedVariantIndex].variantId,
        vendorId: this.productDetails.vendorId,
        deviceType: 'web',
        ...this.quoteFormGroup.value
      }
      this._PDS.getQuote(obj).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.hideCouponModal();
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          } else {
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }, error => {
        }
      )
    }
  }

  getReviewStar(div) {
    let data = []
    if(div===0){
      data=['','','','','']
    }
    if(Math.floor(div)===1){
     data=[true,'','','','']
    }
    else if(Math.floor(div)===2){
      data=[true,true,'','','']
    }
    else if(Math.floor(div)===3){
      data=[true,true,true,'','']
    }
    else if(Math.floor(div)===4){
      data=[true,true,true,true,'']

    }
    else if(Math.floor(div)===5){
      data=[true,true,true,true,true]

    }
    else {
      data=['','','','','']
    }

    return data
  }
  
}
