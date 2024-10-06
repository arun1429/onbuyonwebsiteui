import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { CartComponent } from './pages/cart/cart.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { DeliveryInformationComponent } from './pages/delivery-information/delivery-information.component';
import { ReturnPolicyComponent } from './pages/return-policy/return-policy.component';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ThanYouComponent } from './pages/thankyou/thankyou.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "forgotpassword",
    component: ForgotPasswordComponent
  },
  {
    path: "products",
    loadChildren: () => import('./pages/products/product.module').then(m => m.ProductModule)
  },
  {
    path: "vendors",
    loadChildren: () => import('./pages/allvendors/allvendors.module').then(m => m.AllVendorsModule)
  },
  {
    path: "product-details",
    loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule)
  },
  {
    path: "search",
    loadChildren: () => import('./pages/search-products/search-products.module').then(m => m.SearchProductsModule)
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "wishlist",
    loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishListModule)
  },
  {
    path: "checkout",
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: "profile",
    loadChildren: () => import('./pages/side-nav/side-nav.module').then(m => m.SideNavModule)
  },
  {
    path: "bestsellingproducts",
    loadChildren: () => import('./pages/selling-products/selling-products.module').then(m => m.SellingProductsModule)
  },
  {
    path: "newarrivalproducts",
    loadChildren: () => import('./pages/newarrival-products/newarrival-products.module').then(m => m.NewArrivalProductsModule)
  },
  {
    path: "specialofferproducts",
    loadChildren: () => import('./pages/specialoffer-products/specialoffer-products.module').then(m => m.SpecialOfferProductsModule)
  },
  {
    path: "buyonegetoneproducts",
    loadChildren: () => import('./pages/buyone-products/buyone-product.module').then(m => m.BuyOneModule)
  },
  {
    path: "about-us",
    component: AboutusComponent
  },
  {
    path: "delivery-information",
    component: DeliveryInformationComponent
  },
  {
    path: "return-policy",
    component: ReturnPolicyComponent
  },
  {
    path: "terms-conditions",
    component: TermsConditionComponent
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent
  },
  {
    path: "faq",
    component: FaqComponent
  },
  {
    path: "contact-us",
    component: ContactUsComponent
  },
  {
    path: "blogs",
    loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  },{
    path: "blogs",
    loadChildren: () => import('./pages/blog-detail/blog-detail.module').then(m => m.BlogDetailModule)
  }, {
    path: "thankyou",
    component: ThanYouComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
