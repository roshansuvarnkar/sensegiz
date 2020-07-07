import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { EditSettingShiftComponent } from '../edit-setting-shift/edit-setting-shift.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  workingForm:FormGroup
  distanceForm:FormGroup
  maxContactForm:FormGroup
  txPowerForm:FormGroup
  inactivityForm:FormGroup
  timeForm:FormGroup
  bufferForm:FormGroup
  wearableForm:FormGroup
  loginData:any
  setting:any
  duration:any
  wearableType:any
  statusCustomise:boolean=false
  minStatus:boolean=false
  inactivityStatusValue:any=[]
  min:any=[0,1,2,3,4,5,6,7,8,9,10]
  sec:any=[0,5,10,15,20,25,30,35,40,45,50,55]



  constructor(public dialog: MatDialog,private fb:FormBuilder,private api:ApiService,private login:LoginCheckService,private general:GeneralMaterialsService) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)

    this.refreshSetting()

    this.workingForm = this.fb.group({
      shift: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required]
    });


    this.distanceForm = this.fb.group({
      distance: ['', Validators.required],
      rssi: [{value:'',disabled: true}, Validators.required],
    });


    this.maxContactForm = this.fb.group({
      threshold: ['', [Validators.required, Validators.min(0)]],
    });


    this.txPowerForm = this.fb.group({
      txPower: [{value:'',disabled: true}, Validators.required],
    });

    this.inactivityForm = this.fb.group({
      inactivity: ['',[Validators.required,Validators.max(120), Validators.min(0)]]
    });

    this.bufferForm = this.fb.group({
      buffer: ['',[Validators.required, Validators.min(0)]]
    })
    this.timeForm=this.fb.group({
      minutes:['',Validators.required],
      seconds:[{value:'',disabled: false},Validators.required]
    })
    this.wearableForm=this.fb.group({
     wearable:['',Validators.required]
   })
  

  }


  
  refreshSetting(){
    var data={
      userId:this.loginData.userId,
      tblName:'deviceSetting'
    }
    this.api.getData(data).then((res:any)=>{
      console.log("setting data page ======",res);
      if(res.status){
        this.setting = res.success[0]
     
        this.duration=res.success[0].durationThreshold
        var minutes = Math.round(this.duration/60);
        var seconds = this.duration%60;

        console.log("min",minutes, seconds)

        this.distanceForm.patchValue({
          distance: res.success[0].distance.toString(),
          rssi: res.success[0].rssi
        })
        this.maxContactForm.patchValue({
          threshold: res.success[0].threshold,
        })
        this.txPowerForm.patchValue({
          txPower: res.success[0].txPower,
        })
        this.inactivityForm.patchValue({
          inactivity: res.success[0].inactivity,
        })
        this.bufferForm.patchValue({
          buffer: res.success[0].buffer,
        })
        this.timeForm.patchValue({
          minutes:minutes,
          seconds:seconds
        })
        if(res.success[0].type==0){
          this.wearableForm.patchValue({
            wearable:"0"
          })
        }else{
          this.wearableForm.patchValue({
            wearable:"1"
          })
        }

        if( res.success[0].inactivityStatus == 1){
          this.inactivityStatusValue = {
            value:true,
            status:'Disable'
          }
        }
        else{
          this.inactivityStatusValue = {
            value:false,
            status:'Enable'
          }
        }
      }
    })
  }


  onSubmitWorkForm(data) {
     if (this.workingForm.valid) {
       try {
        //  console.log("time data===",data)
         data.userId = this.loginData.userId
         this.api.setTime(data).then((res:any)=>{
          //  console.log("time insrted or updated",res)
           if(res.status){
             var msg = 'Shift time updated Successfully'
             this.general.openSnackBar(msg,'')
           }
         })
       } catch (err) {
       }
     }
   }


   onSubmitDistanceForm(data) {
    console.log("data=",data)
  
     if (this.distanceForm.valid) {
       try {
        if(this.setting.type==0){
          if(data.distance == "1" ){
            data.rssi='B9'
          }
          else if(data.distance  == "2" ){
           data.rssi='B5'
          
          }
          else if(data.distance  == "3"){
            data.rssi='AE'
          }
        }
        if(this.setting.type==1){
          if(data.distance  == "1" ){
            data.rssi='A1'
          }
          else if(data.distance  == "2"){
            data.rssi='A2'
          }
          else if(data.distance  == "3"){
            data.rssi='A3'
          }
        }
         data.userId = this.loginData.userId
         console.log("distance ===",data)
         this.api.addDistance(data).then((res:any)=>{
           console.log("distance insrted or updated",res)
           if(res.status){
             this.refreshSetting()
             var msg = 'Minimum distance updated Successfully'
             this.general.openSnackBar(msg,'')
           }
         })
       } catch (err) {
       }
     }
   }


  onSubmitmaxContactForm(data) {
     if (this.maxContactForm.valid) {
       try {
        //  console.log("threshold ===",data)
         data.userId = this.loginData.userId
         this.api.addMaxContactThreshold(data).then((res:any)=>{
          //  console.log("contact threshold insrted or updated",res)
           if(res.status){
             this.refreshSetting()
             var msg = 'Max contact threshold updated Successfully'
             this.general.openSnackBar(msg,'')
           }
         })
       } catch (err) {
       }
     }
   }



  onSubmittxPowerForm(data) {
     if (this.txPowerForm.valid) {
       try {
        //  console.log("threshold ===",data)
         data.userId = this.loginData.userId
         this.api.addTxPower(data).then((res:any)=>{
          //  console.log("tx power updated",res)
           if(res.status){
             this.refreshSetting()
             var msg = 'Transmission power updated Successfully'
             this.general.openSnackBar(msg,'')
           }
         })
       } catch (err) {
       }
     }
   }


   onSubmitInactivityForm(value){

    if (this.inactivityForm.valid) {
      try {
        // console.log("inactivity data==",value)
        var data={
        userId : this.loginData.userId,
        inactivity : value.inactivity

        }

        this.api.getInactivityDeviceSetting(data).then((res:any)=>{
          // console.log("Inactivity response===",res)
          if(res.status){
            this.refreshSetting()
            var msg = 'Inactivity updated Successfully'
            this.general.openSnackBar(msg,'')
          }
        })
      } catch (err) {
      }
    }


   }


   onSubmitBufferForm(value){

    if (this.bufferForm.valid) {
      try {
        // console.log("buffer data==",value)
        var data={
        userId : this.loginData.userId,
        buffer : value.buffer

        }

        this.api.getBufferDeviceSetting(data).then((res:any)=>{
          // console.log("Buffer response===",res)
          if(res.status){
            this.refreshSetting()
            var msg = 'Buffer updated Successfully'
            this.general.openSnackBar(msg,'')
          }
        }).catch(err=>{
          // console.log("err===",err);
        })
      } catch (err) {
      }
    }
   }

   onSubmitTimeForm(value){
    console.log(" time data===",value);

    var minute=value.minutes <=9 && value.minutes >= 0 ?"0"+value.minutes:value.minutes
    var second=value.seconds <=9 && value.seconds >= 0 ?"0"+value.seconds:value.seconds

    var data={
      userId:this.loginData.userId,
      minute:minute.toString(),
      second:second.toString()
     }
    console.log("data==",data)

    this.api.getDurationThreshold(data).then((res:any)=>{
      console.log("duration==",res)
     if(res.status){

       this.refreshSetting()
       var msg = 'Maximum duration threshold updated Successfully'
       this.general.openSnackBar(msg,'')
     }
   })

  }
  getMin(event){
    // console.log("event==",event)
      if(event.value==10){
        this.minStatus=true
        this.timeForm.patchValue({
          seconds:0
        })
      }else{
        this.minStatus=false
      }
      // this.minStatus=event.value==10?true:false
      // this.timeForm.patchValue({
      //   seconds:0
      // })

  }
  //  customise(){
  //    this.statusCustomise = this.statusCustomise == true ? false : true
  //  }
  onSubmitwearableForm(data){

    this.wearableType=data.wearable
    console.log("data===",data.wearable)
    if (this.wearableForm.valid) {
     try {
       if(this.wearableType==0){
         if(this.setting.distance == 1){
           data.rssi='B9'
         }
         else if(this.setting.distance  == 2){
          data.rssi='B5'
         
         }
         else if(this.setting.distance  ==3){
           data.rssi='AE'
         }
       }
       if(this.wearableType==1){
         if(this.setting.distance  == 1){
           data.rssi='A1'
         }
         else if(this.setting.distance  == 2){
           data.rssi='A2'
         }
         else if(this.setting.distance  == 3){
           data.rssi='A3'
         }
       }
      
     
         data.userId=this.loginData.userId,
       
       console.log("data=====",data)
       this.api.updateWearableType(data).then((res:any)=>{
         console.log("wearable type===",res)
         if(res.status){
           this.refreshSetting()
           var msg='Wearable type updated Successfully'
           this.general.openSnackBar(msg,'')
           this.refreshSetting()
         }
       }).catch(err=>{
         console.log("err===",err);
       })
     } catch (err) {
     }
   }

  }
   changeDistance(event){
    //  console.log("event===",event.value)
     if(event.value == 1){
       this.distanceForm.patchValue({
         rssi:'B9'
       })
     }
     else if(event.value == 2){
       this.distanceForm.patchValue({
         rssi:'B5'
       })
     }
     else if(event.value == 3){
       this.distanceForm.patchValue({
         rssi:'AE'
       })
     }
   }

   inactivityChange(event){
     var checked = event.checked == true ? 1 : 2

     var data={
       userId : this.loginData.userId,
       status : checked
     }
    //  console.log("data====",data)
     this.api.updateInactivityStatus(data).then((res:any)=>{
       if(res.status){
         this.refreshSetting()
         var msg = 'Inactivity updated Successfully'
         this.general.openSnackBar(msg,'')
       }
     }).catch(err=>{
      //  console.log("err===",err);
     })
   }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '60vh';
    dialogConfig.width = '70vw';
    dialogConfig.data = {
      type:"shifts"
    }
    const dialogRef = this.dialog.open(EditSettingShiftComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
