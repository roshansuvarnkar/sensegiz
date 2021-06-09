import { Component, OnInit,ViewChild } from '@angular/core';
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
  selector: 'app-manage-gateways',
  templateUrl: './manage-gateways.component.html',
  styleUrls: ['./manage-gateways.component.css']
})
export class ManageGatewaysComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  loginData:any
  language:any
  userType:any
  gatewayData:any=[]
  elementsTemp:any=[]
  dataSource: any = [];
  currentPageLength:any=10
  currentPageSize:any=10
  limit:any=10
  offset:any=0
  displayedColumns = ['i','gatewayId','gatewayName','gatewayType','currentVersion','bleVersion','edit',	'delete'];
  // ,'currentVersion'
  constructor(private dialog:MatDialog,private api: ApiService,private login:LoginCheckService,private general:GeneralMaterialsService) { }




  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '50vw';
    dialogConfig.data = {
      type:"gateways"
    }
    const dialogRef = this.dialog.open(AddFindComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.refreshGateway(this.limit,this.offset)
      this.getDataCount()
    });
  }


  ngOnInit() {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.userType=this.loginData.type
    this.language=this.loginData.language
   // console.log("language==",this.language)
   this.refreshGateway(this.limit,this.offset)
    this.getDataCount()
  }

  refreshGateway(limit=10,offset=0){
    this.loadData(limit=limit,offset=offset)
  }

  loadData(limit,offset){
  var data={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      limit:limit,
      offset:offset,
      tblName:'gatewayRegistration'
    }

  this.api.getData(data).then((res:any)=>{
    //console.log("gateway data ======",res);
    if(res.status){
      this.gatewayData=[]

      for (let i = 0; i <res.success.length; i++) {
        this.gatewayData.push(
          {
              i:i+1,
              id: res.success[i].id,
              gatewayId: res.success[i].gatewayId,
              gatewayName: res.success[i].gatewayName,
              gatewayType: res.success[i].gatewayType =='ethernet'?'Ethernet Gateway':'WiFi Gateway',
              currentVersion:res.success[i].currentVersion,
              bleVersion:res.success[i].bleVersion,
              pingAlertTime:res.success[i].pingAlertTime,
              pingAlertStatus:this.general.pingAlertStatus(res.success[i].pingAlertTime),
              edit:'edit',
              delete:'delete'
          });
      }
      //console.log("gatewayspig",this.gatewayData)
      this.dataSource = new MatTableDataSource(this.gatewayData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
       // this.dataSource.paginator = this.paginator;
      })
      this.elementsTemp = this.gatewayData

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
    type:"gateways",
    data:data
  }
  const dialogRef = this.dialog.open(EditDeviceComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    this.refreshGateway(this.limit,this.offset)
    this.getDataCount()
  });
}



delete(a){
if(this.language=='english'){
  if(confirm('Are you sure you want to delete the gateway')){
    // console.log("yes",a)
    var data = {
      id:a.id,
      tblName:'gatewayRegistration'
    }
    this.api.deletedeviceandUser(data).then((res:any)=>{
      // console.log("gateway data ======",res);
      if(res.status){
        this.refreshGateway(this.limit,this.offset)
         this.getDataCount()
        var msg = 'Gateway Deleted Successfully'
        this.general.openSnackBar(msg,'')
      }
    })
  }
  }
    else if(this.language=='japanese'){
  if(confirm('ゲートウェイを削除してもよろしいですか')){
    // console.log("yes",a)
    var data = {
      id:a.id,
      tblName:'gatewayRegistration'
    }
    this.api.deletedeviceandUser(data).then((res:any)=>{
      // console.log("gateway data ======",res);
      if(res.status){
        this.refreshGateway(this.limit,this.offset)
        this.getDataCount()
        var msg = 'ゲートウェイが正常に削除されました'
        this.general.openSnackBar(msg,'')
      }
    })
  }
  }


}



search(a){
//   if(a.length>0){
//     this.gatewayData = this.elementsTemp.filter(obj=>{
//       return ((obj.gatewayId.toString().toLowerCase().indexOf(a)>-1) || (obj.gatewayName.toString().toLowerCase().indexOf(a)>-1))
//     })
//   }
//   else{
//     this.gatewayData = this.elementsTemp
//   }
//   this.dataSource = new MatTableDataSource(this.gatewayData);
//   setTimeout(() => {
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;
//   })

    this.dataSource = new MatTableDataSource(this.gatewayData);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter =a.trim().toLowerCase()
    })
  }
  GatewaypgiAlret(value){
    if(value < 10){
      var a = {
        'width':'31px',
          'color':'green',
          'position':'absolute',
          'margin-left':'-33px',
          'margin-top':'-2px',
      }
      return a
    }
    else if(value > 10){
      var a = {
        'width':'18px',
        'color':'red',
        'position':'absolute',
        'margin-left':'-30px',
        'margin-top':'-2px',
      }
      return a
    }
    else{
      return {}
    }
  }
  getUpdate(event) {
    // console.log("paginator event",event);
    // console.log("paginator event length", this.currentPageLength);
    this.limit = event.pageSize
   this.offset = event.pageIndex*event.pageSize
    // console.log("limit==",limit,"offset==",offset)
   this.refreshGateway(this.limit,this.offset)
  }
  getDataCount(){
    var data={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      tblName:'gatewayRegistration'
    }
    this.api.getDataCount(data).then((res:any)=>{
       // console.log("length of location report on device name ======",res);
         if(res.status){
           //console.log('\nTotal response: ',res.success[0].count);
           this.currentPageLength = parseInt(res.success[0].count);
         }
       })
  }

}
