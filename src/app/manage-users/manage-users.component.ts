import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { AddFindComponent } from '../add-find/add-find.component';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { EditDeviceComponent } from '../edit-device/edit-device.component';
import { GeneralMaterialsService } from '../general-materials.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  loginData:any
  language:any
  userData:any=[]
  userType:any
  dataSource: any = [];
  currentPageLength:any=10
  currentPageSize:any=10
  limit:any
  offset:any
  displayedColumns = ['i','mobileNum','emailId','edit',	'delete'];

  constructor(public dialog: MatDialog,private api: ApiService,private login:LoginCheckService,private general:GeneralMaterialsService,) {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '50vw';
    dialogConfig.data = {
      type:"users"
    }
    const dialogRef = this.dialog.open(AddFindComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.refreshUsers()
    });
  }


  ngOnInit() {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.userType=this.loginData.type
    this.language=this.loginData.language
   // console.log("language==",this.language)
    this.refreshUsers()
    this.getDataCount()
  }

  refreshUsers(limit=10,offset=0){
    this.loadData(limit=limit,offset=offset)
  }

  loadData(limit,offset){
    var data={
        userId:this.loginData.userId,
        subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 &&  this.loginData.id!=0) ? this.loginData.id : 0,
        limit:limit,
        offset:offset,
        tblName:'userDetails'
      }

    this.api.getData(data).then((res:any)=>{
      // console.log("user data ======",res);
      if(res.status){
        this.userData=[]

        for (let i = 0; i <res.success.length; i++) {
          this.userData.push(
            {   i:i+1,
                id: res.success[i].id,
                mobileNum: res.success[i].mobileNum,
                emailId: res.success[i].emailId,
                edit:'edit',
                delete:'delete'
            });
        }
        this.dataSource = new MatTableDataSource(this.userData);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })


      }
    })
  }


  edit(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '50vw';
    dialogConfig.data = {
      type:"users",
      data:data
    }
    const dialogRef = this.dialog.open(EditDeviceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.refreshUsers()
    });
  }



  delete(a){
  if(this.language=='english'){
    if(confirm('Are you sure you want to delete the user')){
      // console.log("yes",a)
      var data = {
        id:a.id,
        tblName:'userDetails'
      }
      this.api.deletedeviceandUser(data).then((res:any)=>{
        // console.log("find data ======",res);
        if(res.status){
          this.refreshUsers()
         var msg = 'Contact Deleted Successfully'
          this.general.openSnackBar(msg,'')
        }
      })
    }
  }
    else if(this.language=='japanese'){
    if(confirm('ユーザー情報を削除してもよろしいですか')){
      // console.log("yes",a)
      var data = {
        id:a.id,
        tblName:'userDetails'
      }
      this.api.deletedeviceandUser(data).then((res:any)=>{
        // console.log("find data ======",res);
        if(res.status){
          this.refreshUsers()
         var msg = '連絡先が正常に削除されましたy'
          this.general.openSnackBar(msg,'')
        }
      })
    }
  }

  }

  getUpdate(event) {
    // console.log("paginator event",event);
    // console.log("paginator event length", this.currentPageLength);
    this.limit = event.pageSize
   this.offset = event.pageIndex*event.pageSize
    // console.log("limit==",limit,"offset==",offset)
  this.refreshUsers(this.limit,this.offset)
  }
  getDataCount(){
    var data={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      tblName:'userDetails'
    }
    this.api.getDataCount(data).then((res:any)=>{
        //console.log("length of location report on device name ======",res);
         if(res.status){
          // console.log('\nTotal response: ',res.success[0].count);
           this.currentPageLength = parseInt(res.success[0].count);

         }
       })
  }

}
