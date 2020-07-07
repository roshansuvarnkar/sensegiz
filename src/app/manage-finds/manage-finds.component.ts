import { Component, OnInit, ViewChild} from '@angular/core';
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
  selector: 'app-manage-finds',
  templateUrl: './manage-finds.component.html',
  styleUrls: ['./manage-finds.component.css']
})
export class ManageFindsComponent implements OnInit {
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
loginData:any
findData:any=[]
findDataTemp:any
dataSource: any = [];
displayedColumns = ['i','deviceId','deviceName','empId','shift',	'infected','battery','emailId','mobileNum',	'edit',	'delete'];
shift = new FormControl('');
shifts:any=[]
elementsTemp:any=[]

constructor(public dialog: MatDialog,private api: ApiService,private login:LoginCheckService,private general:GeneralMaterialsService,) {}


openDialog(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.height = '50vh';
  dialogConfig.width = '50vw';
  dialogConfig.data = {
    type:"finds"
  }
  const dialogRef = this.dialog.open(AddFindComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    this.refreshFinds()
  });
}


ngOnInit(): void {
  this.loginData = this.login.Getlogin()
  this.loginData = JSON.parse(this.loginData)
  this.refreshFinds()
  this.refreshShift()
}



refreshFinds(){
  var data={
    userId:this.loginData.userId,
    tblName:'deviceRegistration'
  }

  this.api.getData(data).then((res:any)=>{
    console.log("find device data ======",res);
    if(res.status){
     this.findData=[]
      for (let i = 0; i <res.success.length; i++) {
        this.findData.push(
          {
              i: i+1,
              id: res.success[i].id,
              deviceId: res.success[i].deviceId,
              deviceName: res.success[i].deviceName,
              shift: res.success[i].shiftName ,
              infected: res.success[i].infected,
              edit:'edit',
              delete:'delete',
              batteryStatus:res.success[i].batteryStatus,
              emailId:res.success[i].emailId == 'NULL' ? '-' : res.success[i].emailId,
              mobileNum:res.success[i].mobNum == 'NULL' ? '-' : res.success[i].mobNum,
              empId:res.success[i].empId == '' ? '-' : res.success[i].empId,
              userId:res.success[i].userId
          });
      }
      this.dataSource = new MatTableDataSource(this.findData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.paginator.length = this.currentPageSize
      })
      this.elementsTemp = this.findData

    }
  })
}




refreshShift(){
  var data={
    userId:this.loginData.userId,
    tblName:'deviceShift'
  }

  this.api.getData(data).then((res:any)=>{
    // console.log("shift  data ======",res);
    if(res.status){
      this.shifts=res.success
    }
  })
}


edit(data){
  console.log("find data==",data)

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.height = '50vh';
  dialogConfig.width = '50vw';
  dialogConfig.data = {
    type:"finds",
    data:data
  }
  const dialogRef = this.dialog.open(EditDeviceComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    this.refreshFinds()
  });
}


delete(a){
  if(confirm('Are you sure you want to delete the device')){
    // console.log("yes",a)
    var data = {
      id:a.id,
      tblName:'deviceRegistration'
    }
    this.api.deletedeviceandUser(data).then((res:any)=>{
      // console.log("find data ======",res);
      if(res.status){
        this.refreshFinds()
        var msg = 'Device Deleted Successfully'
        this.general.openSnackBar(msg,'')
      }
    })
  }
}



infected(a){
  if(confirm('Are you sure to do this operation')){
    // console.log("yes",a)
    var inf = a.infected == 0 ? 1 :0
    var data = {
      deviceId:a.deviceId,
      userId:this.loginData.userId,
      infected:inf
    }
    this.api.editInfectedPerson(data).then((res:any)=>{
      // console.log("infected data ======",res);
      if(res.status){
        this.refreshFinds()
        var msg = 'Employee updated Successfully'
        this.general.openSnackBar(msg,'')
      }
    })
  }

}


onShiftSelection(a){
  // console.log("a===",a)
    var data = {
    shiftId:a.shift,
    userId:this.loginData.userId,
    deviceId:a.deviceId
  }
  this.api.editShift(data).then((res:any)=>{
    // console.log("shift update data ======",res);
    if(res.status){
      this.refreshFinds()
      var msg = 'Employee Shift updated Successfully'
      this.general.openSnackBar(msg,'')
    }
  })
}



search(a){
  // console.log("a==",a)
  if(a.length>0){
    this.findData = this.elementsTemp.filter(obj=>{
      return ((obj.deviceName.toString().toLowerCase().indexOf(a)>-1) || (obj.deviceId.toString().toLowerCase().indexOf(a)>-1)
        || (obj.emailId.toString().toLowerCase().indexOf(a)>-1) || (obj.empId.toString().toLowerCase().indexOf(a)>-1))
    })


  }
  else{
    this.findData= this.elementsTemp

  }
  this.dataSource = new MatTableDataSource(this.findData);
  setTimeout(() => {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  })
}



getBatteryStatus(value){
  if(value == 1){
    var a = {
      'background-color':'green',
      'width':'31px'
    }
    return a
  }
  else if(value == 2){
    var a = {
      'background-color':'#ffc107',
      'width':'18px'
    }
    return a
  }
  else if(value == 3){
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


}
