import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginComponent } from '../login/login.component';

import { LoginCheckService } from '../login-check.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {
  setPasswordForm:FormGroup
  disable:boolean=false
  expiredPwd:boolean=false
  userData:any
  passwordType: string = 'password';
  passwordIcon: string = 'visibility_off';
  constructor(private fb:FormBuilder,private login:LoginCheckService,private api:ApiService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res =>{
      this.userData=JSON.parse(res.user)
      console.log("user info==",this.userData)
    })

    this.setPasswordForm=this.fb.group({
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/) ]],
      confirmPassword:['',Validators.required]

    })


  }

  submit(data){
    console.log("data=",data)
    data.username=this.userData.username
    data.system="portal"
    data.role='user'
    this.api.updatePassword(data).then((res:any)=>{
      console.log("set pwd==",res)
       var passwordExpiry=res.hasOwnProperty('alreadyExisted')
           console.log(passwordExpiry)
           this.expiredPwd=passwordExpiry==true?true:false
      if( res.status){
         
        // if(this.login.login(JSON.stringify(res.success))){
          this.router.navigate(['/login'])

        // }
       }
    })
  }

  checkPwd(event,password){
    this.expiredPwd=false
    console.log("data=",event.target.value,password)

    var confirm=event.target.value
    this.disable=password!=confirm.toString()?true:false

  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
}
}
