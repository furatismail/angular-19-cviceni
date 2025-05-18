import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { Dessert, DessertFilter } from '../../shared/interfaces/models/dessert.model';

@Injectable({ providedIn: 'root' })
export class DessertService {
  find(filter: DessertFilter): Observable<Dessert[]> {
    // Simulovaná chyba, pokud originalName obsahuje "error"
    if (filter.originalName.toLowerCase().includes('error')) {
      return throwError(() => new Error('Simulated server error')).pipe(delay(1000));
    }

    const allDesserts: Dessert[] = [
      { id: 1, originalName: 'Tiramisu', englishName: 'Tiramisu' },
      { id: 2, originalName: 'Větrník', englishName: 'Pinwheel cake' },
      { id: 3, originalName: 'Štrůdl', englishName: 'Apple strudel' },
    ];

    const filtered = allDesserts.filter((d) => {
      const originalMatch = !filter.originalName ||
        d.originalName.toLowerCase().includes(filter.originalName.toLowerCase());

      const englishMatch = !filter.englishName ||
        d.englishName.toLowerCase().includes(filter.englishName.toLowerCase());

      return originalMatch && englishMatch;
    });

    return of(filtered).pipe(delay(1000));
  }
}
