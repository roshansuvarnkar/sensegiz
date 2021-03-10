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
  coinForm:FormGroup
  type:any
  loginData:any
  language:any
  findStatus:boolean=false
  gatewayStatus:boolean=false
  userStatus:boolean=false
  gateway:any=[]
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
      deviceId: ['', [Validators.required,Validators.minLength(12), Validators.maxLength(12)]],
      type:['',Validators.required]
    });



    this.userform = this.fb.group({
      mobileNum: ['',Validators.required],
      emailId: ['',[Validators.email,Validators.required]]
    });
    this.coinForm =this.fb.group({
      coinName: ['', Validators.required],
      coinId: ['', [Validators.required,Validators.min(1)]],
      gatewayId:['', Validators.required],
    });

    this.refreshGateway()

  }

onNoClick(): void {
  this.dialogRef.close();
}

Findsubmit(data){
 // console.log("this.findform===",this.Findform)
  //console.log("find submit data==",data)
  if (this.Findform.valid) {
    try {
      data.tblName ='deviceRegistration'
      if(this.loginData.hasOwnProperty('id') && this.loginData.id!=0 && this.loginData.type==4){
        data.subUserId=this.loginData.id
      }
      data.userId=this.loginData.userId
      data.mobileNum=data.mobileNum!=null?data.mobileNum.e164Number:''
     // console.log("data of finds====",data)
      this.api.deviceRegister(data).then((res:any)=>{
       // console.log("find res data====",res);
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
     // console.log("erroe==",err)
    }
  }
}



Gatewaysubmit(data){
  if (this.gatewayform.valid) {
    try {
      data.tblName='gatewayRegistration';
      if(this.loginData.hasOwnProperty('id') && this.loginData.id!=0 && this.loginData.type==4){
        data.subUserId=this.loginData.id
      }
      data.userId=this.loginData.userId
      data.gatewayType=data.type == '0'?'ethernet':'wifi'

      //console.log("gateway submit==",data)

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
      if(this.loginData.hasOwnProperty('id') && this.loginData.id!=0 && this.loginData.type==4){
        data.subUserId=this.loginData.id
      }
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


coinSubmit(data){
  //console.log("data======",data)
  if (this.coinForm.valid) {
    try {
     // console.log("this.loginData",this.loginData);

      if(this.loginData.hasOwnProperty('id') && this.loginData.id!=0 && this.loginData.type==4){
        data.subUserId=this.loginData.id
      }
      data.userId=this.loginData.userId
     // console.log(" coin insert data======",data)
       this.api.coinRegister(data).then((res:any)=>{
        //console.log("coin submit==",res)
        if(res.status){
          var msg = 'Coin Registered Successfully'
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
          var msg = 'Coin Name or Coin Id Already exists, try different coin'
          this.general.openSnackBar(msg,'')
        }
      })
    } catch (err) {
    }
  }

}
refreshGateway(){
  var data={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      tblName:'gatewayRegistration'
    }

  this.api.getData(data).then((res:any)=>{
    //console.log("gateway data ======",res);
    if(res.status){
      this.gateway=res.success

    }
  })
}

}
