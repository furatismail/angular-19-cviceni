// src/app/photo-resolver.ts

// 🧩 Funkce `inject()` slouží k získání závislosti mimo konstruktor
import { inject } from '@angular/core';
// 📍 Typy potřebné pro práci s router resolvery
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
// 🔁 RxJS – pro práci s asynchronními daty
import { Observable, of } from 'rxjs';
// 📷 Typové rozhraní pro jednotlivou fotku nebo pole fotek
// 🖼 Služba pro získávání fotek (z API nebo datového zdroje)
import { Photo } from '../../shared/interfaces/photo.interface';
import { PhotoService } from '../services/photo.service';

// 🛠 Resolver pro načtení všech fotek při vstupu na danou route
export const photosResolver: ResolveFn<Observable<Photo[]>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    // 🧪 Získání instance PhotoService pomocí funkce `inject`
    const photoService = inject(PhotoService);

    // 🔄 Vrátí Observable, který emitne pole fotek (např. z HTTP požadavku)
    return photoService.getAll();
};

// 🛠 Resolver pro načtení jedné konkrétní fotky podle ID z URL
export const photoByIdResolver: ResolveFn<Observable<Photo>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const photoService = inject(PhotoService);

    // 🔑 Získání parametru `photoId` z URL
    const photoId = route.paramMap.get('photoId');

    if (photoId) {
        // 🖼 Vrátí Observable s konkrétní fotkou
        return photoService.get(photoId);
    }

    // ⚠️ Když `photoId` není přítomno v URL, vrátí `null` jako Observable
    // (alternativně by zde mohla být redirect logika nebo error handling)
    return of(null as any);
};
