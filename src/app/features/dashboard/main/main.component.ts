import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgIf, NgFor, NgSwitchCase, NgSwitch, NgSwitchDefault],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  decision = true
  weight = 251
  tv = 'prima'

  members = [
    // {
    //   id: 'uuid1',
    //   name: 'Karel',
    //   dateOfBirth: '22.11.1990'
    // },
    // {
    //   id: 'uuid2',
    //   name: 'Petr',
    //   dateOfBirth: '22.11.1970'
    // }
  ]

  trackByMemberId(index: number, member: any): string {
    return member.id;
  }

}
