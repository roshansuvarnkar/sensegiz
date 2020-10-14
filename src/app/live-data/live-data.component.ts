import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Timestamp } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.css']
})

export class LiveDataComponent implements OnInit {
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
timeout:any
liveData:any=[]
dataSource:any
loginData:any
currentLength:any
count= 0
currentPageLength:number = 10;
currentPageSize:number = 10;

displayedColumns: string[] = ['i','baseName', 'contactName', 'startTime','updatedOn','totalTime'];


  constructor(
    private api: ApiService,
    private login:LoginCheckService,
    private general:GeneralMaterialsService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.count=0
    this.refresh()
    // console.log("count",this.count)
    this.timeout=setInterval(()=>{this.refresh()},60*500)
  }
  ngOnDestroy() {
    clearInterval(this.timeout)
  }
  refresh(){
   
    this.refreshData(this.count)
  }
  prevDayData(){
    // var limit=this.paginator.pageSize
    // var offset=this.paginator.pageIndex*this.paginator.pageSize
    this.count = this.count + 1;
    // console.log("count==",this.count);

    this.getTotalCount(this.count)
    this.refreshData(this.count)
  }

  nextDayData(){
    // var limit=this.paginator.pageSize
    // var offset=this.paginator.pageIndex*this.paginator.pageSize
    this.count = this.count - 1;
    // console.log("count==",this.count);

    this.getTotalCount(this.count)
    this.refreshData(this.count)
  }

getTotalCount(val){
  var date=new Date()
  var data={
    userId:this.loginData.userId,
    tblName:'deviceData',
    count:val,
    zone:this.general.getZone(date)
  }

  this.api.getLiveDataTotalCount(data).then((res:any)=>{
    // console.log("live data ======",res);
    if(res.status){
      // console.log('\nTotal response: ',res.success[0].count);
      this.currentPageSize= parseInt(res.success[0].count);

    }
  })
}


  refreshData(value,limit=10,offset=0){
    var date=new Date()

    var data={
      userId:this.loginData.userId,
      tblName:'deviceData',
      count:value,
      offset:offset,
      limit:limit,
      zone:this.general.getZone(date)
    }

    this.api.getLiveData(data).then((res:any)=>{
      console.log("live data ======",res);
      this.liveData=[]
      if(res.status){
        for(var i=0;i<res.success.length;i++){
          this.liveData.push({
            i:i+1,
            baseName:res.success[i].baseName,
            contactName:res.success[i].contactName,
            updatedOn:res.success[i].updatedOn,
            totalTime:res.success[i].totalTime,
            startTime:this.general.startTime(res.success[i].totalTime,res.success[i].updatedOn),

          })
        }
        this.currentPageLength = res.success.length;
        this.dataSource = new MatTableDataSource(this.liveData);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          //this.dataSource.paginator = this.paginator;
          this.paginator.length = this.currentPageSize
        })
      }
      else{
        this.dataSource = new MatTableDataSource(this.liveData);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          //this.dataSource.paginator = this.paginator;
          this.paginator.length = this.currentPageSize
        })
      }
    })

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
    date = '05 second'
  }
  return date
}




     getUpdate(event) {
      // console.log("paginator event",event);
      // console.log("paginator event length", this.currentPageLength);
      var limit = event.pageSize
      var offset = event.pageIndex*event.pageSize
      this.refreshData(this.count,limit,offset)
    }


}
