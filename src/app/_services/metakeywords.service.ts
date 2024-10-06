import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class MetakeywordsService {

  constructor(private titleService: Title ,private metaService: Meta,private http:HttpClient) { }

  getSeoContent(page:any){
    const url=`${environment.apiUrl}seodataweb/seocontent?page=${page}&shopName=All`
    return this.http.get(url);
  }


  getContent(id:any){
    const url=`${environment.apiUrl}/seodataweb/getseowebcontentid?id=${id}`
    // /getseowebcontentid?id=
    return this.http.get(url);
  }

  updateMetaKeywords(title: string,description: string,keywords: string,url : string,imageUrl: string ){
    this.titleService.setTitle(title);
   
    this.metaService.addTag(
      { name: 'description', content: description }
    );
    this.metaService.addTag(
      { name: 'keywords', content: keywords }
    );
    this.metaService.addTag(
      { property: 'og:site_name', content: "OnBuyOn" }
    );
    this.metaService.addTag(
      { property: 'og:url', content: url }
    );
    this.metaService.addTag(
      { property: 'og:title', content: keywords }
    );
    this.metaService.addTag(
      { property: 'og:type', content: "website" }
    );
    this.metaService.addTag(
      { property: 'og:description', content: description }
    );
    this.metaService.addTag(
      { property: 'og:image', content: imageUrl }
    );
    this.metaService.addTag(
      { property: 'og:image:secure_url', content: imageUrl }
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
      { property: 'twitter:title', content: keywords }
    );
    this.metaService.addTag(
      { property: 'twitter:description', content: description }
    );
    this.metaService.addTag(
      { property: 'google-site-verification', content: "Sg_Wrdlj_mKvHiSnIA6pKcur1Y3Zj0ksxe7ROtn6Lzc" }
    );
  }
}
