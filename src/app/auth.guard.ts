import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginCheckService } from './login-check.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

loginData:any
constructor(private router: Router, private login: LoginCheckService) {}



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.loginData = this.login.Getlogin()
      this.loginData = JSON.parse(this.loginData)
      var status = this.login.authData()
      if( status.status && this.loginData.role == next.data.role){
        if(next.data.role == 'admin'){
           this.login.loginCred.next(false)
           this.login.loginCheckStatus.next(true)
        }
        else if(next.data.role == 'user'){
           this.login.loginCred.next(true)
           this.login.loginCheckStatus.next(true)
        }

        return true; 
      }
   
      else{
        this.login.loginCred.next(false)
        this.login.loginCheckStatus.next(false)
        this.router.navigate(['/login'])
      }
  }
 
}
