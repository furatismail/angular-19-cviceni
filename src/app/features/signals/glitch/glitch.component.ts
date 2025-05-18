import { Component, DoCheck } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-glitch',
    imports: [],
    templateUrl: './glitch.component.html',
    styleUrls: ['./glitch.component.css']
})
export class GlitchComponent implements DoCheck {

    /**
     * BehaviorSubject je druh "subjectu" v RxJS, který:
     * - Udržuje poslední emitovanou hodnotu (tzv. current value)
     * - Ihned předá aktuální hodnotu každému novému subscriberovi
     * - Používá se tam, kde potřebujeme hodnotu dostupnou okamžitě (např. pro binding v šabloně)
     * - Funguje podobně jako signal, ale **není glitch-free**
     */
    value$ = new BehaviorSubject<number>(5); // Inicializuje se s hodnotou 5
    value = 5;
    // Konstruktor komponenty
    constructor() {
        /**
         * Subscribe poslouchá každou změnu hodnoty
         * Tento callback se spustí **při každém volání `.next()`**
         * Tzn. pokud během krátké doby několikrát zavoláme `next`, každá hodnota projde tímto efektem
         */
        this.value$.subscribe(val => {
            console.log(val, 'rxjs subscribe'); // Log každé změny
            this.value = val;
        });
    }

    // Angular hook volaný při každé detekci změn (neovlivňuje signály)
    ngDoCheck() {
        // Loguje aktuální hodnotu signálu při každé detekci změn (manuální sledování)
        console.log(this.value, 'ngDoCheck GlitchComponent');
    }


    /**
     * Tato metoda provede několik změn hodnoty v rychlém sledu
     * Každé volání `next()` okamžitě spustí subscriber
     */
    noop(): void {
        this.value$.next(11);
        this.value$.next(9);
        this.value$.next(8);
        this.value$.next(7);
        this.value$.next(11);

        /**
         * Výstup bude:
         * 11 rxjs subscribeF
         * 9 rxjs subscribe
         * 8 rxjs subscribe
         * 7 rxjs subscribe
         * 11 rxjs subscribe
         * 
         * Toto je příklad **"glitchu"** – listener (subscribe) reaguje na každou hodnotu,
         * i když některé hodnoty jsou jen přechodné a nepotřebujeme je vidět.
         * Angular signály naproti tomu zpracují všechny změny jako jednu dávku a efekt spustí **jen jednou**.
         */
    }
}
