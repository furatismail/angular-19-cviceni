import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Photo } from '../../shared/interfaces/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private httpClient = inject(HttpClient);

  getAll(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>('https://jsonplaceholder.typicode.com/photos').pipe(
      map(photos => photos.slice(0, 4))  // Limit the results to 10
    );;
  }

  get(photoId: string): Observable<Photo> {
    return this.httpClient.get<Photo>(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
  }

}
