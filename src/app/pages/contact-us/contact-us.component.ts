import { Component, OnInit } from '@angular/core';
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private updateMetaTagSrv:MetakeywordsService,private seoService: SEOService) { }

  ngOnInit(): void {
    this.seoService.updateCanonicalUrl('https://onbuyon.in/contact-us')
    this.updateMetaTagSrv.getSeoContent('Contact Us').subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.updateMetaTagSrv.updateMetaKeywords(data.data.title,data.data.description,data.data.keywords,"https://onbuyon.in/contact-us",data.data.imageUrl)
        }
      }
    )
  }

}
