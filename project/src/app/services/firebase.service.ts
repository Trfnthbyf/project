import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Jsonp, URLSearchParams } from '@angular/http';

@Injectable()
export class FirebaseService {
  business: Observable<Business[]>
  constructor(private http: Http) { }

  getBusiness(category: string = null) {

    if (category != null) {
      // category {query: }
      return this.http.get('https://projects-6040a.firebaseio.com/business.json')
        .map((res) => res.json());
    } else {
      return this.http.get('https://projects-6040a.firebaseio.com/business.json')
        .map((res) => res.json());
    } 
  } 
     
  getCategories() {
        return this.http.get('https://projects-6040a.firebaseio.com/categories.json')
          .map((res) => res.json());
      }

addBusiness(newBusiness) {

 
} 
} 
 

export interface Business {
  company?: string;
  city?: string;
  state?: string;
  category: string;
}
  
export interface Category {
  key: string;
  name: string;
}
