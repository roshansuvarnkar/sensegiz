import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
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
  bufferForm:FormGroup
  wearableForm:FormGroup
  timeForm:FormGroup
  scanningForm:FormGroup
  buzzerTimeForm:FormGroup
  buzzerConfigForm:FormGroup
  loginData:any
  setting:any
  duration:any
  wearableType:any
  selected:any='0'
  statusCustomise:boolean=false
  minStatus:boolean=false
  secStatus:boolean=false
  requiredStatus1:boolean=false
  requiredStatus2:boolean=false
  timeFormStatus:boolean=true
  selectedValue:boolean=false
  buzzerConfigStatus:boolean=false
  inactivityStatusValue:any=[]
  coinData:any=[]
  coin:any=[]
  min:any=[]
  sec:any=[]
  // buzzerValue:any=[1,2,3,4,5]

  someValue:any=[]
  constructor(public dialog: MatDialog,private fb:FormBuilder,private api:ApiService,private login:LoginCheckService,private general:GeneralMaterialsService) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.refreshSetting()
    this.maxThresholdMinsec()

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
      minutes:[{value:'',disabled: false},Validators.required],
      seconds:[{value:'',disabled: false},Validators.required]
    })

    this.wearableForm=this.fb.group({
      wearable:['',Validators.required]
    })

    // this.buzzerTimeForm=this.fb.group({
    //   buzzerTime:['',[Validators.required,Validators.max(255), Validators.min(1)]]
    // })

    this.buzzerConfigForm=this.fb.group({
      buzzerConfig:['',Validators.required],
      durationSec:['',[Validators.max(255), Validators.min(10),Validators.pattern(/^\d*[05]$/)]]
    })
    this.scanningForm=this.fb.group({
      seconds:['',[Validators.required,Validators.max(60), Validators.min(1)]],
     
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
        if(res.success[0].durationThreshold<=55){
          this.minStatus=true
          this.timeForm.patchValue({
            minutes:'none',
            seconds:res.success[0].durationThreshold
          })
        }else if(res.success[0].durationThreshold>55){
          this.secStatus=true
          this.timeForm.patchValue({
            seconds:'none',
            minutes:res.success[0].durationThreshold/60,
          })
        }
       
        this.scanningForm.patchValue({
          seconds:res.success[0].scanningInterval.toString()
        })
        // this.buzzerTimeForm.patchValue({
        //   buzzerTime:res.success[0].buzzerTime
        // })
       
          this.wearableForm.patchValue({
            wearable:res.success[0].type.toString()
          })
        
          if(res.success[0].buzzerConfig==5){
            this.buzzerConfigStatus=true
           
            this.buzzerConfigForm.patchValue({
              buzzerConfig:res.success[0].buzzerConfig.toString(),
              durationSec:res.success[0].buzzerTime
            })
          }
          else{
            this.buzzerConfigStatus=false
            this.buzzerConfigForm.patchValue({
              buzzerConfig:res.success[0].buzzerConfig.toString(),
  
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

  maxThresholdMinsec(){
    for(let i =0;i<=10;i++){
      var minutes=i==0?'none':i
      this.min.push(minutes)
     }
    for(let i =0;i<=55;i++){
     var seconds=i==0?'none':i
     this.sec.push(seconds)
    }
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
         console.log("threshold ===",data)
         data.userId = this.loginData.userId
         this.api.addTxPower(data).then((res:any)=>{
           console.log("tx power updated",res)
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


   onSubmitTimeForm(data){
     console.log(" time data===",data);
     
       data.seconds=data.minutes!=="none"?data.minutes*60:data.seconds
    

     var second=data.seconds <=9 && data.seconds >= 0 ?"0"+data.seconds:data.seconds
     var data1={
       userId:this.loginData.userId,
       seconds:second
     }
     console.log("data1==",data1)

     this.api.getDurationThreshold(data1).then((res:any)=>{
       console.log("duration==",res)
      if(res.status){

        this.refreshSetting()
        var msg = 'Minimum duration threshold updated Successfully'
        this.general.openSnackBar(msg,'')
      }
    })

   }


   onSubmitwearableForm(data){

     this.wearableType=data.wearable
     console.log("data===",data)
     if (this.wearableForm.valid) {
      try {
        if(this.wearableType=="0"){
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
        if(this.wearableType=="1"){
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

  onSubmitbuzzerConfigForm(data){
    console.log("data==",data)
    data.durationSec=data.buzzerConfig>0 && data.buzzerConfig<=4?0:data.durationSec
    console.log("data==",data)

    if (this.buzzerConfigForm.valid) {
      try {
        data.userId=this.loginData.userId
        this.api.updateBuzzerConfig(data).then((res:any)=>{
          console.log("buzzer congig===",res)
          if(res.status){
            this.refreshSetting()
            var msg='Buzzer configured Successfully'
            this.general.openSnackBar(msg,'')
          }
        }).catch(err=>{
          console.log("err===",err);
        })
      } catch (err) {
      }
    }
  }

  onSubmitScanningForm(data){
    console.log("data==",data)
    if (this.scanningForm.valid) {
      try {
        data.userId=this.loginData.userId
        this.api.updateScanningInterval(data).then((res:any)=>{
          console.log("Scanning Interval===",res)
          if(res.status){
            this.refreshSetting()
            var msg='Interval second Successfully'
            this.general.openSnackBar(msg,'')
          }
        }).catch(err=>{
          console.log("err===",err);
        })
      } catch (err) {
      }
    }
  
  }

  getBuzzerValue(event){
    console.log("event==",event)
   if(event.value == 5){
     this.buzzerConfigStatus=true
     this.buzzerConfigForm.patchValue({
      durationSec:10
    })
   
   }else if(event.value !== 5){
    this.buzzerConfigStatus=false
   }
    

  }
     customise(){
     this.statusCustomise = this.statusCustomise == true ? false : true
   }

  getMin(event){
    console.log("event==",event)
    if(event.value=="none"){
      this.minStatus=true
      this.secStatus=false
      this.requiredStatus1=false
      this.requiredStatus2=true
      this.timeFormStatus=true

     
    }
    else{
      this.minStatus=false
      this.secStatus=true
      this.requiredStatus1=true
      this.requiredStatus2=false
      this.timeFormStatus=false
     
     
    }
   
  }

  getSec(event){
    if(event.value=="none"){
      this.minStatus=false
      this.secStatus=true
      this.requiredStatus1=true
      this.requiredStatus2=false
      this.timeFormStatus=true

    }
    else{
      this.minStatus=true
      this.secStatus=false
      this.requiredStatus1=false
      this.requiredStatus2=true
      this.timeFormStatus=false
     

    }
   
  }







   changeDistance(event){
    //  console.log("event===",event.value)
      // this.refreshSetting()
      console.log("hii")
      if(this.setting.type==0){
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
      if(this.setting.type==1){
        if(event.value == 1){
          this.distanceForm.patchValue({
            rssi:'A1'
          })
        }
        else if(event.value == 2){
          this.distanceForm.patchValue({
            rssi:'A2'
          })
        }
        else if(event.value == 3){
          this.distanceForm.patchValue({
            rssi:'A3'
          })
        }
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
