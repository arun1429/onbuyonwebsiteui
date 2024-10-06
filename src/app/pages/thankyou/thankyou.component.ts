import { Component, NgZone, OnInit } from '@angular/core';
import { AlertService, WidnowRefService } from "../../_services/index";
import { Router, ActivatedRoute } from "@angular/router";

import { environment } from 'src/environments/environment';
import { MetakeywordsService } from '../../_services/metakeywords.service';
import { SEOService } from '../../_services/seo.service';
import { Meta, Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThanYouComponent  implements OnInit {

 

  constructor(
    public _AS: AlertService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private zone: NgZone,
    private titleService: Title ,private metaService: Meta,
    private winRef: WidnowRefService,private updateMetaTagSrv:MetakeywordsService
  ) {
  }

  ngOnInit(): void {
      this.titleService.setTitle("Best Home Title");

this.metaService.addTag(
  { name: 'description', content:"Best home description" }
);
this.metaService.addTag(
  { name: 'keywords', content: "Best home keywords" }
);
this.metaService.addTag(
  { property: 'og:site_name', content: "OnBuyOn" }
);
this.metaService.addTag(
  { property: 'og:url', content: 'https://onbuyon.in/' }
);
this.metaService.addTag(
  { property: 'og:title', content: "Best home keywords" }
);
this.metaService.addTag(
  { property: 'og:type', content: "website" }
);
this.metaService.addTag(
  { property: 'og:description', content:"Best home description" }
);
this.metaService.addTag(
  { property: 'og:image', content: 'https://onbuyon.in/' }
);
this.metaService.addTag(
  { property: 'og:image:secure_url', content: 'https://onbuyon.in/' }
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
  { property: 'twitter:title', content:"Best home keywords" }
);
this.metaService.addTag(
  { property: 'twitter:description', content: "Best home des" }
);
this.metaService.addTag(
  { property: 'google-site-verification', content: "Sg_Wrdlj_mKvHiSnIA6pKcur1Y3Zj0ksxe7ROtn6Lzc" }
);
    }
}
