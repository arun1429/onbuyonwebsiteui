import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MetakeywordsService } from '..//../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { BlogDetailsService } from 'src/app/services/blog-detail.service';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogId : any =""
  blogsData: any = ""
  constructor(
    private _PS: BlogDetailsService,
    private routes: ActivatedRoute ,private updateMetaTagSrv:MetakeywordsService,private seoService: SEOService
  ) {
    
  }

  ngOnInit(): void {
    this.routes.params.subscribe((data: any)  => {
      this.blogId = data.blogId;
      this.getBlogDetails();
      this.seoService.updateCanonicalUrl('https://onbuyon.in/blogs/'+data.blogId)
      this.updateMetaTagSrv.getSeoContent(data.blogId).subscribe(
        (dataseo: any) => {
          if (dataseo.meta.status) {
            this.updateMetaTagSrv.updateMetaKeywords(dataseo.data.title,dataseo.data.description,dataseo.data.keywords,"https://onbuyon.in/blogs/"+data.blogId,dataseo.data.imageUrl)
          }
        }
      )

    });
   
  }

  getBlogDetails() {
    this._PS.getBlogDetails(this.blogId).subscribe((data: any) => {
      if (data.meta.status) {
        this.blogsData = data.data;
        this.updateMetaTagSrv.getSeoContent(this.blogsData.blogsTitle).subscribe(
          (dataseo: any) => {
            if (dataseo.meta.status) {
              this.updateMetaTagSrv.updateMetaKeywords(dataseo.data.title,dataseo.data.description,dataseo.data.keywords,"https://onbuyon.in/blogs/"+this.blogId,dataseo.data.imageUrl)
            }
          }
        )
      } else {
      }
    });
  }
}