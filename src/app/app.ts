import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplashScreen } from '@shared/components/splash-screen/splash-screen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SplashScreen],
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
