import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signal-search',
  standalone: true,
  imports: [NgFor],
  templateUrl: './signal-search.component.html',
  styleUrls: ['./signal-search.component.css'] // Corrected the property name from styleUrl to styleUrls
})
export class SignalSearchComponent {
  search = '';
  users = [
    { id: 1, name: "Carl" },
    { id: 2, name: 'Peter' }
  ]
  filteredUsers = this.users;

  setSearchString(e: Event) {
    this.search = (e.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.users.filter((u) => u.name.toLowerCase().startsWith(this.search));
  }

  addUser() {
    this.users = [...this.users, { id: 3, name: "John" }];
  }
}
