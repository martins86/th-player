import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Loading } from '@shared/components/loading/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loading],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly loading = signal(true);

  ngOnInit() {
    setTimeout(() => {
      this.loading.set(false);
    }, 8000);
  }
}
