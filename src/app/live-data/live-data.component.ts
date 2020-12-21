import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralMaterialsService } from '../general-materials.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timestamp } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import * as moment from 'moment'


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
limit:any
offset:any
pageSet:any=10
pageIndex:any=0
language:any
displayedColumns: string[] = ['i','baseName','contactName','startTime', 'updatedOn','totalTime'];
selectMin:FormGroup
totTime:any=[]
  constructor(
    private api: ApiService,
    private login:LoginCheckService,
    private general:GeneralMaterialsService,
    private router:Router,
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.language=this.loginData.language
    console.log("language==",this.language)
    this.selectMin=this.fb.group({
      minute:['null']
    })
    this.refreshData(this.count)
    this.getTotalCount(0)
    // console.log("count",this.count)
    this.timeout=setInterval(()=>{ this.refresh()},30*1000)
  }
  ngOnDestroy() {
    clearInterval(this.timeout)
  }

  refresh(){
    console.log("pagination==",this.pageSet,this.pageIndex)
    this.refreshData(this.count,this.pageSet,this.pageIndex)
    this.getTotalCount(this.count)
  }
    prevDayData(){
      // var limit=this.paginator.pageSize
      // var offset=this.paginator.pageIndex*this.paginator.pageSize
      this.liveData=[]
      this.paginator.pageIndex=0
      this.paginator.pageSize=10
      this.pageSet=10
      this.pageIndex=0
      this.count = this.count + 1;
      // console.log("count==",this.count);
  
      this.getTotalCount(this.count)
      this.refreshData(this.count)
    }
  
    nextDayData(){
      this.liveData=[]
      this.paginator.pageIndex=0
  
      this.paginator.pageSize=10
      this.pageSet=10
      this.pageIndex=0
      // var limit=this.pagi=nator.pageSize
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
      console.log('\nTotal response: ',res.success[0].count);
      this.currentPageSize= parseInt(res.success[0].count);
     

    }
  })
}


  refreshData(value,limit=10,offset=0){
    this.liveData=[]
    var date=new Date()
    var data={
      userId:this.loginData.userId,
      tblName:'deviceData',
      count:value,
      zone:this.general.getZone(date),
      offset:offset,
      limit:limit
    }
   

    this.api.getLiveData(data).then((res:any)=>{
    
      console.log("live data ======",res);
      if(res.status){
        this.liveData=[]
        this.totTime=[]
          // if(this.selectMin.get('minute').value=='null' || this.selectMin.get('minute').value==0){
            this.totTime=res.success
          for(var i=0;i<res.success.length;i++){
            this.liveData.push({
              i:i+1,
              baseName:res.success[i].baseName,
              contactName:res.success[i].contactName,
              updatedOn:res.success[i].updatedOn,
              totalTime:res.success[i].totalTime,
              startTime:this.general.startTime(res.success[i].totalTime,res.success[i].updatedOn)
            })
          }
          // this.currentPageLength = res.success.length;
          this.dataSource = new MatTableDataSource(this.liveData);
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            //this.dataSource.paginator = this.paginator;
            // this.paginator.length = this.currentPageSize
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
      else if(res.success==false){
        this.liveData=[]
        this.dataSource = new MatTableDataSource(this.liveData);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          //this.dataSource.paginator = this.paginator;
          // this.paginator.length = this.currentPageSize
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

// startTime(data1,data2){
//   console.log(data1,data2)
//   var date=new Date(data2)
//   if(data1!="00:00:00" || data1!='-'){
//     var a=data1.split(':')
//     date.setHours(date.getHours() -a[0]);
//     date.setMinutes(date.getMinutes() - a[1]); 
//     date.setSeconds(date.getSeconds() - a[2]); 
//     console.log("new date==",date)
//   }
//   if(data1=="00:00:00" || data1=='-'){
//     date.setSeconds(date.getSeconds() - 5); 
//   }

//   return date
// }

getUpdate(event) {
  console.log("paginator event",event);
  // console.log("paginator event length", this.currentPageLength);
 this.limit = event.pageSize
  this.offset = event.pageIndex*event.pageSize
  this.pageSet=event.pageSize
  this.pageIndex=event.pageIndex*event.pageSize
  // console.log("this.pageSet===",this.pageSet, "   this.pageSet===",this.pageIndex)
  this.refreshData(this.count,this.limit,this.offset)
  this.getTotalCount(this.count)
}

  filterTotTime(event){
      console.log("event value===",event,"  tot===", this.totTime)
      var arr=[]
      
    if(event.value !="0" && this.selectMin.get('minute').value!=''){
  
        console.log("tot===", this.totTime)
        this.totTime.filter((obj,index)=>{
      
          if((parseInt(obj.totalTime.split(':')[1])>=parseInt(event.value) )|| (parseInt(obj.totalTime.split(':')[1])>=parseInt(this.selectMin.get('minute').value))){
          arr.push({
          
              baseName:obj.baseName,
              contactName:obj.contactName,
              updatedOn:obj.updatedOn,
              startTime:this.general.startTime(obj.totalTime,obj.updatedOn),
              totalTime:obj.totalTime
        
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
    else{
      this.refreshData(this.count,this.limit,this.offset)
    }
  
    
  }
}
