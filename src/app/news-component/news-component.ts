import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MyService } from '../my-service';

@Component({
  selector: 'app-news-component',
  imports: [CommonModule],
  providers: [MyService],
  templateUrl: './news-component.html',
  styleUrls: ['./news-component.css']
})
export class NewsComponent implements OnInit {
  headlines: any[] = [];

  constructor(private myservice: MyService) {}

  ngOnInit() {
    this.myservice.getTopHeadlines().subscribe((data: any) => {
      this.headlines = data.articles;
      console.log(this.headlines);
    });
  }
}
