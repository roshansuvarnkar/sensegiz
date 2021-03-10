import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCheckService } from '../login-check.service';
import { ApiService } from '../api.service';
import { GeneralMaterialsService } from '../general-materials.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

   adminLoginform: FormGroup;
   public loginInvalid: boolean;
   passwordType: string = 'password';
   passwordIcon: string = 'visibility_off';
   sendDataForm:FormGroup

   constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private login: LoginCheckService,
      private api: ApiService,
      private general: GeneralMaterialsService
    ) {
    }


  ngOnInit(): void {
    this.login.loginStatusMenu()
    this.adminLoginform = this.fb.group({
      userName: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

 onSubmit(data) {

    this.loginInvalid = false;
    if (this.adminLoginform.valid){
      try {
        this.api.adminLogin(data).then((res:any)=>{
         localStorage.setItem("token",JSON.stringify(res.token))
        //	 console.log("admin res===",res)
          if(res.status){
          	res.success.role='admin'
           // if(this.login.login(JSON.stringify(res.success))){
            if(this.login.login(res.success)){
              this.login.authCheck.next(true)
              this.router.navigate(['/admin-dashboard'])
            }
          }else{
            localStorage.clear()
          }
        })
      } catch (err) {
        this.loginInvalid = true;
      }
    }
  }



  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }


}
