import { Component, effect, linkedSignal, signal } from '@angular/core';
interface ShippingMethod {
  id: number;
  name: string;
}
@Component({
  selector: 'app-linked-signal-example',
  imports: [],
  templateUrl: './linked-signal-example.component.html',
  styleUrl: './linked-signal-example.component.css'
})
export class LinkedSignalExampleComponent {
  // Vytváří signal (reaktivní proměnnou) obsahující výchozí pole s možnostmi dopravy.
  shippingOptions = signal<ShippingMethod[]>([
    { id: 0, name: 'Ground' }, // Možnost 1: Pozemní doprava
    { id: 1, name: 'Air' },    // Možnost 2: Letecká doprava
    { id: 2, name: 'Sea' },    // Možnost 3: Námořní doprava
  ]);

  // Vytváří signal, který je propojený s `shippingOptions` a automaticky se aktualizuje, pokud se možnosti změní.
  selectedOption = linkedSignal<ShippingMethod[], ShippingMethod>({
    // `source` definuje, na který signál se propojený signal naváže (v tomto případě shippingOptions).
    source: this.shippingOptions,

    // `computation` říká, jak se má z nových hodnot `shippingOptions` vypočítat `selectedOption`.
    computation: (newOptions, previous) => {
      // Pokud nově dostupné možnosti stále obsahují dříve vybranou možnost (podle ID), zachová se výběr.
      // Pokud ne, automaticky se zvolí první možnost z nového seznamu.
      return (
        newOptions.find((opt) => opt.id === previous?.value.id) ?? newOptions[0]
      );
    },
  });

  // Funkce, která změní aktuálně vybranou možnost dopravy podle indexu v poli `shippingOptions`.
  changeShipping(index: number) {
    // Zavoláním set() se nastaví nový vybraný způsob dopravy podle indexu.
    this.selectedOption.set(this.shippingOptions()[index]);
  }

  // Funkce, která přepíše celý seznam dostupných možností dopravy.
  changeShippingOptions() {
    // Signál `shippingOptions` se přepíše novým polem s jinými hodnotami.
    this.shippingOptions.set([
      { id: 0, name: 'Email' },           // Nová možnost: Elektronické doručení
      { id: 1, name: 'Sea' },             // Ponechaná stará možnost: Námořní doprava
      { id: 2, name: 'Postal Service' },  // Nová možnost: Poštovní služba
    ]);
  }

}
