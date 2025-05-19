// Importuje potřebné nástroje z Angular core knihovny
import { Component, contentChild, ContentChild, effect } from '@angular/core';

// Importuje vkládanou komponentu ToggleButtonComponent
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';

// Dekorátor, který definuje metadate komponenty
@Component({
  selector: 'app-toggle-container', // Selektor komponenty použitelný v šabloně jako <app-toggle-container>
  standalone: true,                 // Komponenta je standalone – nezávislá na NgModule
  imports: [ToggleButtonComponent], // Importuje ToggleButtonComponent, aby mohla být použita ve slotu <ng-content>
  templateUrl: './toggle-container.component.html', // Cesta k HTML šabloně komponenty
  styleUrl: './toggle-container.component.css'      // Cesta ke stylům komponenty
})
export class ToggleContainerComponent {
  // Reaktivní dotaz na vloženou komponentu ToggleButtonComponent (novinka v Angular 16+)
  // contentChild vrací signal, který se aktualizuje, když se změní vložený obsah
  toggleButton = contentChild<ToggleButtonComponent>(ToggleButtonComponent);

  // Lifecycle hook volaný po inicializaci vloženého obsahu (po zpracování <ng-content>)
  ngAfterContentInit() {
    // Pokud je toggleButton dostupné, vypíše ji do konzole
    if (this.toggleButton()) {
      console.log('ToggleButtonComponent initialized:', this.toggleButton());
    }
  }

  constructor() {
    effect(() => {
      console.log(this.toggleButton())
    })
  }

  // Metoda, která nastaví stav ToggleButtonComponent na "On"
  turnOn() {
    if (this.toggleButton) {
      this.toggleButton()?.state.set('On'); // Pomocí signalu se nastaví hodnota reaktivního stavu
    }
  }

  // Metoda, která nastaví stav ToggleButtonComponent na "Off"
  turnOff() {
    if (this.toggleButton) {
      this.toggleButton()?.state.set('Off'); // Stejně jako výše, ale na hodnotu "Off"
    }
  }
}
