import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signal-search',
  standalone: true,
  imports: [NgFor],
  templateUrl: './signal-search.component.html',
  styleUrls: ['./signal-search.component.css'] // Corrected the property name from styleUrl to styleUrls
})
export class SignalSearchComponent {
  search = signal(localStorage.getItem('searchString') || '');
  users = signal([
    { id: 1, name: "Carl" },
    { id: 2, name: 'Peter' }
  ])
  filteredUsers = computed(() => this.users().filter((u) => u.name.toLowerCase().startsWith(this.search())))

  logger = effect(() => {
    localStorage.setItem('searchString', this.search())
  })


  setSearchString(e: Event) {
    this.search.set((e.target as HTMLInputElement).value.toLowerCase());
  }

  addUser() {
    this.users.update((users) => [...users, { id: 3, name: "John" }]);

    // destroy
    // this.logger.destroy()
  }

}
