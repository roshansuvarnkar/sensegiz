import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs'
import { Router , ActivatedRoute } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import * as moment from 'moment';
import {GeneralMaterialsService} from '../app/general-materials.service'
@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {
  public loginCred = new Subject<any>()
  public loginCheckStatus = new Subject<any>()
  public pageCheck = new Subject<any>()
  public authCheck = new Subject<any>()

  check:boolean=true
  constructor(private router:Router,private bnIdle: BnNgIdleService,private general:GeneralMaterialsService) {
    this.bnIdle.startWatching(600).subscribe((isTimedOut: boolean) => {
     // console.log('session expired',isTimedOut);
      if (isTimedOut) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
      // this.loginStatus()
      // this.authData()
    //  this.logout()

   }


  loginStatus(){
   var status =this.general.decrypt(localStorage.getItem('sensegizlogin'))
  // var status = localStorage.getItem('sensegizlogin')
   var passwordExpiry=JSON.parse(status)
    if(status  && status!='undefined' || passwordExpiry.passwordExpiry==false){
      this.loginCheckStatus.next(true)
      return true
    }
    else{
      this.loginCheckStatus.next(false)
      return false
    }
  }


  loginData(){
    var status = this.general.decrypt(localStorage.getItem('sensegizlogin'))
  //console.log(status)
   if(status  && status!='undefined'){
      return status
    }
    else{
      return false
    }
  }

  authData(){
    var status = this.general.decrypt(localStorage.getItem('sensegizlogin'))
    //var status = JSON.parse(localStorage.getItem('sensegizlogin'))

  //  console.log("status of authdata==",status)

    if(status && status != 'undefined'){
      if(status.role=='user' ){
        if(status.twoStepAuth=='Y' && status.passwordExpiry==false){
          var auth = localStorage.getItem('sensegizTwoStep')
          if(auth=='true'){
            var a = {status:true,role:'user'}
            return a
          }
          else{
            var a = {status:false,role:''}
            return a
          }
        }
        else if(status.twoStepAuth=='Y' && status.passwordExpiry==true){
          var a = {status:false,role:''}
          return a
        }
        else{
          if(status.twoStepAuth=="N" && status.passwordExpiry==true){
            var a = {status:false,role:''}
            return a
          }
          else{
            var a = {status:true,role:'user'}
            return a
          }

        }
      }
      else if(status.role=='admin'){
        var a = {status:true,role:'admin'}
        return a
      }
      else{
        var a = {status:false,role:''}
        return a
      }

    }
    else{
      var a = {status:false,role:''}
      return a
    }

  }
  loginStatusMenu(){
    var status = this.general.decrypt(localStorage.getItem('sensegizlogin'))

   var route = window.location.pathname
    // console.log("route==",route)
    if(route !='/login' && route!='/admin-login' ){
      this.loginCred.next(true)
    }
    else{
      this.loginCred.next(false)
    }
  }



  Getlogin(){
    var status = JSON.stringify(this.general.decrypt(localStorage.getItem('sensegizlogin')))
   //var status = localStorage.getItem('sensegizlogin')
   if(status  && status!='undefined'){
      return status
    }
    else{
      return false
    }
  }


  login(data){
     let storage = this.general.encrypt(data);
    localStorage.setItem('sensegizlogin',storage);
   // localStorage.setItem('sensegizlogin',data)
    return true
  }


  logout(){
    localStorage.clear()
    this.loginCheckStatus.next(false)
    this.loginCred.next(false)
    this.authCheck.next(false)
    this.router.navigate(['/login'])
  }
}
