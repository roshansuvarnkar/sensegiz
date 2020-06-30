import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';

@Component({
  selector: 'app-add-find',
  templateUrl: './add-find.component.html',
  styleUrls: ['./add-find.component.css']
})
export class AddFindComponent implements OnInit {
Findform:FormGroup
gatewayform:FormGroup
userform:FormGroup
type:any
loginData:any
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


    this.Findform = this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: ['', Validators.required],
      employeeId: [''],
      mobileNum: [''],
      emailId: ['']
    });



    this.gatewayform = this.fb.group({
      deviceName: ['', Validators.required],
      deviceId: ['', Validators.required]
    });



    this.userform = this.fb.group({
      mobileNum: ['', Validators.required],
      emailId: ['', Validators.required]
    });




  }

onNoClick(): void {
  this.dialogRef.close();
}

Findsubmit(data){
  if (this.Findform.valid) {
    try {
      data.tblName ='deviceRegistration'
      data.userId=this.loginData.userId
      this.api.deviceRegister(data).then((res:any)=>{
        console.log("find submit====",res);
        if(res.status){
          var msg = 'Find Registered Successfully'
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
          var msg = 'Device Name or Device Id Already exists, try different device'
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
      data.userId=this.loginData.userId
      this.api.deviceRegister(data).then((res:any)=>{
        // console.log("gateway submit==",res)
        if(res.status){
          var msg = 'Gateway Registered Successfully'
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
          var msg = 'Gateway Already exists, try different gateway'
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
      this.api.UserRegister(data).then((res:any)=>{
        // console.log("user submit==",res)
        if(res.status){
          var msg = 'User Registered Successfully'
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
          var msg = 'Device Already exists, try different device'
          this.general.openSnackBar(msg,'')
        }
      })
    } catch (err) {
    }
  }
}

employeeIdsubmit(data){
  if (this.userform.valid) {
    try {
      data.userId=this.loginData.userId
      this.api.UserRegister(data).then((res:any)=>{
        // console.log("user submit==",res)
        if(res.status){
          var msg = 'Email Id Registered Successfully'
          this.general.openSnackBar(msg,'')
        }
        else if(!res.status && res.alreadyExisted){
          var msg = 'EmailId Already exists, try with different email Id'
          this.general.openSnackBar(msg,'')
        }
      })
    } catch (err) {
    }
  }

}

}
