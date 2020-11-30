import { Injectable } from '@angular/core';
import { LoginCheckService } from './login-check.service';
import { Router , ActivatedRoute } from '@angular/router';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  loginData:any
  constructor(
    private login:LoginCheckService,
    private router:Router,
  ) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loginData = this.login.Getlogin()
    if(this.loginData ){
      this.loginData = JSON.parse(this.loginData)
      console.log("in interceptor===",this.loginData)
      console.log("moment ==",moment(this.loginData.expiryDate).format('YYYY-MM-DD hh:mm:ss'),"today date> ",moment().format('YYYY-MM-DD hh:mm:ss'))
      if(this.loginData.role=='user' && moment(this.loginData.expiryDate).format('YYYY-MM-DD hh:mm:ss') <= moment().format('YYYY-MM-DD hh:mm:ss')){
        localStorage.clear()
        this.login.loginCheckStatus.next(false)
        this.login.loginCred.next(false)
        this.login.authCheck.next(false)
       
        return EMPTY
      }
      else{
        
        return next.handle(request);
      }
    }
    else{
      // console.log("outing")
      // localStorage.clear()
      // this.login.loginCheckStatus.next(false)
      // this.login.loginCred.next(false)
      // this.login.authCheck.next(false)
      return next.handle(request);
    }
      
  }
}
