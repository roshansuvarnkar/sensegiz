import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralMaterialsService } from 'src/app/general-materials.service';
import {ApiService}  from 'src/app/api.service'
import { query } from '@angular/animations';

@Component({
  selector: 'app-admin-analystics-more',
  templateUrl: './admin-analystics-more.component.html',
  styleUrls: ['./admin-analystics-more.component.css']
})
export class AdminAnalysticsMoreComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  loginData:any
  currentPageLength:any=10
  currentPageSize:any=10
  userData: any;
  from:any
  to:any;
  dataSource:any=[]
  findData:any=[]
  totalFinds:any;
  displayedColumns: string[] = ['i','typeName','count','syncTime'];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private general:GeneralMaterialsService,
    private api:ApiService
  ) {

   }

  ngOnInit(): void {
       this.route.queryParams.subscribe((res) => {
       this.userData = JSON.parse(res.more);
       this.from=this.userData.fromDate,
       this.to=this.userData.toDate
       this.refreshAnalysticsMore()
       this.getAnlysticsCount()
    });

  }
  refreshAnalysticsMore(limit=10,offset=0){

    var date=new Date()
     var data={
      userId:this.userData.userId ,
      deviceId:this.userData.deviceId,
      limit:limit,
      offset:offset,
      fromDate:this.userData.fromDate,
      toDate:this.userData.toDate,
      zone:this.general.getZone(date)
    }
    //console.log("res",data)
    this.api.MoregetSyncedDeviceDataTypes(data).then((res:any)=>{
     // console.log("res",res)
      this.findData=[]
      if(res.status){
        //this.adminData=res.success
        for (let i = 0; i <res.success.length; i++) {
          this.findData.push(
            {
              i: i+1,
              typeName:res.success[i].typeName,
              count:res.success[i].count,
              syncTime:res.success[i].syncTime
          });
          this.totalFinds=res.success[0].deviceName;
        }
        this.dataSource = new MatTableDataSource(this.findData);
        setTimeout(() => {
         this.dataSource.sort = this.sort;
       // this.dataSource.paginator = this.paginator;
         // this.paginator.length = this.currentPageSize
      })
        }
    })
  }
  getUpdate(event) {
    // console.log("paginator event",event);
    // console.log("paginator event length", this.currentPageLength);
    var limit = event.pageSize
    var offset = event.pageIndex*event.pageSize
   // console.log("limit==",limit,"offset==",offset)
    this.refreshAnalysticsMore(limit,offset)
  }
  getAnlysticsCount(){
    var date=new Date()
    var data={
     userId:this.userData.userId ,
     deviceId:this.userData.deviceId,
     fromDate:this.userData.fromDate,
     toDate:this.userData.toDate,
     zone:this.general.getZone(date)
   }
   this.api.getSyncedDeviceDataTypesCount(data).then((res:any)=>{
    //console.log(res)
     if(res.success){
      this.currentPageLength = parseInt(res.success[0].count);
     // console.log(this.currentPageLength)
     }else{
      this.currentPageLength = parseInt(res.success[0].count);
     }

   })

  }
  backwordarrow(){
    this.router.navigate(['/admin-Analystics'], {
      queryParams: { user: JSON.stringify( this.userData)},
    });

  }
  download(){
    var fileName=''
    var date=new Date()
    var data={
     userId:this.userData.userId ,
     deviceId:this.userData.deviceId,
     fromDate:this.userData.fromDate,
     toDate:this.userData.toDate,
     zone:this.general.getZone(date)
   }
   fileName="Analystic Data"
   //console.log(data ,fileName)
   this.api.analysticMoreDownloadReport(data , fileName).then((res:any)=>{
    //console.log("res",res)
   })

  }
}
