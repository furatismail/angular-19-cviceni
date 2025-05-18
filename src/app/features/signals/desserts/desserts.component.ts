import { NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal, effect, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DessertService } from '../../../core/services/dessert.service';
import { Dessert } from '../../../shared/interfaces/models/dessert.model';
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

  desserts = signal<Dessert[]>([]);
  filter = computed(() => {
    return {
      originalName: this.originalName(),
      englishName: this.englishName(),
    }
  })


  private readonly dessertService = inject(DessertService);
  private readonly subscription = new Subscription();

  constructor() {
    effect(() => {
      untracked(() => {
        this.search()
      })
    },)
  }

  ngOnInit(): void {
  }

  search(): void {

    this.loading.set(true);

    this.subscription.add(this.dessertService.find(this.filter()).subscribe({
      next: (desserts) => {
        this.desserts.set(desserts);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Search error', error);
        this.loading.set(false);
      },
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
