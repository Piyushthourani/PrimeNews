import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NewsComponent } from './news-component/news-component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NewsComponent , RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected title = 'PrimeNews';
}
