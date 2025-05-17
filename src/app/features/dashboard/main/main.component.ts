import { Component } from '@angular/core';
import { TIME_START_DATE, TimeComponent } from '../../../shared/components/time/time.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TimeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  providers: [{ provide: TIME_START_DATE, useValue: '01.01.2025' }
  ]
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
