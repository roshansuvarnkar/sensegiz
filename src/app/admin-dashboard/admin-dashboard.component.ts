import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCheckService } from '../login-check.service';
import { ApiService } from '../api.service';
import { GeneralMaterialsService } from '../general-materials.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { AdminAddBleIdComponent } from '../admin-add-ble-id/admin-add-ble-id.component';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { WebsocketService } from '../websocket.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource: any = [];
   displayedColumns = ['i','userName','createdDate','apiKey','add','settings','isDeleted'];
   findData:any=[]
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India];
  adminAddUserform: FormGroup;
  public loginInvalid: boolean;
  registered:boolean=false
  passwordType: string = 'password';
  passwordIcon: string = 'visibility_off';
  adminData:any=[]
  language:any
  zoneData:any=[]
   constructor(
   		public dialog: MatDialog,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private login: LoginCheckService,
      private api: ApiService,
      private general: GeneralMaterialsService,
      private socket: WebsocketService
    ) {
    }

    // Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/) 	letter,digit,special character

  ngOnInit(): void {
    this.adminAddUserform = this.fb.group({
      userName: ['', Validators.email],
      mobileNum:['',Validators.required],
      zone:['',Validators.required],
      portalPassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/)
      ]],
      mobilePassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/)
      ]],
      userPassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/)
      ]]
    });
    this.refreshAdminData()
    this.getZone()
  }

 onSubmit(data) {
  data.mobileNum=data.mobileNum!=null?data.mobileNum.e164Number:''
    // console.log("admin register==",data)
    if (this.adminAddUserform.valid) {
      try {
        this.api.createUser(data).then((res:any)=>{
        //	console.log("created==",res)
			if(res.status){
        this.registered=false
				var msg = "User Created successfully"
				this.general.openSnackBar(msg,'')
				this.adminAddUserform.reset()
				this.refreshAdminData()
			}else{
        this.registered=true
      }
        })
      } catch (err) {
      }
    }
  }


refreshAdminData(){
    this.api.getAdminData().then((res:any)=>{
    //	console.log("data===",res)
    this.findData=[]
		if(res.status){
			//this.adminData=res.success
      for (let i = 0; i <res.success.length; i++) {
        this.findData.push(
          {
              i: i+1,
             userName:res.success[i].userName,
             apiKey:res.success[i].apiKey,
             userId:res.success[i].userId,
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


  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }


  openDialog(data): void {
	  const dialogConfig = new MatDialogConfig();
	  dialogConfig.disableClose = true;
	  dialogConfig.autoFocus = true;
	  dialogConfig.height = '70vh';
	  dialogConfig.width = '70vw';
	  dialogConfig.data = {
	    type:"addBle",
	    data:data
	  }
	  const dialogRef = this.dialog.open(AdminAddBleIdComponent, dialogConfig);

	  dialogRef.afterClosed().subscribe(result => {
	  });
 }

 openSetting(data){
  this.router.navigate(['/admin-settings'], { queryParams: { record: JSON.stringify(data) } });
 }


 delete(a){
 	// console.log("delete==",a)
 	var data={
 		userId : a.userId,
 		isDeleted : a.isDeleted == 'Y' ? 'N' : 'Y'
 	}

 	this.api.deleteAdminUser(data).then((res:any)=>{
    	// console.log("data===",res)
		if(res.status){
			var msg = "User updated successfully"
			this.general.openSnackBar(msg,'')
      this.socket.leaveRoom(data);
			this.refreshAdminData()
		}
    })
 }

 getZone(){
  this.zoneData=[]
  this.api.getCountryZone().then((res:any)=>{
    //console.log("data===",res)
  if(res){
    this.zoneData=res
  }
  })
}


}
