import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

// ✅ Funkční forma interceptoru pro Angular 15+ (HttpInterceptorFn)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 🔐 Získáme AuthService pomocí funkce inject()
  const authService = inject(AuthService);

  // 📦 Získáme token (např. JWT token uložený po přihlášení uživatele)
  const token = authService.getToken(); // např. 'eyJhbGciOi...'

  // ✅ Klonujeme požadavek a přidáme do něj Authorization hlavičku
  const authReq = req.clone({
    setHeaders: {
      // 📌 'Bearer' je typ autentizačního schématu (viz vysvětlení níže)
      Authorization: `Bearer ${token}`
    }
  });

  // 📤 Odeslání požadavku dál + zachycení a logování chyb
  return next(authReq).pipe(
    catchError((err) => {
      console.error('❌ HTTP Error:', err);
      return throwError(() => err);
    })
  );
};
