import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.css'
})
export class ToggleButtonComponent {
  state = signal<string>('Off');

  toggle() {
    (this.state() === 'Off') ? this.state.set('On') : this.state.set('Off');
  }
}
