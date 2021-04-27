import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralMaterialsService } from 'src/app/general-materials.service';
import {ApiService}  from 'src/app/api.service'

@Component({
  selector: 'app-admin-analystics',
  templateUrl: './admin-analystics.component.html',
  styleUrls: ['./admin-analystics.component.css']
})
export class AdminAnalysticsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  loginData:any
  currentPageLength:any=10
  currentPageSize:any=10
  userData: any;
  dataSource:any=[]
  findData:any=[]
  totalFinds:any;
  displayedColumns: string[] = ['i','deviceName', 'latestSyncTime', 'count','syncTime','more'];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private general:GeneralMaterialsService,
    private api:ApiService
  ) {

   }

  ngOnInit(): void {
       this.route.queryParams.subscribe((res) => {
      this.userData = JSON.parse(res.user);
    });
    this.refreshAnalystics()
  }
  refreshAnalystics(limit=10,offset=0){
    var date=new Date()
     var data={
      userId:this.userData.userId ,
      limit:limit,
      offset:offset,
      fromDate:this.userData.fromDate,
      toDate:this.userData.toDate,
      zone:this.general.getZone(date)
    }
    this.api.getSyncedDeviceDetails(data).then((res:any)=>{
      this.findData=[]
		if(res.status){
			//this.adminData=res.success
      for (let i = 0; i <res.success.length; i++) {
        this.findData.push(
          {
            i: i+1,
            deviceId:res.success[i].deviceId,
            deviceName:res.success[i].deviceName,
            latestSyncTime:res.success[i].latestSyncTime,
            count:res.success[i].count,
            syncTime:res.success[i].syncTime
        });
        this.totalFinds=res.success.length;
      }
      this.dataSource = new MatTableDataSource(this.findData);
      setTimeout(() => {
       this.dataSource.sort = this.sort;
     // this.dataSource.paginator = this.paginator;
       // this.paginator.length = this.currentPageSize
    })
      }
      //console.log("res",res)
    })

  }
  getUpdate(event) {
    // console.log("paginator event",event);
    // console.log("paginator event length", this.currentPageLength);
    var limit = event.pageSize
    var offset = event.pageIndex*event.pageSize
   // console.log("limit==",limit,"offset==",offset)
    this.refreshAnalystics(limit,offset)
  }
  openMore(values){
    var data={
      userId:this.userData.userId ,
      fromDate:this.userData.fromDate,
      toDate:this.userData.toDate,
      deviceId:values.deviceId
    }

/*  this.router.navigate(['admin-more'],{queryParams:{record:JSON.stringify(data)}}) */
this.router.navigate(['/admin-more'], {
  queryParams: { more: JSON.stringify(data)},
});
  }
}
