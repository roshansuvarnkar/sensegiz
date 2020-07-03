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
  loginData:any
  setting:any
  statusCustomise:boolean=false
  inactivityStatusValue:any=[]
  min:any=[0,1,2,3,4,5,6,7,8,9,10]
  sec:any=[0,5,10,15,20,25,30,35,40,45,50,55]
  minStatus:boolean=false
  duration:any
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
      rssi: ['', Validators.required],
    });


    this.maxContactForm = this.fb.group({
      threshold: ['', [Validators.required, Validators.min(0)]],
    });


    this.txPowerForm = this.fb.group({
      txPower: ['', Validators.required],
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

  }


  refreshSetting(){
    var data={
      userId:this.loginData.userId,
      tblName:'deviceSetting'
    }
    this.api.getData(data).then((res:any)=>{
      //console.log("setting data page ======",res);
      if(res.status){
        this.setting = res.success[0]
        
        this.duration=res.success[0].durationThreshold
        var minutes = Math.round(this.duration/60);
        var seconds = this.duration%60;

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
     if (this.distanceForm.valid) {
       try {
        //  console.log("distance ===",data)
         data.userId = this.loginData.userId
         this.api.addDistance(data).then((res:any)=>{
          //  console.log("distance insrted or updated",res)
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
