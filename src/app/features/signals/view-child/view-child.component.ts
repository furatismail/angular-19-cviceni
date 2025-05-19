import { Component, ElementRef, inject, Renderer2, viewChild, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-child',
  imports: [],
  templateUrl: './view-child.component.html',
  styleUrl: './view-child.component.css'
})
export class ViewChildComponent {
  myContainer = viewChild('myContainer', {read: ElementRef});
  firstname: string = 'ahoj';
  private renderer = inject(Renderer2)

  ngAfterViewInit(): void {
    setTimeout(() => {
      const svgElement = this.myContainer()?.nativeElement.querySelector('svg');
      this.renderer.addClass(svgElement, 'rotate-circle');
    }, 2000);

    // const myContainer = this.myContainer?.nativeElement;
    // const inputElementSelector = this.myContainer?.nativeElement?.querySelector('input')

    // setTimeout(() => {
    //   this.renderer.removeChild(myContainer, inputElementSelector);
    // }, 2000);

    // setTimeout(() => {
    //   this.renderer.appendChild(myContainer, inputElementSelector);
    // }, 3000);
  }
}
