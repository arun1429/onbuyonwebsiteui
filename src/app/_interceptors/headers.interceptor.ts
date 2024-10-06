import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
    const currentUser: any = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUser : "+currentUser)
    if (currentUser && currentUser.token) {
      req = req.clone({
        headers: new HttpHeaders({
          authkey: currentUser.token,
          Accept: "application/json"
        })
      });
    }
  }
    const fDataUrl1 = "/banners";
    const fDataUrl2 = "";
    const isFormData = fDataUrl1 || fDataUrl2;
    if (isFormData) {
      return next.handle(req);
    }
    if (!req.headers.has("Content-Type")) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }
    return next.handle(req);
  }

}
