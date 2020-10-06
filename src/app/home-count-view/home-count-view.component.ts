import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { GeneralMaterialsService } from '../general-materials.service';

import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-home-count-view',
  templateUrl: './home-count-view.component.html',
  styleUrls: ['./home-count-view.component.css']
})
export class HomeCountViewComponent implements OnInit {
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

findData:any=[]
loginData:any
type:any
data:any
activeData:any
infectedData:any
onlineData:any
offlineData:any
deviceName:any
dataSource:any
index:any
pageIndex:any
pagesize:any
displayedColumns: string[] = ['i', 'deviceId', 'deviceName'];

  constructor(private api: ApiService,
    private login:LoginCheckService,
    private general:GeneralMaterialsService,
    public dialogRef: MatDialogRef<HomeCountViewComponent>,
    @Inject(MAT_DIALOG_DATA)  data,) {
        this.type=data.type
        // console.log("type==",this.type)
   }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.loadData()
  }
 

  loadData(){
    var date=new Date()
    var data={}
    if(this.type=='activeUserData'){

       data={
        userId:this.loginData.userId,
        type:'active',
      }
      console.log("data===",data)

      this.api.getHomeCountData(data).then((res:any)=>{
        if(res.status){
          this.activeData=res.success
          this.dataSource = new MatTableDataSource(this.activeData);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;

          })

        }
      })

    }

    if(this.type == 'infectedUserData'){
     data={
        userId:this.loginData.userId,
        type:'infected',
      }
      console.log("data===",data)

      this.api.getHomeCountData(data).then((res:any)=>{
        if(res.status){
          this.infectedData=res.success
          this.dataSource = new MatTableDataSource(this.infectedData);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;

          })

        }
      })

    }
    if(this.type == 'onlineUserData'){
     data={
        userId:this.loginData.userId,
        type:'onlineUserData',
        zone:this.general.getZone(date)

      }
      console.log("data===",data)

      this.api.getOnlineCount(data).then((res:any)=>{
        console.log("online==",res)
        if(res.status){
          this.onlineData=res.success
          this.dataSource = new MatTableDataSource(this.onlineData);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;

          })

        }
      })

    }
    if(this.type == 'offlineUserData'){
     data={
        userId:this.loginData.userId,
        type:'offlineUserData',
        zone:this.general.getZone(date)
      }
      console.log("data===",data)

      this.api.getOnlineCount(data).then((res:any)=>{
        console.log("offline==",res)
        if(res.status){
          this.offlineData=res.success
          this.dataSource = new MatTableDataSource(this.offlineData);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;

          })

        }
      })

    }
  }

}
