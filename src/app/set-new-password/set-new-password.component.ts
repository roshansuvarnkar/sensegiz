import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  passwordType1: string = 'password';
  passwordIcon1: string = 'visibility_off';
  constructor(private fb:FormBuilder,private login:LoginCheckService,private api:ApiService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res =>{
      this.userData=JSON.parse(res.user)
      console.log("user info==",this.userData)
    })

    this.setPasswordForm=this.fb.group({
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/) ]],
      confirmPassword:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/) ]],
    },
    {
      validators:this.passwordMatchValidator
    })
  }

  passwordMatchValidator(frm: FormGroup) {
    // this.expiredPwd=false
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
  }

  checkPwd(){
    this.expiredPwd= false
  }
  submit(data){
    console.log("data=",data)
    data.username=this.userData.username
    data.system="portal"
    data.role='user'
    if(this.setPasswordForm.valid){

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

  }


  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
}
hideShowPassword1() {
  this.passwordType1 = this.passwordType1 === 'text' ? 'password' : 'text';
  this.passwordIcon1 = this.passwordIcon1 === 'visibility_off' ? 'visibility' : 'visibility_off';
}
}
