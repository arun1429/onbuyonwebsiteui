import { Component, OnInit } from '@angular/core';
import { UserService } from './_services';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { NgClass } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ RouterLink,RouterOutlet,FooterComponent,HeaderComponent,FormsModule,ReactiveFormsModule,CarouselModule]

})
export class AppComponent implements OnInit {
  title = 'OnBuyOn';

  constructor(private _US: UserService,  private titleService: Title ,private metaService: Meta,@Inject(PLATFORM_ID) private platformId: Object  ) { }

  ngOnInit() {
      this.titleService.setTitle("Buy Artificial Jewellery For Women. Check out earrings, necklaces, bracelets, and rings in our trendy collection. Cash on Delivery and Easy Returns.");

this.metaService.addTag(
  { name: 'description', content:"Buy Artificial Jewellery For Women. Check out earrings, necklaces, bracelets, and rings in our trendy collection. Cash on Delivery and Easy Returns." }
);
this.metaService.addTag(
  { name: 'keywords', content: "Buy Artificial Jewellery For Women. Check out earrings, necklaces, bracelets, and rings in our trendy collection. Cash on Delivery and Easy Returns."  }
);
this.metaService.addTag(
  { property: 'og:site_name', content: "OnBuyOn" }
);
this.metaService.addTag(
  { property: 'og:url', content: 'https://onbuyon.in/' }
);
if (isPlatformBrowser(this.platformId)) {
    const allReadyLoggedIn = localStorage.getItem("currentUser");
    if (allReadyLoggedIn) {
      const user = this.getLocalStorage();
      this.afterLogin(user);
    }
  }
  }

  getLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser;
    }
  }
  onActivate(_event: any): void {
    window.scrollTo(0,0);
   }
 
  afterLogin(user) {
    this._US.updateUser(true, user);
  }

}
