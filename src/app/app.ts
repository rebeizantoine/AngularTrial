import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  constructor() {
    const exp = Math.floor(Date.now() / 1000) + 3600; // Unix timestamp that has a 1h expiry
    console.log(exp);
  }
}
