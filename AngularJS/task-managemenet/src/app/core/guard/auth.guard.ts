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
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | UrlTree {
    // const token = (localStorage.getItem('id')!);
    // debugger;
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('id') || "";
      const role = JSON.parse(localStorage.getItem('role') || "");

      if (token && role) {
        const path = route.routeConfig?.path || '';
        console.log(path);
        console.log(role);
        if (path === 'users' && role === 'admin') {
          return true;
        } else if (path === 'users' && role === 'customer') {
          return this.router.navigate(['/task']);
        } else {
          return token ? true : this.router.navigate(['/']);
        }
      } else {
        return this.router.navigate(['/']);
      }
    } else {
      // Handle the case when localStorage is not available
      return this.router.navigate(['/']);
    }
  }

  // if (token) {
  //   return token ? true : this.router.navigate(['/']);
  // }
  // return this.router.navigate(['/']);
}
