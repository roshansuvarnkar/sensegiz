import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {
  SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.India];
  type:any
  deviceData:any
  language:any
  loginData:any
  Findform:FormGroup
  gatewayform:FormGroup
  userform:FormGroup
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA)  data,
    private api: ApiService,
    private login:LoginCheckService,
    private general:GeneralMaterialsService
  ) {
     console.log("data===",data)
    this.type=data.type
    this.deviceData=data.data
  }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.language=this.loginData.language
    console.log("language==",this.language)
    this.Findform = this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: [{value: '', disabled: true}, Validators.required],
      empId: [''],
      mobileNum:[''],
      emailId: ['',[Validators.email]]
    });



    this.gatewayform = this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: [{value: '', disabled: true}, Validators.required],
      // type:[{value: '', disabled: true}, Validators.required],

    });



    this.userform = this.fb.group({
      mobileNum: ['', [Validators.required]],
      emailId: ['',[Validators.email]]
    });


    if(this.type=='finds'){
      this.Findform.patchValue({
        deviceName: this.deviceData.deviceName,
        deviceId: this.deviceData.deviceId,
        mobileNum:this.deviceData.mobileNum=='-' ? '' : this.deviceData.mobileNum==undefined ? '-' : this.deviceData.mobileNum,
        emailId:this.deviceData.emailId=='-' ? '' : this.deviceData.emailId==undefined ? '-' : this.deviceData.emailId,
        empId:this.deviceData.empId=='-' ? '' : this.deviceData.empId==undefined ? '-' : this.deviceData.empId
      });
    }

    else if(this.type=='gateways'){
      this.gatewayform.patchValue({
        deviceName: this.deviceData.gatewayName,
        deviceId: this.deviceData.gatewayId,
        // type:this.deviceData.gatewayType

      });
    }

    else if(this.type=='users'){
      this.userform.patchValue({
        mobileNum: this.deviceData.mobileNum=='' ? '-' : this.deviceData.mobileNum==undefined ? '-' : this.deviceData.mobileNum,
        emailId: this.deviceData.emailId
      });
    }

  }


  Findsubmit(data){
    if (this.Findform.valid) {
      try {
        //  var mobNum=data.mobileNum.replace(/\s/g,'')
          // console.log("mon num==",mobNum)
          data.tblName='deviceRegistration'
          data.id=this.deviceData.id
          data.userId=this.loginData.userId
          data.deviceId=this.deviceData.deviceId
          data.mobileNum=data.mobileNum!=null ||data.mobileNum!=undefined  ?data.mobileNum.e164Number:''
        console.log("find edit===",data)

        this.api.editDeviceRegister(data).then((res:any)=>{
          console.log("find submit====",res);
          if(res.status){
            if(this.language=='english'){ var msg = 'Device Updated Successfully'}
            else if(this.language=='japanese'){ var msg = 'デバイスが正常に更新されました'}
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
            if(this.language=='english'){ var msg = 'Device Name or EmployeeId Already exists, try different Name'}
             else if(this.language=='japanese'){ var msg = 'デバイス名はすでに存在します。別の名前を試してください'}
            this.general.openSnackBar(msg,'')
          }
        
        })
      } catch (err) {
      }
    }
  }


  Gatewaysubmit(data){
    if (this.gatewayform.valid) {
      try {
        data.tblName='gatewayRegistration'
        data.id=this.deviceData.id
        data.userId=this.loginData.userId
        data.deviceId= this.deviceData.gatewayId
        console.log("gateway data==",data)

        this.api.editDeviceRegister(data).then((res:any)=>{
          console.log("gateway submit==",res)
          if(res.status){
            if(this.language=='english'){
              var msg = 'Gateway Updated Successfully'
            }
            else if(this.language=='japanese'){ 
              var msg = 'ゲートウェイが正常に更新されました'
            this.general.openSnackBar(msg,'')
            }
          }
          else if(!res.status && res.alreadyExisted){
            if(this.language=='english'){ var msg = 'Gateway Name Already exists, try different gateway'}

            else if(this.language=='japanese'){ var msg = 'ゲートウェイ名またはゲートウェイIDはすでに存在します。別のゲートウェイを試してください'}
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
        data.id=this.deviceData.id
        data.mobileNum=data.mobileNum.e164Number
        data.userId=this.loginData.userId

        this.api.EditUserRegister(data).then((res:any)=>{
          // console.log("user submit==",res)
          if(res.status){
              if(this.language=='english'){var msg = 'User Updated Successfully'}
                else if(this.language=='japanese'){var msg = 'ユーザーが正常に更新されました'}
            this.general.openSnackBar(msg,'')
          }
          else if(!res.status && res.alreadyExisted){
             if(this.language=='english'){ var msg = 'Email Id or Mobile Number Already exists, try different device'}
              else if(this.language=='japanese'){var msg = 'メールIDまたは携帯電話番号はすでに存在します。別のデバイスを試してください'}
            this.general.openSnackBar(msg,'')
          }
        })
      } catch (err) {
      }
    }
  }



}
