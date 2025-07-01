import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MyService } from '../my-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news-component',
  imports: [CommonModule,FormsModule],
  providers: [MyService],
  templateUrl: './news-component.html',
  styleUrls: ['./news-component.css']
})
export class NewsComponent implements OnInit {
  articles: any[] = [];
  searchTerm = '';
  categories = [
  { name: 'General', key: 'general' },
  { name: 'Business', key: 'business' },
  { name: 'Entertainment', key: 'entertainment' },
  { name: 'Health', key: 'health' },
  { name: 'Science', key: 'science' },
  { name: 'Sports', key: 'sports' },
  { name: 'Technology', key: 'technology' }
  ];

  selectedCategory = 'general';  // default


  constructor(private myservice: MyService) {}

  ngOnInit() {
    this.getTopNews();
  }

getTopNews() {
  this.myservice.getTopHeadlines().subscribe((data: any) => {
    this.articles = data.articles.filter((a: any) => a.urlToImage);
  });
}
  onSearch() {
    if (this.searchTerm.trim()) {
      this.myservice.searchNews(this.searchTerm).subscribe((data: any) => {
        this.articles = data.articles.filter((a: any) => a.urlToImage);
      });
    }
  }
  onCategorySelect(category: string) {
    this.selectedCategory = category;
    this.myservice.getNewsByCategory(this.selectedCategory).subscribe((data: any) => {
      this.articles = data.articles.filter((a: any) => a.urlToImage);
    });
  }
}