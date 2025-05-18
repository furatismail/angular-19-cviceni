import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal, effect, untracked, resource } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, firstValueFrom, of, startWith, Subscription, switchMap, tap } from 'rxjs';
import { DessertService } from '../../../core/services/dessert.service';
import { Dessert, DessertFilter } from '../../../shared/interfaces/models/dessert.model';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-desserts',
  imports: [FormsModule, NgIf, NgFor, JsonPipe],
  templateUrl: './desserts.component.html',
  styleUrl: './desserts.component.css'
})
export class DessertsComponent implements OnInit, OnDestroy {

  originalName = signal<string>('');
  englishName = signal<string>('');
  loading = signal<boolean>(false);

  filter = computed<DessertFilter>(() => {
    return {
      originalName: this.originalName(),
      englishName: this.englishName(),
    }
  })

  // Toto je špatně pro rxResource – použij jen pro resource()
  dessertsRx = rxResource<Dessert[], DessertFilter>({
    request: () => this.filter(),
    loader: ({ request: filter }) => this.dessertService.find(filter),
  });






  private readonly dessertService = inject(DessertService);
  private readonly subscription = new Subscription();

  constructor() {
    effect(() => {
        console.log(this.dessertsRx)
    })
  }

  ngOnInit(): void {
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
