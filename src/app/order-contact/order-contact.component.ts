import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-order-contact',
  templateUrl: './order-contact.component.html',
  styleUrls: ['./order-contact.component.css']
})
export class OrderContactComponent implements OnInit {
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['i','baseName', 'contactName', 'updatedOn'];
	order:any=0
  dataSource:any
	dataSet:any=[]
	from:Date
  to:Date
  orderShow:any
  currentPageLength:any=10
  currentPageSize:any=10
  orderType:any=[
  		{
  			id:2,
  			name:"Second level order"
  		},
  		{
  			id:3,
  			name:"Third level order"
  		},
  		{
  			id:4,
  			name:"Fourth level order"
  		},
  		{
  			id:5,
  			name:"Fifth level order"
  		},
  		{
  			id:6,
  			name:"Sixth level order"
  		},
  		{
  			id:7,
  			name:"Seventh level order"
  		},
  		{
  			id:8,
  			name:"Eighth level order"
  		},
  		{
  			id:9,
  			name:"Ninth level order"
  		},
  	]
    constructor(
      public dialog: MatDialog,
      private api: ApiService,
      private login:LoginCheckService,
      private router:Router,
      public dialogRef: MatDialogRef<OrderContactComponent>,
       @Inject(MAT_DIALOG_DATA)  data,
    ) {
      this.order=data.order
      this.dataSet=data.data
      this.from = data.fromDate
      this.to = data.toDate
      // console.log("data from===",data)
      // console.log("data set===",this.dataSet)
      this.orderShow = this.orderType.filter(obj=>{
      	return obj.id==this.order
      })
      this.getTotalLength()
      this.onSubmitFindName()
    }

  ngOnInit(): void {
  }


  getTotalLength(){
    var data={
      userId:this.dataSet.userId,
      deviceName:this.dataSet.contactName,
      fromDate:this.from,
      toDate:this.to,
    }

    this.api.getHistoryNameReportTotalCount(data).then((res:any)=>{
      // console.log("length of report on device name ======",res);
      if(res.status){
        // console.log('\nTotal response: ',res.success[0].count);
        this.currentPageLength = parseInt(res.success[0].count);

      }
    })
  }


   onSubmitFindName(limit=10,offset=0){
    // console.log("data====",this.dataSet)
    var value={
      userId:this.dataSet.userId,
      deviceName:this.dataSet.contactName,
      fromDate:this.from,
      toDate:this.to,
      limit:limit,
      offset:offset
    }
      // console.log("value data ======",value);

    this.api.getDeviceHistoryBasedOnDeviceName(value).then((res:any)=>{
      // console.log("order data ======",res);
      if(res.status){
      	this.dataSource = new MatTableDataSource(res.success);
	    setTimeout(() => {
	      this.dataSource.sort = this.sort;
	      //this.dataSource.paginator = this.paginator;

	    })
      }
    })
  }

   orderContactOpen(a){
   this.order = parseInt(this.order) + 1
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '90vh';
    dialogConfig.width = '75vw';
    dialogConfig.data = {
      data:a,
      order:this.order,
      fromDate : this.from,
      toDate : this.to
    }
    const dialogRef = this.dialog.open(OrderContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  getUpdate(event) {
    // console.log("paginator event",event);
    // console.log("paginator event length", this.currentPageLength);
    var limit = event.pageSize
    var offset = event.pageIndex*event.pageSize
    // console.log("limit==",limit,"offset==",offset)
    this.onSubmitFindName(limit,offset)
  }


}
