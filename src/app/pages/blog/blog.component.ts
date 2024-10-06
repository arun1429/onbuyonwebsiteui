import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { BlogService } from 'src/app/services/blog.service';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  shopName: string;
  blogsData: any = []
  constructor(
    private _PS: BlogService,
    private routes: ActivatedRoute
    ,private updateMetaTagSrv:MetakeywordsService,private seoService: SEOService,@Inject(PLATFORM_ID) private platformId: Object
  ) {
    
  }

  ngOnInit(): void {
    this.shopName = "All";
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("currentPageNumber","1")
    this.shopName = "All"
    localStorage.setItem("shopName",this.shopName)
    }
    this.getBlogs();
    this.updateMetaTagSrv.getSeoContent('Blog Page').subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.updateMetaTagSrv.updateMetaKeywords(data.data.title,data.data.description,data.data.keywords,"https://onbuyon.in/blogs",data.data.imageUrl)
        }
      }
    )
    this.seoService.updateCanonicalUrl('https://onbuyon.in/blogs')
  }

  getBlogs() {
    this._PS.getBlogs(this.shopName,1000).subscribe((data: any) => {
      if (data.meta.status) {
        this.blogsData = data.data;
      } else {
      }
    });
  }
}