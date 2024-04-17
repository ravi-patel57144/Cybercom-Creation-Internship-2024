import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | UrlTree {
    const token = JSON.parse(localStorage.getItem('id')!);

    if (token) {
      return token ? true : this.router.createUrlTree(['/']);
    }
    return this.router.createUrlTree(['/']);
  }
}
