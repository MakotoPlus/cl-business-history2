import { Injectable } from '@angular/core';
//import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { IfUserinfo } from './../interface/userinfo';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /*****
   *
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
   *
   *
  */
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.isAuthenticated().pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
/*
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.loggedIn.pipe(
      tap(user =>{
        if (!user.isLogin){
          this.router.navigate(['/']);
        }
      })
    );
  }
  */
}
