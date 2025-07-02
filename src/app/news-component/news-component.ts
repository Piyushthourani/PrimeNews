import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MyService } from '../my-service';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-news-component',
  imports: [CommonModule, FormsModule, PaginatorModule],
  providers: [MyService],
  templateUrl: './news-component.html',
  styleUrls: ['./news-component.css']
})
export class NewsComponent implements OnInit {
  articles: any[] = [];
  allArticles: any[] = []; // Store all articles for pagination
  searchTerm = '';
  
  // Pagination properties
  totalRecords = 0;
  rows = 9; // Number of articles per page (3x3 grid)
  first = 0; // Index of first record
  
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
    this.allArticles = data.articles.filter((a: any) => a.urlToImage);
    this.totalRecords = this.allArticles.length;
    this.first = 0; // Reset to first page
    this.updatePaginatedArticles();
  });
}

  onSearch() {
    if (this.searchTerm.trim()) {
      this.myservice.searchNews(this.searchTerm).subscribe((data: any) => {
        this.allArticles = data.articles.filter((a: any) => a.urlToImage);
        this.totalRecords = this.allArticles.length;
        this.first = 0; // Reset to first page
        this.updatePaginatedArticles();
      });
    }
  }

  onCategorySelect(category: string) {
    this.selectedCategory = category;
    this.myservice.getNewsByCategory(this.selectedCategory).subscribe((data: any) => {
      this.allArticles = data.articles.filter((a: any) => a.urlToImage);
      this.totalRecords = this.allArticles.length;
      this.first = 0; // Reset to first page
      this.updatePaginatedArticles();
    });
  }

  // Handle page change event from paginator
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedArticles();
  }

  // Update the articles array for current page
  updatePaginatedArticles() {
    const startIndex = this.first;
    const endIndex = this.first + this.rows;
    this.articles = this.allArticles.slice(startIndex, endIndex);
  }
}