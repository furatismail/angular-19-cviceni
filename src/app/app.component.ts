import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TimeComponent } from './shared/components/time/time.component';
import { SignalSearchComponent } from './features/signals/signal-search/signal-search.component';
import { IsEvenComponent } from './features/signals/is-even/is-even.component';
import { GlitchFreeComponent } from './features/signals/glitch-free/glitch-free.component';
import { GlitchComponent } from './features/signals/glitch/glitch.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TimeComponent, SignalSearchComponent, IsEvenComponent, GlitchFreeComponent, GlitchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trencin-2';

  // ❗ POZOR: counterValue je obyčejná proměnná, ne signal.
  // Když se její hodnota změní, Angular to automaticky nedetekuje
  // a nepředá novou hodnotu do `@Input()` v potomkovi.
  // Výsledkem je, že `transform` nebo `computed()` v IsEvenComponent
  // nebude znovu spuštěn a komponenta zůstane se starou hodnotou.

  counterValue = 5;

  ngOnInit() {
    setTimeout(() => {
      this.counterValue = 10;
    }, 3000);
  }

  // ✅ Pokud chcete, aby se změna propagovala, použijte signal:
  //
  // counterValue = signal(5);
  //
  // ngOnInit() {
  //   setTimeout(() => {
  //     this.counterValue.set(10);
  //   }, 3000);
  // }
}
