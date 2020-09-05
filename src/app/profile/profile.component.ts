import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCheckService } from '../login-check.service';
import { ApiService } from '../api.service';
import { GeneralMaterialsService } from '../general-materials.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  subAddUserform:FormGroup
  subUser:any
  loginData:any
  registered:boolean=false
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginCheckService,
    private api: ApiService,
    private general: GeneralMaterialsService
  ) { 
    
  }

  ngOnInit(): void {

    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.subAddUserform = this.fb.group({
      subUserName: ['', Validators.email],
      mobileNum:['',Validators.required],
      portalPassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/) 	
      ]],
     
    });

    this.refreshSubUserData()
  }

  onSubmit(data) {
    data.mobileNum=data.mobileNum.replace(/\s/g,'')
    data.userId=this.loginData.userId
    console.log("sub user register==",data)
 
     if (this.subAddUserform.valid) {
       try {
         this.api.createSubUser(data).then((res:any)=>{
           console.log(" user created==",res)
       if(res.status){
         this.registered=false
         var msg = "User Created successfully"
         this.general.openSnackBar(msg,'')
         this.subAddUserform.reset()
         this.refreshSubUserData()
       }else{
         this.registered=true
       }
         })      	
       } catch (err) {
       }
     }
   }
   
refreshSubUserData(){
  this.api.getSubUser().then((res:any)=>{
    console.log("data===",res)
  if(res.status){
    this.subUser=res.success
  }
  })
}
 
 

  delete(a){
    console.log("delete==",a)
    var data={
      subUserId : a.subUserId,
      isDeleted : a.isDeleted == 'Y' ? 'N' : 'Y'
    }
 
    this.api.deleteSubUser(data).then((res:any)=>{
       console.log("data===",res)
     if(res.status){
       var msg = "User updated successfully"
       this.general.openSnackBar(msg,'')
       this.refreshSubUserData()
     }
     })
  }
}
