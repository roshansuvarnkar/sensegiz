import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { HistoryReportComponent } from '../history-report/history-report.component';
import { OrderContactComponent } from '../order-contact/order-contact.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
loginData:any
findIdForm:FormGroup
findNameForm:FormGroup
summaryReportForm:FormGroup
dateForm:FormGroup
finds:any=[]
prevDate:any
username:any

  constructor(public dialog: MatDialog,
              private fb:FormBuilder,
              private api:ApiService,
              private login:LoginCheckService,
              private general:GeneralMaterialsService
            ) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)



    this.dateForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });


    this.findIdForm = this.fb.group({
      selectedValue: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });


    this.findNameForm = this.fb.group({
      deviceName: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });

    this.summaryReportForm = this.fb.group({
      deviceName: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });

    this.refreshFinds()

  }


  onclickDate(data){
    // console.log("data==",data)

    var date = new Date();
    var toDate = new Date();
    var prevDate = date.setDate(date.getDate() - data);

    var date = new Date(prevDate);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    var tot = year + '-' + month + '-'  + day

    var todayDate = toDate.getFullYear() + '-' +  ("0" + (toDate.getMonth() + 1)).slice(-2) + '-'  + ("0" + toDate.getDate()).slice(-2)

    this.dateForm.patchValue({
      fromDate:tot,
      toDate:todayDate
    })
  }


onclickFindId(data){
  // console.log("data==",data)

  var date = new Date();
  var toDate = new Date();
  var prevDate = date.setDate(date.getDate() - data);

  var date = new Date(prevDate);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  var tot = year + '-' + month + '-'  + day

  var todayDate = toDate.getFullYear() + '-' +  ("0" + (toDate.getMonth() + 1)).slice(-2) + '-'  + ("0" + toDate.getDate()).slice(-2)

   this.findIdForm.patchValue({
      fromDate:tot,
      toDate:todayDate
    })
 }




onclickFindName(data){
  // console.log("data==",data)

  var date = new Date();
  var toDate = new Date();
  var prevDate = date.setDate(date.getDate() - data);

  var date = new Date(prevDate);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  var tot = year + '-' + month + '-'  + day

  var todayDate = toDate.getFullYear() + '-' +  ("0" + (toDate.getMonth() + 1)).slice(-2) + '-'  + ("0" + toDate.getDate()).slice(-2)

  this.findNameForm.patchValue({
      fromDate:tot,
      toDate:todayDate
  })

}

onclickSummaryReport(data){
  // console.log("data==",data)

  var date = new Date();
  var toDate = new Date();
  var prevDate = date.setDate(date.getDate() - data);

  var date = new Date(prevDate);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  var tot = year + '-' + month + '-'  + day

  var todayDate = toDate.getFullYear() + '-' +  ("0" + (toDate.getMonth() + 1)).slice(-2) + '-'  + ("0" + toDate.getDate()).slice(-2)

   this.summaryReportForm.patchValue({
      fromDate:tot,
      toDate:todayDate
    })
}

  refreshFinds(){
    var data={
      userId:this.loginData.userId,
      tblName:'deviceRegistration'
    }
    this.api.getData(data).then((res:any)=>{
      // console.log("find data ======",res);
      if(res.status){
        this.finds=res.success
      }
    })
  }

  onSubmitDateForm(data){
     // console.log("data====",data)
         var date1=new Date(data.fromDate)
         var date2=new Date(data.toDate)
         var year = date1.getFullYear();
         var month = ("0" + (date1.getMonth() + 1)).slice(-2);
         var day = ("0" + date1.getDate()).slice(-2);
         var from = year + '-' + month + '-'  + day

         var year1 = date2.getFullYear();
         var month1 = ("0" + (date2.getMonth() + 1)).slice(-2);
         var day1 = ("0" + date2.getDate()).slice(-2);
         var to = year1 + '-' + month1 + '-'  + day1

         const dialogConfig = new MatDialogConfig();
         dialogConfig.disableClose = true;
         dialogConfig.autoFocus = true;
         dialogConfig.height = '90vh';
         dialogConfig.width = '75vw';
         dialogConfig.data = {
           type:"basedOnDate",
           fromDate:from,
           toDate:to,
         }
         const dialogRef = this.dialog.open(HistoryReportComponent, dialogConfig);

         dialogRef.afterClosed().subscribe(result => {
           this.refreshFinds()
         });

   }



  // onSubmitFindId(data){
  //   console.log("data====",data)

  //       const dialogConfig = new MatDialogConfig();
  //       dialogConfig.disableClose = true;
  //       dialogConfig.autoFocus = true;
  //       dialogConfig.height = '90vh';
  //       dialogConfig.width = '75vw';
  //       dialogConfig.data = {
  //         type:"basedOnFindId",
  //         valueSelected:data.selectedValue,
  //         fromDate:data.fromDate,
  //         toDate:data.toDate,
  //       }
  //       const dialogRef = this.dialog.open(HistoryReportComponent, dialogConfig);

  //       dialogRef.afterClosed().subscribe(result => {
  //         this.refreshFinds()
  //       });

  // }



  onSubmitFindName(data){
    // console.log("data====",data)
        var date1=new Date(data.fromDate)
        var date2=new Date(data.toDate)
        var year = date1.getFullYear();
        var month = ("0" + (date1.getMonth() + 1)).slice(-2);
        var day = ("0" + date1.getDate()).slice(-2);
        var from = year + '-' + month + '-'  + day

        var year1 = date2.getFullYear();
        var month1 = ("0" + (date2.getMonth() + 1)).slice(-2);
        var day1 = ("0" + date2.getDate()).slice(-2);
        var to = year1 + '-' + month1 + '-'  + day1

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '90vh';
        dialogConfig.width = '75vw';
        dialogConfig.data = {
          type:"basedOnFindName",
          deviceName:data.deviceName,
          fromDate:from,
          toDate:to,
        }
        const dialogRef = this.dialog.open(HistoryReportComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          this.refreshFinds()
        });

  }


  onSubmitSummaryReport(data){
    // console.log("data====",data)
        var date1=new Date(data.fromDate)
        var date2=new Date(data.toDate)
        var year = date1.getFullYear();
        var month = ("0" + (date1.getMonth() + 1)).slice(-2);
        var day = ("0" + date1.getDate()).slice(-2);
        var from = year + '-' + month + '-'  + day

        var year1 = date2.getFullYear();
        var month1 = ("0" + (date2.getMonth() + 1)).slice(-2);
        var day1 = ("0" + date2.getDate()).slice(-2);
        var to = year1 + '-' + month1 + '-'  + day1

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '90vh';
        dialogConfig.width = '75vw';
        dialogConfig.data = {
          type:"summaryReport",
          deviceName:data.deviceName,
          fromDate:from,
          toDate:to,
        }
        const dialogRef = this.dialog.open(HistoryReportComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          this.refreshFinds()
        });

  }

  userSuggestion(event){
    console.log("data=",event)
   
    var data={
      value:event.target.value,
      userId:this.loginData.userId,
      tblName:'deviceData'

    }
    console.log("data==",data)
    this.api.getUsernameSuggestion(data).then((res:any)=>{
      console.log("res==",res)
      if(res.status){
        this.username=[]
       for(let i=0;i<res.success.length;i++){
        this.username.push(res.success[i].baseDeviceName)
       }
       console.log("username==",this.username)

      }
    })
    
  }

  infectedSuggestion(event){
    console.log("data=",event)
   
    var data={
      value:event.target.value.toString(),
      userId:this.loginData.userId,
      tblName:'deviceRegistration'

    }
    console.log("data==",data)
    this.api.getUsernameSuggestion(data).then((res:any)=>{
      console.log("res==",res)
      if(res.status){
        this.username=[]
       for(let i=0;i<res.success.length;i++){
        this.username.push(res.success[i].deviceName)
       }
       console.log("username==",this.username)
      }
    })

  }



}
