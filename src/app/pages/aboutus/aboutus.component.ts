import { Component, OnInit } from '@angular/core';
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { StartService } from 'src/app/services/start.service';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(private updateMetaTagSrv:MetakeywordsService ,private seoService: SEOService, private allContent :StartService,@Inject(PLATFORM_ID) private platformId: Object) { }
  allContentDetails: any;
  shopName: string;
  ngOnInit(): void {
    this.shopName = "All"
    if (isPlatformBrowser(this.platformId)) {
    this.shopName  = localStorage.getItem("shopName")
    localStorage.setItem("currentPageNumber","1")
    }
    this.getContactDetails();
    this.updateMetaTagSrv.getSeoContent('About Us').subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.updateMetaTagSrv.updateMetaKeywords(data.data.title,data.data.description,data.data.keywords,"https://onbuyon.in/about-us",data.data.imageUrl)
        }
      }
    )
    this.seoService.updateCanonicalUrl('https://onbuyon.in/about-us')
  }
  getContactDetails() {
    this.allContent.getAllContent(this.shopName).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.allContentDetails = data.data;
        }
      }
    )
  }
}
