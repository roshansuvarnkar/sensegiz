import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { AddFindComponent } from '../add-find/add-find.component';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { EditDeviceComponent } from '../edit-device/edit-device.component';
import { GeneralMaterialsService } from '../general-materials.service';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Timestamp } from 'rxjs';
@Component({
  selector: 'app-manage-coins',
  templateUrl: './manage-coins.component.html',
  styleUrls: ['./manage-coins.component.css']
})
export class ManageCoinsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  loginData:any
  userType:any
  coinData:any=[]
  coindDataTemp:any=[]
  dataSource: any = [];
  inserted:any=[]
  displayedColumns = ['i','coinId','coinName','gatewayId','batteryStatus',	'edit',	'delete'];


constructor(public dialog: MatDialog,
  private api: ApiService,
  private login:LoginCheckService,
  private general:GeneralMaterialsService,) {}


  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.userType=this.loginData.type

    this.refreshCoins()
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '50vw';
    dialogConfig.data = {
      type:"coins"
    }
    const dialogRef = this.dialog.open(AddFindComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.refreshCoins()
    });


  }

  refreshCoins(){
    var data={
      userId:this.loginData.userId,
      subUserId: (this.loginData.hasOwnProperty('id') && this.loginData.type==4 && this.loginData.id!=0) ? this.loginData.id : 0,
      tblName:'coinRegistration'
    }

    this.api.getData(data).then((res:any)=>{
      console.log("coin data ======",res);
      if(res.status){
        this.coinData=[]
      for (let i = 0; i <res.success.length; i++) {
        this.coinData.push(
          {
              i: i+1,
              id:res.success[i].id,
              coinId: res.success[i].coinId,
              coinName: res.success[i].coinName,
            /*   coinType: res.success[i].coinType == 'LO'? 'Location Coin' : 'Aggregator Coin', */
              gatewayId:res.success[i].gatewayId==''?'-':res.success[i].gatewayId,
              batteryStatus:res.success[i].batteryStatus,
              battryStatusUpdatedTime:res.success[i].battryStatusUpdatedTime,
              latestStatus:res.success[i].latestStatus,
              coinStatus:res.success[i].coinStatus,
              edit:'edit',
              delete:'delete',

          });


      }
      console.log( "coin data s",this.coinData)
      this.dataSource = new MatTableDataSource(this.coinData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.paginator.length = this.currentPageSize
      })
      this.coindDataTemp=this.coinData
      }
    })
  }
// getInsertedOn(value){
// return value
// }
  getBatteryStatus(value){
    // console.log("status===",value)
    if((value.batteryStatus == 5) || (value.batteryStatus == 1)){
      var a = {
        'background-color':'green',
        'width':'31px'
      }
      return a
    }
    else if((value.batteryStatus == 6 ) || (value.batteryStatus == 2 )){
      var a = {
        'background-color':'#ffc107',
        'width':'18px'
      }
      return a
    }
    else if((value.batteryStatus == 7 ) || (value.batteryStatus == 3 )){
      var a = {
        'background-color':'red',
        'width':'10px'
      }
      return a
    }
    else{
      return {}
    }
  }

edit(data){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.height = '50vh';
  dialogConfig.width = '50vw';
  dialogConfig.data = {
    type:"coins",
    data:data
  }
  const dialogRef = this.dialog.open(EditDeviceComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    this.refreshCoins()
  });
}

delete(value){
  if(confirm('Are you sure you want to delete the device')){
    console.log("yes",value)
    var data = {
      id:value.id,
      tblName:'coinRegistration',
      userId:this.loginData.userId,
      coinId:value.coinId,
      coinName:value.coinName
    }
    console.log("delete coin===",data)
    this.api.deletedeviceandUser(data).then((res:any)=>{
      console.log("coin data ======",res);
      if(res.status){
        this.refreshCoins()
        var msg = 'Coin deleted Successfully'
        this.general.openSnackBar(msg,'')
      }
    })
  }
}

search(a){
  // console.log("a==",a)
  // if(data.length>0){
  //   this.coinData = this.coindDataTemp.filter(obj=>{
  //     return ((obj.coinName.toString().toLowerCase().indexOf(data)>-1) || (obj.coinId.toString().toLowerCase().indexOf(data)>-1))
  //   })
  // }
  // else{
  //   this.coinData= this.coindDataTemp
  // }
  this.dataSource = new MatTableDataSource(this.coinData);
  setTimeout(() => {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter =a.trim().toLowerCase()

  })
}

}
