import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Photo } from '../../../shared/interfaces/photo.interface';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  photo!: Photo;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.photo = data?.['photos'];
    })
  }
}
