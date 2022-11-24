import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router,private toast:NgToastService) { }
  canActivate():boolean {
    if(this.auth.isLoggedIn()){
      return true;
    }else{
    this.toast.error({detail:"ERROR",summary:"please login first",duration:5000});
    this.route.navigate(['login'])
    return false;
    }

  //   console.log("canActivate called");
  //   let isLoggedIn=this.auth.isAuthenticated();
  //   if(isLoggedIn){
  //     return true;
  //   }
  //     else{
  //      this.route.navigate(['/login']);
  //      return true;
  //     }
  }

}
