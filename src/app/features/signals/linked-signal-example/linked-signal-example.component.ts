import { Component, computed, effect, linkedSignal, signal } from '@angular/core';
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
  // Reaktivní signal obsahující dostupné způsoby dopravy.
  shippingOptions = signal<ShippingMethod[]>([
    { id: 0, name: 'Ground' },
    { id: 1, name: 'Air' },
    { id: 2, name: 'Sea' },
  ]);
  selectedOptionTmp = signal<number | null>(null)

  // Odvozená hodnota – vždy ukazuje na první možnost z `shippingOptions`.
  // Nepamatuje si předchozí výběr, neaktualizuje se podle změn jako `linkedSignal`.
  selectedOption = computed(() => {
    const options = this.shippingOptions();
    const selected = this.selectedOptionTmp();
    console.log(selected)
    if (selected) {
      const index = options.findIndex((item) => item.id === selected)
      return options[index]
    }
    return options[0]; // Vždy vrací první možnost – žádné uchování předchozí volby.
  });

  // Pokus o změnu výběru jako dříve zde nebude fungovat – `computed` nelze ručně nastavit.
  changeShipping(index: number) {
    // ⚠️ Nelze použít this.selectedOption.set(...) – computed je pouze pro čtení.
    this.selectedOptionTmp.set(index)
    console.warn('Nelze změnit selectedOption – je to pouze computed.');
  }

  // Změní celé pole možností dopravy, ale `selectedOption` se pouze přepočítá na nový první prvek.
  changeShippingOptions() {
    this.shippingOptions.set([
      { id: 0, name: 'Email' },
      { id: 2, name: 'Sea' },
      { id: 3, name: 'Postal Service' },
    ]);
  }

}
