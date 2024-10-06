import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BlogDetailsService {

  constructor(private http: HttpClient) { }
  getBlogDetails(blogId) {
    const url = `${environment.apiUrl}blogs/details/`+blogId;
    return this.http.get(url);
  }
}


