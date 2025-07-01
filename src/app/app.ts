import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsComponent } from './news-component/news-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NewsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'PrimeNews';
}
