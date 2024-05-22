import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const loggedInUserID = localStorage.getItem('loggedInUserID');
        if (loggedInUserID) {
            this.router.navigate(['/home']);
            return false;
        }
        return true;
    }
}
