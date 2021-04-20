import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCheckService } from '../login-check.service';
import { ApiService } from '../api.service';
import { GeneralMaterialsService } from '../general-materials.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource: any = [];
  displayedColumns = ['i','userName','type','department','mobileNum','createdDate','isDeleted'];
  findData:any=[]
  subAddUserform:FormGroup
  subUser:any
  loginData:any
  language:any
  registered:boolean=false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India];
  userType:any=[
    {
      name:'Co. Admin',
      value:2
    },
    {
      name:'Normal User',
      value:3
    },
    {
      name:'Sub Admin',
      value:4
    },
  ]
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
    this.language=this.loginData.language
    this.subAddUserform = this.fb.group({
      type:['',Validators.required],
      subUserName: ['', Validators.email],
      department: [''],
      mobileNum:['',Validators.required],
      portalPassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/)
      ]],
      mobilePassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/)
      ]],
      userPassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/)
      ]]
    },
    {
      validators: this.formValidator(),
      updateOn: 'blur',
    });

    this.refreshSubUserData()
  }


  formValidator(){
    return (formGroup: FormGroup) => {
      const type = formGroup.get('type');
      const dept = formGroup.get('department');

      if(type.value==4){
        if(dept.value!=''){
          dept.setErrors(null)
          return
        }
        else{
          dept.setErrors({
            required:true
          })
          return
        }
      }
      else{
        dept.setErrors(null)
        return null
      }
    }
  }

  onSubmit(data) {
    data.mobileNum=data.mobileNum!=null?data.mobileNum.e164Number:''
    data.userId=this.loginData.userId
   // console.log("sub user register==",data)

     if (this.subAddUserform.valid) {
       try {
         this.api.createSubUser(data).then((res:any)=>{
       //    console.log(" user created==",res)
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
  let data = {
    userId : this.loginData.userId
  }
  this.api.getSubUser(data).then((res:any)=>{
   // console.log("data===",res)
    if(res.status){
     // this.subUser=res.success
     this.findData=[]
     for (let i = 0; i <res.success.length; i++) {
       this.findData.push(
         {
             i: i+1,
             id:res.success[i].id,
            userName:res.success[i].userName,
            type:res.success[i].type,
            department:res.success[i].department,
            mobileNum:res.success[i].mobileNum,
            createdDate:res.success[i].createdDate,
            isDeleted:res.success[i].isDeleted
         });
     }
     this.dataSource = new MatTableDataSource(this.findData);
     setTimeout(() => {
       this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
       // this.paginator.length = this.currentPageSize
     })
    }
  })
}



  delete(a){
    console.log("delete==",a)
    var data={
      subUserId : a.id,
      isDeleted : a.isDeleted == 'Y' ? 'N' : 'Y'
    }

    this.api.deleteSubUser(data).then((res:any)=>{
      // console.log("data===",res)
     if(res.status){
       var msg = "User updated successfully"
       this.general.openSnackBar(msg,'')
       this.refreshSubUserData()
     }
     })
  }
}
