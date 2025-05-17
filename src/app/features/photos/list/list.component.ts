import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JsonPipe, NgFor } from '@angular/common';
import { Photo } from '../../../shared/interfaces/photo.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, JsonPipe, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  photos!: Photo[];


  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.photos = data?.['photos'];
    })
  }
}
