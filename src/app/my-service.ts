import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {

  API_KEY = '6dfef32458304958b57486889f45ebfc';
  url = 'https://newsapi.org/v2/'

  constructor(private http:HttpClient) { }

  getTopHeadlines() {
    return this.http.get<any>(this.url+"top-headlines?category=general" + "&apiKey=" + this.API_KEY);
  }

  searchNews(query: string) {
    return this.http.get<any>(this.url+"everything?q=" + query + "&apiKey=" + this.API_KEY +"&sortBy=publishedAt&language=en");
  }

  getNewsByCategory(category: string) {
    return this.http.get(`${this.url}top-headlines?category=${category}&apiKey=${this.API_KEY}`);
  }
}