import { Component, OnInit } from '@angular/core';
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
@Component({
  selector: 'app-delivery-information',
  templateUrl: './delivery-information.component.html',
  styleUrls: ['./delivery-information.component.css']
})
export class DeliveryInformationComponent implements OnInit {

  constructor(private updateMetaTagSrv:MetakeywordsService,private seoService: SEOService) { }

  ngOnInit(): void {
    this.updateMetaTagSrv.getSeoContent('Delivery Info').subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.updateMetaTagSrv.updateMetaKeywords(data.data.title,data.data.description,data.data.keywords,"https://onbuyon.in/delivery-information",data.data.imageUrl)
        }
      }
    )
    this.seoService.updateCanonicalUrl('https://onbuyon.in/delivery-information')
  }

}
