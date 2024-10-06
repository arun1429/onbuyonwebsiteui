import { Component, OnInit } from '@angular/core';
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { StartService } from 'src/app/services/start.service';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private updateMetaTagSrv:MetakeywordsService,private seoService: SEOService, private allContent :StartService,@Inject(PLATFORM_ID) private platformId: Object) { }
  allContentDetails: any;
  shopName: string;
  ngOnInit(): void {
    this.shopName = "All"
    if (isPlatformBrowser(this.platformId)) {
    this.shopName  = localStorage.getItem("shopName")
    }
    this.getContactDetails();
    this.updateMetaTagSrv.getSeoContent('FAQ').subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.updateMetaTagSrv.updateMetaKeywords(data.data.title,data.data.description,data.data.keywords,"https://onbuyon.in/faq",data.data.imageUrl)
        }
      }
    )
    this.seoService.updateCanonicalUrl('https://onbuyon.in/faq')
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
