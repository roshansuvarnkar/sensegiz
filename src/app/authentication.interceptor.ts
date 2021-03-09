/* import { Injectable } from '@angular/core';
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
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      request=request.clone({
      setHeaders: { Authorization: `${token}`}
  })
  if(this.loginData ){
    this.loginData = JSON.parse(this.loginData)
    console.log("in interceptor===",this.loginData)
    console.log("moment ==",moment(this.loginData.expiryDate).format('YYYY-MM-DD hh:mm:ss'),"today date> ",moment().format('YYYY-MM-DD hh:mm:ss'))
    if(this.loginData.role=='user' && moment(this.loginData.expiryDate).format('YYYY-MM-DD hh:mm:ss') <= moment().format('YYYY-MM-DD hh:mm:ss')){
      localStorage.clear()
      this.login.loginCheckStatus.next(false)
      this.login.loginCred.next(false)
      this.login.authCheck.next(false)
      console.log(this.loginData)
      return EMPTY
    }
    else{
      return next.handle(request);
    }
  }
  else{
    return next.handle(request);
  }
}
return next.handle(request);


  }
} */

import { Injectable } from '@angular/core';
import { LoginCheckService } from './login-check.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import * as moment from 'moment';
import { GeneralMaterialsService } from './general-materials.service';
import { catchError, tap, take } from 'rxjs/operators';
import { throwError, BehaviorSubject, of, pipe } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  loginData:any
  constructor(
    private login:LoginCheckService,
    private router:Router,
    private general:GeneralMaterialsService
  ) {

  }


  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loginData = this.login.Getlogin();
    request = this.addAuthenticationToken(request);

    return next.handle(request).pipe(
      (take(1),
      catchError((error: any) => {
        if (error.status === 403 || error.status === 401) {
          this.login.logout();
        } else {
        }
        return throwError(error);
      })),
      tap((res: any) => {
      //  console.log(res)
        if (res instanceof HttpResponse) {
          if (res.body.hasOwnProperty('result')) {
           // console.log(res.body)
            res.body.data = this.general.decrypt(res.body.result);
          }
          return res;
        } else {
          return res;
        }
      })
    ) as any;
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.general.getToken();

    if (token && token != null) {
      request = request.clone({
        setHeaders: { Authorization: `${token}` },
      });
    }
    if (request instanceof HttpRequest) {
      let body = request.body;
      if (body) {
        request.body.data = this.general.encrypt(body.data);
      }
    }
    return request;
  }
}
