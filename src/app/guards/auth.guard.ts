import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthcontrolService } from '../services/authcontrol.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  constructor(private authService: AuthcontrolService,
    private router: Router) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>  {
    
    return this.authService.isLoggedIn$.pipe(map((loggedIn: any)=> loggedIn ? true :
    this.router.parseUrl('/login')));
    
  }
  
}
