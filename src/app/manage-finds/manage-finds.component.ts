import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { AddFindComponent } from '../add-find/add-find.component';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { EditDeviceComponent } from '../edit-device/edit-device.component';
import { GeneralMaterialsService } from '../general-materials.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Timestamp } from 'rxjs';
import * as XLSX from 'xlsx';


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
displayedColumns = ['i','deviceId','deviceName','empId','shift',	'infected','batteryStatus','emailId','mobileNum',	'edit',	'delete'];
shift = new FormControl('');
shifts:any=[]
elementsTemp:any=[]
tempImagePath:any=''
header:any
worksheet:any
storeData:any
language:any
fileupload:FormGroup
loading:boolean=false
format:boolean=false
@ViewChild('fileInput') fileInput:ElementRef
constructor(public dialog: MatDialog,private api: ApiService,private login:LoginCheckService,private general:GeneralMaterialsService,private fb:FormBuilder) {}


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
  this.language=this.loginData.language
  this.fileupload = this.fb.group({
    fileData:null,
    type:'devices',
    header:['']
  })
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
              batteryUpdatedOn:res.success[i].batteryUpdatedOn,
              edit:'edit',
              delete:'delete',
              batteryStatus:res.success[i].batteryStatus,
              emailId:res.success[i].emailId == '' || res.success[i].emailId == 'NULL' ||res.success[i].emailId == 'undefined' ? '-' : res.success[i].emailId,
              mobileNum:res.success[i].mobNum == '' ||res.success[i].mobNum == 'NULL' ||res.success[i].mobNum == 'undefined' ? '-' : res.success[i].mobNum,
              empId:res.success[i].empId == ''||res.success[i].empId == 'NULL' || res.success[i].empId == 'undefined' ? '-' : res.success[i].empId
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
    console.log("yes",a)
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
  else{
    this.refreshFinds()

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
  // if(a.length>0){
  //   this.findData = this.elementsTemp.filter(obj=>{
  //     return ((obj.deviceName.toString().toLowerCase().indexOf(a)>-1) || (obj.deviceId.toString().toLowerCase().indexOf(a)>-1)
  //       || (obj.emailId.toString().toLowerCase().indexOf(a)>-1) || (obj.empId.toString().toLowerCase().indexOf(a)>-1))
  //   })


  // }
  // else{
  //   this.findData= this.elementsTemp

  // }
  this.dataSource = new MatTableDataSource(this.findData);
  setTimeout(() => {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter =a.trim().toLowerCase()
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
getBatteryUpdatedOn(value){
  return value
}



fileChange(files){
  alert("Format should be: Name*, employeeId, deviceId*, mobileNumber, emailId ")
  this.loading=false
  this.format=false

  // console.log("File Change event",files);
 let reader = new FileReader();
 if(files && files.length>0){

   let file = files[0];
   reader.readAsDataURL(file);
   console.log("file===",file)
   reader.onload = ()=>{
     this.tempImagePath = reader.result;
    //  console.log("\nReader result",reader.result);
     this.fileupload.get('fileData').setValue({
       filename: file.name ,
       filetype: file.type,
       value: this.tempImagePath.split(',')[1],
     });


   }
 }
this.readExcel(files[0])


}

readExcel(file) {  
  let readFile = new FileReader();  
  readFile.onload = (e) => {  
    this.storeData = readFile.result;  
    var data = new Uint8Array(this.storeData);  
    var arr = new Array();  
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);  
    var bstr = arr.join("");  
    var workbook = XLSX.read(bstr, { type: "binary" });  
    var first_sheet_name = workbook.SheetNames[0];  
    this.worksheet = workbook.Sheets[first_sheet_name];  
    this.header=XLSX.utils.sheet_to_json(this.worksheet, { header: 1 })

    this.fileupload.patchValue({
      header:this.header[0]
    })

     
  }  
  readFile.readAsArrayBuffer(file);  
  console.log(this.fileupload)
  var msg = 'Uploading file'
  this.general.openSnackBar(msg,'')
  setTimeout(()=>{this.fileSubmit(this.fileupload.value)},6*1000)
  
}
onclick(){
  document.getElementById('file').click()
}

clearFile(){
this.fileupload.get('fileData').setValue(null);
 this.tempImagePath = '';
 this.fileInput.nativeElement.value = '';

}

randomNumber(min=1, max=20) {
   return Math.random() * (max - min) + min;
}


fileSubmit(data){
  console.log("file upload data",data)

  var type=data.fileData.filename.split('.')
  console.log("type==",type[type.length-1].toString())
  if(type[type.length-1]=='xlsx'.toString() || type[type.length-1]=='xls'){
  
    this.loading=false
    if(data.header[0].toLowerCase()=='name' && data.header[2].toLowerCase()=='deviceid'|| data.header[1].toLowerCase()=="employeeid" || 
    data.header[3]=="mobilenumber".toLowerCase() || data.header[4]=="emailid".toLowerCase()){
      this.format=false
      var msg = 'Please wait..! It takes few minutes to upload'
      this.general.openSnackBar(msg,'')
      data.userId =  this.loginData.userId
      data.fileData.filename = this.loginData.userId.toString() + parseInt(this.randomNumber().toString()) + data.fileData.filename
        console.log("file===",data)
      this.api.uploadDeviceFile(data).then((res:any)=>{
        if(res.status){
          console.log("res file ===",res)
          this.clearFile()
          var msg = 'uploaded'
          this.general.openSnackBar(msg,'')
        
        }
        
      })

  }
  else{

    this.format=true
    }
  }
  else{
    this.loading=true
    }
 
 }


}
