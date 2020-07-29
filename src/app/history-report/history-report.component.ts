import { Component, OnInit,Inject, ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
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

  type:any
  dateBased:any
  findNameBased:any
  liveData:any=[]
  summaryData:any=[]
  excelData:any=[]
  dataSource:any
  loginData:any
  from:Date
  to:Date
  index:any
  selectedValue:any
  deviceName:any
  currentPageLength:any=10
  currentPageSize:any=10
  displayedColumns: string[] = ['i','baseName','contactName','location', 'updatedOn', 'totaltime'];
  displayedColumns1: string[] = ['i','contactName','location', 'updatedOn', 'totaltime'];
  displayedColumns2: string[] = ['contactDeviceName','updatedOn'];
  displayedColumns3: string[] = ['i','deviceName','inTime', 'outTime','totTime'];
  fileName:any
  showSpinner:boolean=false
  title:any

    constructor(
      public dialog: MatDialog,
      private api: ApiService,
      private login:LoginCheckService,
      private general:GeneralMaterialsService,
      private router:Router,
      public dialogRef: MatDialogRef<HistoryReportComponent>,
       @Inject(MAT_DIALOG_DATA)  data,
    ) {
      this.type=data.type
      // console.log("type==",this.type)
      this.liveData = data.data

      this.from = data.fromDate
      this.to = data.toDate
      this.selectedValue=data.valueSelected
      this.deviceName=data.deviceName
     }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)

    this.getTotalCount()

    this.loadData()


  }

  getTotalCount(){
    if(this.type=='basedOnDate'){
      var data={
        userId:this.loginData.userId,
        fromDate: this.from,
        toDate:this.to,
      }

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

  loadData(limit=10,offset=0,type=0){

      if(this.type=='basedOnDate'){

        var data={
          userId:this.loginData.userId,
          fromDate: this.from,
          toDate:this.to,
          limit:limit,
          offset:offset
        }
        this.api.getDeviceHistoryBasedOnDate(data).then((res:any)=>{
          // console.log("find data based on date ======",res);
          this.liveData=[]
          if(res.status){
            if(type==0){
              this.liveData=res.success
            }
            else{
              // console.log("came===",res.success);
              this.excelData=res.success
              this.openExcel()
            }
            this.dataSource = new MatTableDataSource(this.liveData);
            setTimeout(() => {
              this.dataSource.sort = this.sort;
              // this.paginator.length = this.currentPageLength
            })
          }

        })

      }
      if(this.type=='basedOnFindName'){
        var data1={
          userId:this.loginData.userId,
          deviceName:this.deviceName,
          fromDate: this.from,
          toDate:this.to,
          offset:offset,
          limit:limit

        }
        this.api.getDeviceHistoryBasedOnDeviceName(data1).then((res:any)=>{
          // console.log("find data based on name ======",res);

          if(res.status){
            if(type==0){
              this.liveData=res.success
            }
            else{
              this.excelData=res.success
              this.openExcel()
            }

            this.dataSource = new MatTableDataSource(this.liveData);
            setTimeout(() => {
              this.dataSource.sort = this.sort;
              // this.paginator.length = this.currentPageLength
            })
          }
        })
      }
      if(this.type=='summaryReport'){
        var data2={
          userId:this.loginData.userId,
          deviceName:this.deviceName,
          fromDate: this.from,
          toDate:this.to,

        }
        this.api.getSummaryReport(data2).then((res:any)=>{
          // console.log("summary report ======",res);

          //this.liveData=[]
          if(res.status){

            var groupDate = this.dataDateReduce(res.success)
            // console.log("groupDate===",groupDate)
            this.liveData = Object.keys(groupDate).map((data)=>{
              return {
                date : data,
                data : groupDate[data]
              }
            })
              
          for(let i=0;i<this.liveData.length;i++){

            for(let j=0;j<this.liveData[i].data.length-1;j++){
              this.liveData[i].data[j].contactDeviceName = this.liveData[i].data[j].contactDeviceName+','
            }
         
            this.liveData[i].data[this.liveData[i].data.length-1].contactDeviceName=this.liveData[i].data[this.liveData[i].data.length-1].contactDeviceName+'.'

           }
          
          }
        })

      }

}


dataDateReduce(data){
  return data.reduce((group,obj)=>{
    const date = obj.updatedOn.split('T')[0]
    if(!group[date]){
      group[date]=[]
    }
    group[date].push(obj)
    return group
  },{})
}




getUpdate(event) {
  // console.log("paginator event",event);
  // console.log("paginator event length", this.currentPageLength);
  var limit = event.pageSize
  var offset = event.pageIndex*event.pageSize
  // console.log("limit==",limit,"offset==",offset)
  this.loadData(limit,offset)
}



getPages() {

  var tempLen=this.currentPageLength
  //  console.log("paginator event length",tempLen);
  this.loadData(tempLen,0,1)
  var msg = 'Downloading'
  this.general.openSnackBar(msg,'')
  //  setTimeout(()=>{
  //     this.downloadPDF()
  //   },5000);
  this.showSpinner=true

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
    var timeArr = a.split(':')
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
    if(date==''){
      date = '-'
    }
    return date
  }



  openExcel(){

      if(this.type=='summaryReport'){
          this.fileName='summaryReport.xlsx'
          this.title = 'Summary Report of Find Name'+this.deviceName;
          let element = document.getElementById('htmlData');
          this.general.exportToExcel(element,this.fileName, this.title)

        }
        else{
          console.log("this.excelData====",this.excelData)
          if(this.type=='basedOnDate'){
            this.fileName='ReportBasedOnDate.xlsx'
            this.title = 'Based on date'+this.from+" "+this.to;
            this.general.exportAsExcelFile(this.excelData,this.fileName, this.title)

          }
          if(this.type=='basedOnFindName'){
            this.fileName='ReportBasedOnFindName.xlsx'
            this.title = 'Based on Find Name'+this.deviceName;
            this.general.exportAsExcelFile(this.excelData,this.fileName, this.title)

          }
        // console.log("excel data===",this.excelData)

      }

  }








}
