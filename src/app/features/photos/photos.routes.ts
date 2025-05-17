import { Routes } from '@angular/router';
import { photoByIdResolver, photosResolver } from '../../core/resolvers/photo.resolver';

export const PhotosRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./list/list.component').then(m => m.ListComponent),
        resolve: {
            photos: photosResolver
        }
    },
    {
        path: ':photoId/detail',
        loadComponent: () => import('./detail/detail.component').then(m => m.DetailComponent),
        resolve: {
            photos: photoByIdResolver
        }
    }
]
