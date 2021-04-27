import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralMaterialsService } from 'src/app/general-materials.service';
import {ApiService}  from 'src/app/api.service'

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
  dataSource:any=[]
  findData:any=[]
  totalFinds:any;
  displayedColumns: string[] = ['type','count','syncTime'];
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
    });
    this.refreshAnalysticsMore()
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
    console.log("res",data)
    this.api.MoregetSyncedDeviceDataTypes(data).then((res:any)=>{
      console.log("res",res)
      this.findData=[]
      if(res.status){
        //this.adminData=res.success
        for (let i = 0; i <res.success.length; i++) {
          this.findData.push(
            {
              i: i+1,
              type:res.success[i].type,
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
}
