// Importuje Component dekorátor, signal API a effect API z Angular core
import { Component, DoCheck, effect, signal } from '@angular/core';

// Definice komponenty pomocí dekorátoru @Component
@Component({
  // Selektor pro použití komponenty v šabloně
  selector: 'app-glitch-free',
  // Určuje, že komponenta je samostatná (standalone) – nevyžaduje modul
  standalone: true,
  // Seznam importovaných komponent nebo direktiv (zde prázdné)
  imports: [],
  // Cesta k šabloně komponenty
  templateUrl: './glitch-free.component.html',
  // Cesta ke stylům komponenty – zde je chyba: `styleUrl` má být `styleUrls`
  styleUrl: './glitch-free.component.css' // POZOR: má být styleUrls (pole)
})
// Definice třídy komponenty
export class GlitchFreeComponent implements DoCheck {
  // Jednoduchá proměnná pro název aplikace
  title = 'signals-17';

  // Vytvoření signálu s výchozí hodnotou 5
  value = signal(5);

  // Konstruktor komponenty – inicializace efektu
  constructor() {
    // Definice reaktivního efektu – sleduje změny `value` signálu
    // Efekt se spustí POUZE pokud se výsledek `this.value()` změní
    // "Glitch-free" znamená, že efekt běží jen jednou na konci změnové dávky (batch) – tzn. při více `set()` v rychlém sledu se nespustí víckrát
    effect(() => console.log(this.value(), 'effect'))
  }

  // Angular hook volaný při každé detekci změn (neovlivňuje signály)
  ngDoCheck() {
    // Loguje aktuální hodnotu signálu při každé detekci změn (manuální sledování)
    console.log(this.value(), 'ngDoCheck GlitchFreeComponent');
  }

  // Metoda, která provede několik změn signálu v rychlém sledu
  noop() {
    // Postupně mění hodnotu signálu
    this.value.set(11);
    this.value.set(9);
    this.value.set(8);
    this.value.set(7);
    this.value.set(11);
    // Díky "glitch-free" mechanice Angularu se `effect()` nespustí víckrát – ale pouze **jednou** a až po dokončení všech změn v této dávce
    // Toto minimalizuje zbytečné výpočty a předchází tzv. reaktivnímu "glitchi" – nechtěným přechodným hodnotám
  }
}
