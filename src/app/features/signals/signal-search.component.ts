// Importuje direktivu NgFor pro iteraci v šabloně
import { NgFor } from '@angular/common';
// Importuje potřebné funkce a dekorátor z Angular core
import { Component, computed, effect, signal } from '@angular/core';


// Definice typu pro uživatele
interface User {
  id: number;
  name: string;
}


// Dekorátor komponenty definující metadata komponenty
@Component({
  // Selektor pro použití této komponenty v HTML
  selector: 'app-signal-search',
  // Určuje, že komponenta je samostatná (standalone) bez potřeby modulu
  standalone: true,
  // Importuje NgFor pro použití v šabloně
  imports: [NgFor],
  // Odkazuje na externí HTML šablonu komponenty
  templateUrl: './signal-search.component.html',
  // Odkazuje na externí CSS soubor se styly komponenty
  styleUrls: ['./signal-search.component.css'] // Opravený název z "styleUrl" na "styleUrls"
})
// Definice třídy komponenty
export class SignalSearchComponent {
  // Reaktivní signal pro hledaný řetězec (řetězec)
  search = signal<string>('');

  // Reaktivní signal pro pole uživatelů s typem User[]
  users = signal<User[]>([
    { id: 1, name: "Carl" },
    { id: 2, name: 'Peter' }
  ]);

  // Vypočítaná hodnota typu User[] – filtrovaný seznam podle hledání
  filteredUsers = computed<User[]>(() =>
    this.users().filter((u) =>
      u.name.toLowerCase().startsWith(this.search()))
  );

  // Metoda nastaví hledaný text podle input události
  setSearchString(e: Event): void {
    this.search.set((e.target as HTMLInputElement).value.toLowerCase());
  }

  // Metoda přidá nového uživatele do seznamu
  addUser(): void {
    this.users.update((users) => [...users, { id: 3, name: "John" }]);

    // destroy
    // this.logger.destroy()
  }

  // ⚡ Reaktivní efekt – sleduje změny v `search`
  // a ukládá hodnotu do localStorage pokaždé, když se `search` změní
  logger = effect(() => {
    localStorage.setItem('searchString', this.search());
  });

  // 🧹 Životní cyklus komponenty – metoda, která se zavolá při zničení komponenty
  // Zde se efekt `logger` explicitně zruší, aby se zabránilo únikům paměti (memory leaks)
  ngOnDestroy() {
    this.logger.destroy();
  }
}
