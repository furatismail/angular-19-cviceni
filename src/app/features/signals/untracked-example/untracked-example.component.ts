import { Component, effect, signal } from '@angular/core';
import { untracked } from '@angular/core';

@Component({
  selector: 'app-untracked-example',
  imports: [],
  templateUrl: './untracked-example.component.html',
  styleUrl: './untracked-example.component.css'
})
export class UntrackedExampleComponent {

  a = signal(0);
  b = signal(1);

  constructor() {
    effect(() => {
      console.log(this.a(), untracked(() => this.b()));
    })

    // effect(() => {
    //   console.log(this.a(), this.b());
    // })

    setTimeout(() => {
      // this.a.set(2)
      this.b.set(5)
    }, 1000);
  }


}
