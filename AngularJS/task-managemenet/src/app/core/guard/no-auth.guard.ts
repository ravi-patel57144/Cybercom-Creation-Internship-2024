import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | UrlTree {
    const token = (localStorage.getItem('id')!);

    if (token) {
      return token ? this.router.navigate(['/users']) : true;
    }
    else {
      return this.router.navigate(['/login']);
    }
  }
}
