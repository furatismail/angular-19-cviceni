import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TimeComponent } from './shared/components/time/time.component';
import { SignalSearchComponent } from './features/signals/signal-search/signal-search.component';
import { IsEvenComponent } from './features/signals/is-even/is-even.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TimeComponent, SignalSearchComponent, IsEvenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trencin-2';
}
