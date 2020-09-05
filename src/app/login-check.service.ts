import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Router , ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {
  public loginCred = new Subject<any>()
  public loginCheckStatus = new Subject<any>()
  public pageCheck = new Subject<any>()
  public authCheck = new Subject<any>()


  constructor(private router:Router) {
      // this.loginStatus()
      // this.authData()
   }


  loginStatus(){
    var status = localStorage.getItem('sensegizlogin')
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
    var status = localStorage.getItem('sensegizlogin')
    if(status  && status!='undefined'){
      return JSON.parse(status)
    }
    else{
      return false
    }
  }

  authData(){
    var status = JSON.parse(localStorage.getItem('sensegizlogin'))
    // var auth=JSON.parse(status)==null?'N':JSON.parse(status)
    // console.log("inside auth==",JSON.parse(status))
    // if( auth.twoStepAuth=="N" || auth.twoStepAuth=="Y" ){
    //   this.authCheck.next(true)
    //   return true
    // }
    // else{
    //   this.authCheck.next(false)
    //   return false
    // }
    console.log("status of authdata==",status)

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
    var status = localStorage.getItem('sensegizlogin')
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
    var status = localStorage.getItem('sensegizlogin')
    if(status  && status!='undefined'){
      return status
    }
    else{
      return false
    }
  }


  login(data){
    localStorage.setItem('sensegizlogin',data)
    return true
  }

  logout(){
    localStorage.clear()
    return true
  }

}
