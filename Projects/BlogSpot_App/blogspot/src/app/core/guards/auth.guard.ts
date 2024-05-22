import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let loggedInUserID: any = localStorage.getItem("loggedInUserID");
  if (!loggedInUserID) {
    alert("Please Login first!");;
    inject(Router).navigate(['']);
    return false;
  }

  return true;
};
