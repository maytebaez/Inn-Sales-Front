import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(

  next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  const currentUser = JSON.parse(localStorage.getItem('user'));

  if(currentUser){
    if(next.data.role[0] == currentUser.us_role ){
      return true;
    }else{
      this.router.navigate(['/404']);
      return false;
    }
  }else{
    this.router.navigate(['/login']);
    return false;
  }
  
}
  
}
