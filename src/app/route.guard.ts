import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
      let canRoute = this.authService.loggedIn();
      if(!canRoute){
        this.router.navigateByUrl('login')
      }
      let redirect = this.authService.redirectToPage();
      if(redirect.re){
        this.router.navigate([redirect.page]);
        return false
      }
      else{
        return canRoute;
      }
  }

}
