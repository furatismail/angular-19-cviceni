// delayed-preloading-strategy.ts

// Importy základních Angular modulů a RxJS operátorů
import { Injectable, Type } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";
import { delay, switchMap } from "rxjs/operators";

// Díky této anotaci bude služba automaticky dostupná v celé aplikaci
@Injectable({ providedIn: "root" })

// Vytváříme vlastní preloadovací strategii implementací rozhraní PreloadingStrategy
export class CustomPreloadingStrategy implements PreloadingStrategy {

  /**
   * Metoda preload se volá pro každou routu s možností načíst ji dopředu.
   * @param route - Konkrétní definice route z konfigurace (např. z app.routes.ts)
   * @param load - Funkce, která vrací Observable, který načte daný modul (lazy-loaded)
   * @returns Observable s komponentou nebo `null` (když se nenačítá)
   */
  preload(route: Route, load: () => Observable<Type<any>>): Observable<null | Type<any>> {
    
    // Z route konfigurace (data) si vezmeme vlastní klíč "preloadDelay" – udává prodlevu v ms
    const preloadDelay = route.data?.['preloadDelay'] ?? 0;

    // Výpis pro ladění: aktuální routa a její nastavené zpoždění
    // console.log(route, 'route');
    // console.log(preloadDelay, 'preloadDelay');

    // Rozhodnutí: pokud má route v `data.preload === true`, přednačti ji
    if (route.data?.['preload'] === true) {
      return of(null).pipe(
        // počkej definované množství milisekund
        delay(preloadDelay),
        // poté zavolej `load()` a vrať výsledek (modul/komponentu)
        switchMap(load)
      );
    }

    // Jinak (např. preload není true), nic nenačítej – vrať jen null
    return of(null);
  }
}
