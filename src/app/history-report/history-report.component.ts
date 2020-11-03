import { Component, OnInit,Inject, ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Timestamp } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import { OrderContactComponent } from '../order-contact/order-contact.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-history-report',
  templateUrl: './history-report.component.html',
  styleUrls: ['./history-report.component.css']
})
export class HistoryReportComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('htmlData') htmlData:ElementRef;
  selectMin:FormGroup
  type:any
  dateBased:any
  findNameBased:any
  liveData:any=[]
  summaryData:any=[]
  excelData:any=[]
  countCummulative:any=[]
  dataSource:any
  loginData:any
  from:any
  to:any
  from1:any
  to1:any
  index:any
  selectedValue:any
  deviceName:any
  currentPageLength:any=10
  currentPageSize:any=10
  displayedColumns: string[] = ['i','baseName','contactName','empId','startTime','updatedOn', 'totaltime'];
  displayedColumns1: string[] = ['i','contactName','updatedOn', 'totaltime'];
  displayedColumns2: string[] = ['contactDeviceName','updatedOn'];
  displayedColumns3: string[] = ['i','deviceName','inTime', 'outTime','totTime'];
  displayedColumns5: string[] = ['i','username','count','totTime'];
  date:any
  fileName:any
  showSpinner:boolean=false
  language:any
  title:any
  totTime:any=[]
  filterValue:any
  limit:any
  offset:any
  deviceIdData:any

    constructor(
      public dialog: MatDialog,
      private api: ApiService,
      private login:LoginCheckService,
      private general:GeneralMaterialsService,
      private router:Router,
      public dialogRef: MatDialogRef<HistoryReportComponent>,
      private fb:FormBuilder,
       @Inject(MAT_DIALOG_DATA)  data,
    ) {
      this.type=data.type
      // console.log("type==",this.type)
      this.liveData = data.data

      this.from = data.fromDate
      this.to = data.toDate
      this.from1 = data.fromDate1
      this.to1 = data.toDate1
      this.date=data.date
      this.selectedValue=data.valueSelected
      this.deviceName=data.deviceName
     }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.language=this.loginData.language
    console.log("language==",this.language)
    this.selectMin=this.fb.group({
      minute:['null']
    })
    this.getTotalCount()

    this.loadData()


  }

  getTotalCount(){
    if(this.type=='basedOnDate'){
      var data={
        userId:this.loginData.userId,
        fromDate: this.from,
        toDate:this.to,
        zone:this.general.getZone(this.date)
      }
        console.log("count of report on date ======",data);

      this.api.getHistoryDateReportTotalCount(data).then((res:any)=>{
        // console.log("length of report on date ======",res);
        if(res.status){
          // console.log('\nTotal response: ',res.success[0].count);
          this.currentPageLength = parseInt(res.success[0].count);

        }
      })

    }
  if(this.type=='basedOnFindName'){
    var data1={
      userId:this.loginData.userId,
      deviceName:this.deviceName,
      fromDate: this.from,
      toDate:this.to,
      zone:this.general.getZone(this.date)
    }

    this.api.getHistoryNameReportTotalCount(data1).then((res:any)=>{
      // console.log("length of report on device name ======",res);
      if(res.status){
        // console.log('\nTotal response: ',res.success[0].count);
        this.currentPageLength = parseInt(res.success[0].count);
        // this.tempLen=this.currentPageLength
      }
    })

  }
  }
  loadData(limit=10,offset=0){

    if(this.type == 'basedOnDate'){
      this.basedOnDate(limit=limit,offset=offset)
    }
    if(this.type == 'cummulative'){
      this.cummulativeReport()
    }
    if(this.type == 'basedOnFindName'){
      this.basedOnFindName(limit=limit,offset=offset)
    }
    if(this.type == 'summaryReport'){
      this.summaryReport()

    }
   
}
basedOnDate(limit,offset){
  console.log(limit,offset)
  var data={
    userId:this.loginData.userId,
    fromDate: this.from,
    toDate:this.to,
    limit:limit,
    offset:offset,
    zone:this.general.getZone(this.date)
  }
  console.log("data==",data)
  this.api.getDeviceHistoryBasedOnDate(data).then((res:any)=>{
    console.log("find data based on date ======",res);
    this.liveData=[]
    this.totTime=[]
    if(res.status){
      this.totTime=res.success

      console.log("this.selectMin.get('minute').value===",this.selectMin.get('minute').value)
   
      // if(this.selectMin.get('minute').value=='null' || this.selectMin.get('minute').value==0){
        console.log("this.selectMin.get('minute').value else===",this.selectMin.get('minute').value)
        for(var i=0;i<res.success.length;i++){

          this.liveData.push({
          i:i+1,
          baseName:res.success[i].baseName,
          contactName:res.success[i].contactName,
          empId:res.success[i].empId==null || res.success[i].empId==null?'-':res.success[i].empId,
          updatedOn:this.general.updatedOnDate(res.success[i].updatedOn),
          startTime:this.general.startTime(res.success[i].totalTime,res.success[i].updatedOn),
          totalTime:this.general.convertTime(res.success[i].totalTime)

        })
        }
  
      this.dataSource = new MatTableDataSource(this.liveData);

      setTimeout(() => {
        this.dataSource.sort = this.sort;
        // this.paginator.length = this.currentPageLength
      })
    
      // }
      // else{
      //   this.totTime=res.success
      //   console.log("this.tottttttt===",this.totTime)

      //   if(this.selectMin.get('minute').value!=''){
      //     console.log("this.selectMin.get('minute').value===",this.selectMin.get('minute').value)
          
      //     this.filterTotTime(this.selectMin.get('minute').value)
      
      //   }
      // }
    }

  })

}
basedOnFindName(limit,offset){
  var data={
    userId:this.loginData.userId,
    deviceName:this.deviceName,
    fromDate: this.from,
    toDate:this.to,
    offset:offset,
    limit:limit,
    zone:this.general.getZone(this.date)

  }
  this.liveData=[]
  this.totTime=[]
  this.api.getDeviceHistoryBasedOnDeviceName(data).then((res:any)=>{
    console.log("find data based on name ======",res);

    if(res.status){
   
      
        this.totTime=res.success
   
      // if(this.selectMin.get('minute').value=='null' || this.selectMin.get('minute').value==0){
        this.liveData=res.success
      this.dataSource = new MatTableDataSource(this.liveData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        // this.paginator.length = this.currentPageLength
      })
      // }
      // else{
      //   this.totTime=res.success
      //   console.log("this.tottttttt===",this.totTime)

      //   if(this.selectMin.get('minute').value!=''){
      //     console.log("this.selectMin.get('minute').value===",this.selectMin.get('minute').value)
          
      //     this.filterTotTime(this.selectMin.get('minute').value)
      
      //   }
      // }
    }
  })

}

// summaryReport(){

//     var data={
//       userId:this.loginData.userId,
//       deviceName:this.deviceName,
//       fromDate: this.from,
//       toDate:this.to,
//       zone:this.getZone(this.date)
//     }
//     this.api.getSummaryReport(data).then((res:any)=>{
//       console.log("summary report======",res);

//       this.liveData=[]
//       if(res.status){

//         var groupDate = this.dataDateReduce(res.success)
//         // console.log("groupDate===",groupDate)
//         this.liveData = Object.keys(groupDate).map((data)=>{

//           return {
//             date : data,
//             data : groupDate[data]
//           }
//         })

//         for(let i=0;i<this.liveData.length;i++){

//           for(let j=0;j<this.liveData[i].data.length-1;j++){
//             this.liveData[i].data[j].contactDeviceName = this.liveData[i].data[j].contactDeviceName+','
//           }

//           this.liveData[i].data[this.liveData[i].data.length-1].contactDeviceName=this.liveData[i].data[this.liveData[i].data.length-1].contactDeviceName+'.'

//          }


//       }
//     })
//   }


// dataDateReduce(data){
// return data.reduce((group,obj)=>{
//   const date = obj.updatedOn.split('T')[0]
//   if(!group[date]){
//     group[date]=[]
//   }
//   group[date].push(obj)
//   return group
// },{})
// }
summaryReport(){

  var data={
    userId:this.loginData.userId,
    deviceName:this.deviceName,
    fromDate: this.from,
    toDate:this.to,
    zone:this.general.getZone(this.date)

  }
  this.api.getSummaryReport(data).then((res:any)=>{
    console.log("summary report======",res);

    this.liveData=[]
    this.deviceIdData=[]
    if(res.status){

      var groupUser = this.dataDateReduce(res.success)
      this.deviceIdData=this.deviceId(res.success)

      this.liveData = Object.keys(groupUser).map((data)=>{

        return {
          date : groupUser[data],
          data : data
        }
      })
      console.log("live==",this.liveData)

      // for(let i=0;i<this.liveData.length;i++){

      //   for(let j=0;j<this.liveData[i].date.length-1;j++){
      //     this.liveData[i].date[j].updatedOn = this.liveData[i].date[j].updatedOn.split('T')[0]+','
      //   }

      //   this.liveData[i].date[this.liveData[i].date.length-1].updatedOn=this.liveData[i].date[this.liveData[i].date.length-1].updatedOn.split('T')[0]+'.'

      //  }


    }
  })
}


dataDateReduce(data){
  return data.reduce((group,obj)=>{
    const name = obj.contactDeviceName == this.deviceName?obj.baseDeviceName: obj.contactDeviceName
    // console.log("name---",name,"this.deviceName====",this.deviceName)
  if(name!=this.deviceName){
      if(!group[name]){
        group[name]=[]
      }
      group[name].push(obj)
    }
    // console.log("group==",group)
    return group
 
  },{})
}
callUpdatedon(date){
  var a=[]
  var data=date.filter((obj,index)=>{
    //  console.log(obj.updatedOn)
     if(!a.includes(obj.updatedOn)){
       a.push(obj.updatedOn)
     }
      
  })
  // console.log("aaa==",a)
  return a
}
cummulativeReport(){
  var date=new Date()

  var data={
    userId:this.loginData.userId,
    fromDate: this.from,
    toDate:this.to,
    zone:this.general.getZone(date)

  }
  console.log("hvhs==",data)
  this.api.viewCTReport(data).then((res:any)=>{
    this.liveData=[]
    this.totTime=[]
    console.log("cummulative report==",res)
    if(res.status){
      this.totTime=res.data
      // if(this.selectMin.get('minute').value=='null' || this.selectMin.get('minute').value==0){
        console.log("this.selectMin.get('minute').value else===",this.selectMin.get('minute').value)
        for(let i=0;i<res.data.length;i++){
          this.liveData.push({
            i:i+1,
            username:res.data[i].baseDeviceName,
            count:res.data[i].count,
            totTime:this.general.convertTime(res.data[i].totalTime)
  
          });
        }
        this.dataSource = new MatTableDataSource(this.liveData);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator
           })
    
      // }
      // else{
      //   this.totTime=res.success
      //   console.log("this.tottttttt===",this.totTime)

      //   if(this.selectMin.get('minute').value!=''){
      //     console.log("this.selectMin.get('minute').value===",this.selectMin.get('minute').value)
          
      //     this.filterTotTime(this.selectMin.get('minute').value)
      
      //   }
      // }

    }
  })

}



getUpdate(event) {
  console.log("paginator event",event);
  console.log("form value", this.selectMin);
  this.limit = event.pageSize
  this.offset = event.pageIndex*event.pageSize
  // console.log("limit==",limit,"offset==",offset)
  this.loadData(this.limit,this.offset)



}





getPages() {
  var dateObj=new Date()
  var data={}
//  if(this.type=='basedOnDate' || this.type=='basedOnFindName' || this.type=='summaryReport'){
//   var tempLen=this.currentPageLength
//   //  console.log("paginator event length",tempLen);
//   this.loadData(tempLen,0,1)
//   var msg = 'Downloading'
//   this.general.openSnackBar(msg,'')
//   //  setTimeout(()=>{
//   //     this.downloadPDF()
//   //   },5000);
//   setTimeout(()=>{

//     this.openExcel()

//   },5000);

//   setTimeout(()=>{
//     this.loadData(10,0,0)
//   },8000)
//  clearTimeout(8*1000)
//   // this.showSpinner=true
//  }
if(this.type=='basedOnDate' || this.type=='basedOnFindName'){
  if(this.type=='basedOnDate'){
    data={
    userId:this.loginData.userId,
    fromDate: this.from,
    toDate:this.to,
    zone:this.general.getZone(dateObj),
    type:this.type
    }
    fileName="GenericReport"
  }
  if(this.type=='basedOnFindName'){
    data={
    userId:this.loginData.userId,
    deviceName:this.deviceName,
    fromDate: this.from,
    toDate:this.to,
    zone:this.general.getZone(dateObj),
    type:this.type
  }
  fileName="Report-of-Find- "+this.deviceName
}

  console.log("data to send ======",data);

  this.api.downloadReport(data,fileName).then((res:any)=>{

  console.log("report data recieved ======",res);
  })
}
if(this.type=='summaryReport'){
  this.general.loadingFreez.next({status:true})
  console.log("hi")
  setTimeout(()=>{

    this.openExcel()
    this.general.loadingFreez.next({status:false})

  },6000);

}
 if(this.type=='cummulative'){
  var fileName=''
  
  data={
      userId:this.loginData.userId,
      fromDate: this.from,
      toDate:this.to,
      zone:this.general.getZone(dateObj),
      type:this.type
    }
    fileName="CummulativeReport"
    console.log("data to send ======",data);

    //apicall
    
    this.api.downloadCummulative(data,fileName).then((res:any)=>{

      console.log("report data recieved ======",res);
  
    })
  }
}


  orderContactOpen(a){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '90vh';
    dialogConfig.width = '75vw';
    dialogConfig.data = {
      data:a,
      order:2,
      fromDate : this.from,
      toDate : this.to
    }
    const dialogRef = this.dialog.open(OrderContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  convertDate(a){
    // console.log("a===",a)
    var timeArr = []
    if(a!==''){
      timeArr=a.split(':')
    }
    
    var date = ''
    if(timeArr[0]!='00'){
      date += timeArr[0] + ' hour '
    }
    if(timeArr[1]!='00'){
      date += timeArr[1] + ' minute '
    }
    if(timeArr[2]!='00'){
      date += timeArr[2] + ' second '
    }
    if(date=='' ||date=='-'){
      date = '05 second'
    }
    return date
  }

  filterTotTime(event){
    console.log("event value===",event,"  tot===", this.totTime)
    var arr=[]
    
  if(event.value !="0" && this.selectMin.get('minute').value!=''){
    if(this.type == 'basedOnDate' ){
      console.log("tot===", this.totTime)
      this.totTime.filter((obj,index)=>{
    
        if((parseInt(obj.totalTime.split(':')[1])>=parseInt(event.value) )|| (parseInt(obj.totalTime.split(':')[1])>=parseInt(this.selectMin.get('minute').value))){
        arr.push({
        
            baseName:obj.baseName,
            contactName:obj.contactName,
            empId:obj.empId==null ||obj.empId==''?'-':obj.empId,
            updatedOn:obj.updatedOn,
            startTime:this.general.startTime(obj.totalTime,obj.updatedOn),
            totalTime:this.general.convertTime(obj.totalTime)
      
          })
          console.log("arrr==",arr)
          return arr
        }
    
      
      })
      

      this.dataSource = new MatTableDataSource(arr);
      setTimeout(() => {
        this.dataSource.sort = this.sort;

      })

    }
    if(this.type == 'basedOnFindName'  ){
      
      this.totTime.filter((obj,index)=>{
    
        if((parseInt(obj.totalTime.split(':')[1])>=parseInt(event.value) )|| (parseInt(obj.totalTime.split(':')[1])>=parseInt(this.selectMin.get('minute').value))){
          arr.push(obj)
          console.log("arrr==",arr)
          return arr
        }

      })
      

      this.dataSource = new MatTableDataSource(arr);
      setTimeout(() => {
        this.dataSource.sort = this.sort;

      })

    }
    if(this.type == 'cummulative' ){
      
      this.totTime.filter((obj,index)=>{
    
        if((parseInt(obj.totalTime.split(':')[1])>=parseInt(event.value) )|| (parseInt(obj.totalTime.split(':')[1])>=parseInt(this.selectMin.get('minute').value))){
          arr.push({
            username:obj.baseDeviceName,
            count:obj.count,
            totTime:this.general.convertTime(obj.totalTime)
          })
            console.log("arrr==",arr)
            return arr
          }
      
        
        })

        this.dataSource = new MatTableDataSource(arr);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        })
    }
  
  }
  else{
    this.loadData(this.limit,this.offset)
  }

  }

  openExcel(){

      if(this.type=='summaryReport'){
          this.fileName='summaryReport-of-infectedUser-'+this.deviceName+'.xlsx'
          this.title = 'Summary Report of Find Name'+this.deviceName;
          let element = document.getElementById('htmlData');
          this.general.exportToExcel(element,this.fileName, this.title)

        }
      //   else{
      //     console.log("this.excelData====",this.excelData)
      //     if(this.type=='basedOnDate'){
      //       this.fileName='GenricReport.xlsx'
      //       this.title = 'Based on date'+this.from+" "+this.to;

      //       this.general.exportAsExcelFile(this.excelData,this.fileName, this.title)

      //     }
      //     if(this.type=='basedOnFindName'){
      //       this.fileName='Report-Of-Find-'+this.liveData[0].baseName+'.xlsx'
      //       this.title = 'Based on Find Name'+this.deviceName;
      //       let element = document.getElementById('htmlData');

      //       this.general.exportAsExcelFile(this.excelData,this.fileName, this.title)

      //     }

      // }

  }


  deviceId(data){
    var a=[]
    data.filter((obj)=>{
      obj.contactDevice=obj.contactDeviceName== this.deviceName?obj.baseDevice: obj.contactDevice
        if(!a.includes(obj.contactDevice)){
          a.push(obj.contactDevice)
        }
    
        
    })
    return a
  }
  sendWarning(){
    var data={
      userId:this.loginData.userId,
      deviceId:this.deviceIdData,
      infectedPersonName:this.deviceName,
      adminEmailId:this.loginData.userName
    }
    console.log("sendwarning data=====",data)
    this.api.infectedContactalert(data).then((res:any)=>{
      console.log("infectedContactalert res===",res)
    })
  }





}
