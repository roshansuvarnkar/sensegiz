import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add-find',
  templateUrl: './add-find.component.html',
  styleUrls: ['./add-find.component.css']
})
export class AddFindComponent implements OnInit {
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India];
  Findform:FormGroup
  gatewayform:FormGroup
  userform:FormGroup
  type:any
  loginData:any
  language:any
  findStatus:boolean=false
  gatewayStatus:boolean=false
  userStatus:boolean=false
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddFindComponent>,
    @Inject(MAT_DIALOG_DATA)  data,
    private api: ApiService,
    private login:LoginCheckService,
    private general:GeneralMaterialsService
  ) {
      this.type=data.type
  }



  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
      this.language=this.loginData.language


    this.Findform = this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: ['', [Validators.required,Validators.min(1)]],
      empId: [''],
      mobileNum: [''],
      emailId: ['',[Validators.email]]
    });



    this.gatewayform = this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: ['', [Validators.required,Validators.minLength(12), Validators.maxLength(12)]]
    });



    this.userform = this.fb.group({
      mobileNum: ['',Validators.required],
      emailId: ['',[Validators.email,Validators.required]]
    });




  }

onNoClick(): void {
  this.dialogRef.close();
}

Findsubmit(data){
  console.log("this.findform===",this.Findform)
  console.log("find submit data==",data)
  if (this.Findform.valid) {
    try {
      data.tblName ='deviceRegistration'
      data.userId=this.loginData.userId
      data.mobileNum=data.mobileNum!=null?data.mobileNum.e164Number:''
      console.log("data of finds====",data)
      this.api.deviceRegister(data).then((res:any)=>{
        console.log("find res data====",res);
        if(res.status){
          if(this.language=='english'){var msg = 'Find Registered Successfully'}
            else if(this.language=='japanese'){var msg = 'ファインドが正常に登録されました'}
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
           if(this.language=='english'){var msg = 'Device Name or Device Id Already exists, try different device'}
            else if(this.language=='japanese'){var msg = 'デバイス名またはデバイスIDはすでに存在します。別のデバイスを試してください'}

          this.general.openSnackBar(msg,'')
        }
      })
    } catch (err) {
      console.log("erroe==",err)
    }
  }
}



Gatewaysubmit(data){
  if (this.gatewayform.valid) {
    try {
      data.tblName='gatewayRegistration'
      data.userId=this.loginData.userId
      this.api.deviceRegister(data).then((res:any)=>{
        // console.log("gateway submit==",res)
        if(res.status){
         if(this.language=='english'){ var msg = 'Gateway Registered Successfully'}
          else if(this.language=='japanese'){var msg = 'ゲートウェイが正常に登録されました'}
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
          if(this.language=='english'){ var msg = 'Gateway Name or Gateway Id Already exists, try different gateway'}
           else if(this.language=='japanese'){var msg = 'ゲートウェイ名またはゲートウェイIDはすでに存在します。別のゲートウェイを試してください'}
          this.general.openSnackBar(msg,'')
        }
      })
    } catch (err) {
    }
  }
}


Usersubmit(data){

  if (this.userform.valid) {
    try {
      data.userId=this.loginData.userId
      data.mobileNum=data.mobileNum.e164Number
      this.api.UserRegister(data).then((res:any)=>{
        // console.log("user submit==",res)
        if(res.status){
        if(this.language=='english'){  var msg = 'User Registered Successfully'}
         else if(this.language=='japanese'){ var msg = 'ユーザーが正常に登録されました'}
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
          if(this.language=='english'){ var msg = 'EmailId or Mobile Number Already exists, try different device'}
          else if(this.language=='japanese'){var msg = 'メールIDまたは携帯電話番号はすでに存在します。別のデバイスを試してください'}
          this.general.openSnackBar(msg,'')
        }
      })
    } catch (err) {
    }
  }
}



}
