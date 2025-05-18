import { NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal, effect, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, of, startWith, Subscription, switchMap, tap } from 'rxjs';
import { DessertService } from '../../../core/services/dessert.service';
import { Dessert, DessertFilter } from '../../../shared/interfaces/models/dessert.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-desserts',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './desserts.component.html',
  styleUrl: './desserts.component.css'
})
export class DessertsComponent implements OnInit, OnDestroy {

  originalName = signal<string>('');
  englishName = signal<string>('');
  loading = signal<boolean>(false);

  filter = computed(() => {
    return {
      originalName: this.originalName(),
      englishName: this.englishName(),
    }
  })

  // Vytvoření signálu desserts, který reaguje na změny filtru a načítá data z API
  desserts = toSignal(
    // Konverze computed signálu `filter` na RxJS observable
    toObservable(this.filter).pipe(
      // Před každým voláním API nastavíme stav načítání na true
      tap(() => this.loading.set(true)),
      // Při změně filtru spustíme volání služby
      switchMap((filter: DessertFilter) => {
        return this.dessertService.find(filter).pipe(
          // Pokud volání proběhne úspěšně, nastavíme loading na false
          tap(() => this.loading.set(false)),

          // Pokud dojde k chybě, vypíšeme ji a loading nastavíme na false
          catchError(err => {
            console.error('Catch error', err);
            this.loading.set(false);
            return of([]); // Vracíme prázdné pole, aby komponenta nezkolabovala
          })
        )
      }
      ),

      // Na začátku (např. při mountu komponenty) nastavíme počáteční hodnotu na []
      startWith([])
    ),

    // Požadovaná počáteční hodnota pro toSignal
    { initialValue: [] }
  );



  private readonly dessertService = inject(DessertService);
  private readonly subscription = new Subscription();

  constructor() {

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
