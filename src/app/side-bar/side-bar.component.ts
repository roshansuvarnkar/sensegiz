import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loginData:any
  findData:any=[]
  findDataTemp:any=[]
  checkUrl:any
  dataSource:any
  displayedColumns: string[] = ['i','deviceName'];
  deviceClickStatus:boolean
  totmin:any
  color:any
  time:any
  systime:any
  date2:any
  date1:any
  index:any
  constructor(private api: ApiService,private login:LoginCheckService,private router:Router) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.refreshFinds()
    //this.checkPage()
    setInterval(()=>{this.refreshFinds()},60*1000)

  }


  refreshFinds(){

    var data={
      userId:this.loginData.userId,

    }

    this.api.getAssignedDevices(data).then((res:any)=>{
      console.log("find data side bar ======",res);
      if(res.status){
        this.findData=[]

        this.findData=res.success
        this.findDataTemp=res.success
        this.dataSource = new MatTableDataSource(this.findData)
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        })
      }
    })
  }


  clickDevice(data){
    // console.log("data====",data)
    this.router.navigate(['/device-history'], { queryParams: { record: JSON.stringify(data) } });
  }


  search(a){
    if(a.length>0){
      this.findData = this.findDataTemp.filter(obj=>{
        return (obj.deviceName.toString().toLowerCase().indexOf(a)>-1)
      })
    this.dataSource = new MatTableDataSource(this.findData);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    })
  }
  else{
    this.dataSource = new MatTableDataSource(this.findDataTemp);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    })
  }
}


getColorIcon(a){
  if(a != '0000-00-00 00:00:00'){
    this.date1 = new Date()
    this.date2 = new Date(a)
    const diffTime = Math.abs(this.date2 - this.date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60));
    if(diffDays <= 1440){
      this.color = 'green'
    }
    else if(diffDays > 1440 && diffDays <= 2880){
      this.color = '#ffc107'
    }
    else{
      this.color = '#ef6c00'
    }
    return this.color
  }
  else{
    this.color = "#ef6c00"
    return this.color
  }

}




}
