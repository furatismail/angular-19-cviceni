// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-is-even',
//   standalone: true,
//   imports: [],
//   templateUrl: './is-even.component.html',
//   styleUrl: './is-even.component.css'
// })
// export class IsEvenComponent {
//   isEven: boolean | undefined;

//   @Input({alias: 'counterValue', required: true}) set counter(c: number){
//     this.isEven = c % 2 === 0;
//   };
// }



// import { Component, Input, SimpleChanges } from '@angular/core';

// @Component({
//   selector: 'app-is-even',
//   standalone: true,
//   imports: [],
//   templateUrl: './is-even.component.html',
//   styleUrl: './is-even.component.css'
// })
// export class IsEvenComponent {


//   isEven: boolean | undefined;
//   @Input({ required: true, alias: 'counterValue' }) counter!: number;

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['counter']) {
//       this.isEven = changes['counter'].currentValue % 2 === 0;
//     }
//   }
// }

// import { Component, computed, input } from "@angular/core";

// @Component({
//   selector: 'app-is-even',
//   standalone: true,
//   imports: [],
//   templateUrl: './is-even.component.html',
//   styleUrl: './is-even.component.css'
// })
// export class IsEvenComponent {
//   counter = input.required<number>({
//     alias: 'counterValue'
//   });
//   isEven =  computed(() => this.counter() % 2 === 0);
// }


import { Component, input } from "@angular/core";

@Component({
  selector: 'app-is-even',
  standalone: true,
  imports: [],
  templateUrl: './is-even.component.html',
  styleUrl: './is-even.component.css'
})
export class IsEvenComponent {
  isEven = input.required({
    alias: 'counterValue',
    transform: (v: number) => this.isCounterEven
  });

  isCounterEven(x: number): boolean {
    console.log(x, 'x')
    const r = (x % 2 === 0);
    return r;
  }
}