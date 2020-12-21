import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginComponent } from '../login/login.component';

import { LoginCheckService } from '../login-check.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-two-step-auth',
  templateUrl: './two-step-auth.component.html',
  styleUrls: ['./two-step-auth.component.css']
})
export class TwoStepAuthComponent implements OnInit {
  loginData:any
  twoStepAuthForm:FormGroup
  otpField:boolean=false
  invalidUser:boolean=false
  invalidOTP:boolean=false
  language:any
  sendOTP:boolean=true
  forgetPwd:any
  newPassword:boolean=false
  otpExpired:boolean=false
  type:boolean=false

  constructor(private fb:FormBuilder,private login:LoginCheckService,private api:ApiService, private router: Router,private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    // this.language=this.loginData.language
    // console.log("language==",this.language)
    this.route.queryParams.subscribe(params => {
      this.forgetPwd = JSON.parse(params.type) ;
      console.log("records=",this.forgetPwd )
     
  })


    this.twoStepAuthForm=this.fb.group({
      username:['',Validators.required],
      otp1:['',Validators.required],
      otp2:['',Validators.required],
      otp3:['',Validators.required],
      otp4:['',Validators.required],
    })
  }


  
getCodeBoxElement(index) {
  return document.getElementById('codeBox' + index);
}


onKeyUpEvent(index, event) {
  const eventCode = event.which || event.keyCode;
 
   if (index !== 4) {
    this.getCodeBoxElement(index+ 1).focus();
   } else {
    this.getCodeBoxElement(index).blur();
   }
  
  if (eventCode === 8 && index !== 1) {
   this.getCodeBoxElement(index - 1).focus();
  }
}


//  onFocusEvent(index) {
//   for (var item = 1; item < index; item++) {
//    const currentElement = this.getCodeBoxElement(item);
//    if (!currentElement.value) {
//       currentElement.focus();
//       break;
//    }
//   }
// }

sendOtp(value){
  this.sendOTP=false
  
  console.log("value==",value)
    console.log("hey")
     var data={
      userId:this.loginData.userId,
      username:value
    }
    this.api.sendOtp(data).then((res:any)=>{
      console.log("send opt==",res)
  
    if(res.status){
      this.invalidUser=false

      this.otpField=res.status==true?true:false
    }
    else{
      this.invalidUser=true
    }

    }) 


}

submit(data){

  data.userId=this.loginData.userId
  data.OTP=data.otp1+data.otp2+data.otp3+data.otp4
  console.log("confirm",data,this.forgetPwd)
  this.api.confirmOtp(data).then((res:any)=>{
    console.log("submit==",res)
    var otpExpiry=res.hasOwnProperty('failure')
      this.otpExpired=otpExpiry==true?true:false
   
     if(res.status){
      this.invalidOTP=false
      localStorage.setItem('sensegizTwoStep','true')
      this.login.authCheck.next(true)
      if(this.forgetPwd == "twoStepAuth"){
        
        this.router.navigate(['/home'])
      } 
      else if(this.forgetPwd== "forgetPassword"){
        this.router.navigate(['/set-new-password'],{queryParams:{user:JSON.stringify(data)}})
      } 
     }  
     else{
      this.invalidOTP=true

     }  
    
  })
  
}
  validate(event){
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
    var email=expression.test(String(event.target.value).toLowerCase())
    var phoneNum = /^\+?[0-9]{10,14}$/; 
    if(event.target.value==event.target.value.match(phoneNum)){
      this.type=true
    
    }
    else{
      this.type=false
    }
  }

}
