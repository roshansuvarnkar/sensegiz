import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import { EditSettingShiftComponent } from '../edit-setting-shift/edit-setting-shift.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';


@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  txPowerForm:FormGroup
  distanceForm:FormGroup
  scanningForm:FormGroup
  timeForm:FormGroup
  bufferForm:FormGroup
  workingForm:FormGroup
  setting:any=[]
  min:any=[]
  sec:any=[]
  dataGet:any
  languageForm:FormGroup
  statusCustomise:boolean=false
  selectedValue:boolean=false
  selectStatus1:boolean=false
  selectStatus2:boolean=false
  minStatus:boolean=false
  secStatus:boolean=false
  requiredStatus1:boolean=false
  requiredStatus2:boolean=false
  timeFormStatus:boolean=true
  bufferValue:boolean=false
  multipleShift:boolean=false
  constructor(private fb:FormBuilder,public dialog: MatDialog,private api:ApiService,private login:LoginCheckService,private general:GeneralMaterialsService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bufferForm = this.fb.group({
      buffer: ['',[Validators.required, Validators.min(0)]]
    })

    this.txPowerForm = this.fb.group({
      txPower: ['', Validators.required],
    });
    this.distanceForm = this.fb.group({
      distance: ['', Validators.required],
      rssi: ['',Validators.pattern(/^[A-Z][A-Z 0-9]{1}$/)],
      wearable:['',Validators.required],
      customize:['']
    });
    this.scanningForm=this.fb.group({
      seconds:['',[Validators.required,Validators.max(60), Validators.min(1)]],

    })
    this.timeForm=this.fb.group({
      minutes:[{value:'',disabled: false},Validators.required],
      seconds:[{value:'',disabled: false},Validators.required]
    })
    
    this.workingForm = this.fb.group({
      shift: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required]
    });
    this.languageForm = this.fb.group({
      language: ['', Validators.required],
    });
    this.route.queryParams.subscribe(params => {
      this.dataGet = JSON.parse(params.record) ;
      // console.log("data==",this.dataGet.userId)
  })
  this. refreshSetting()
  this.minThresholdMinsec()

  }

  refreshSetting(){
    var data={
      userId:this.dataGet.userId,
      tblName:'deviceSetting'
    }
    console.log("data get==",data)
    this.api.getData(data).then((res:any)=>{
      console.log("setting data page ======",res);
      if(res.status){
        this.setting = res.success[0]

        this.distanceForm.patchValue({
          distance: res.success[0].distance.toString(),
          rssi: res.success[0].rssi,
          wearable:res.success[0].type.toString()
        })
        this.bufferForm.patchValue({
          buffer: res.success[0].buffer,
        })
        if(res.success[0].durationThreshold<=55){
          this.minStatus=true
          this.timeFormStatus=false
          this.timeForm.patchValue({
            minutes:'none',
            seconds:(res.success[0].durationThreshold).toString()
          })
        }else if(res.success[0].durationThreshold>55){
          this.secStatus=true
          this.timeFormStatus=false
          this.timeForm.patchValue({
            seconds:'none',
            minutes:res.success[0].durationThreshold/60,
          })
        }
       
        this.txPowerForm.patchValue({
          txPower: res.success[0].txPower,
        })
        this.scanningForm.patchValue({
          seconds:res.success[0].scanningInterval.toString()
        })
        this.languageForm.patchValue({
          language:res.success[0].language.toString()
        })

      }
    })
  }

  minThresholdMinsec(){
    var seconds=''
    for(let i =0;i<=5;i++){
      var minutes=i==0?'none':i
      this.min.push(minutes)
     }
    for(let i =-1;i<=11;i++){
      if(i==1|| i==2 || i==3){
      }
      else{
        if(i==-1){
          seconds='none'
        }
        else{
         seconds=(i*5).toString()
        }
        this.sec.push(seconds)
      }
    }
  }

  customizeoff(){
    this.statusCustomise=false
    this.distanceForm.patchValue({
      customize:0,
    })
  }
  // onSubmitDistanceForm(data) {
  //   if (this.distanceForm.valid) {
  //     try {
  //       console.log("distance ===",data)
  //       data.userId = this.dataGet.userId
  //       this.api.addDistance(data).then((res:any)=>{
  //         console.log("distance inserted or updated",res)
  //         if(res.status){
  //           this.refreshSetting()
  //           var msg = 'Minimum distance updated Successfully'
  //           this.general.openSnackBar(msg,'')
  //         }
  //       })
  //     } catch (err) {
  //     }
  //   }
  // }

  onSubmitDistanceForm(data) {
    console.log("data=",data)

     if (this.distanceForm.valid) {
       try {
         var value={}
         data.customize=data.customize==''?0:data.customize
        if(data.customize==1){
          value={
            userId:this.dataGet.userId,
            type:data.wearable,
            distance:data.distance,
            customize:data.customize,
            rssi:data.rssi
          }
        }
        else{
          value={
            userId:this.dataGet.userId,
            type:data.wearable,
            distance:data.distance,
            customize:data.customize,
           
            }
        }
         console.log("distance ===",value,data)
         this.api.setDeviceRssi(value).then((res:any)=>{
           console.log("distance insrted or updated",res)
           if(res.status){
            var msg = 'Minimum distance and wearable type updated Successfully'
            this.general.openSnackBar(msg,'')
            this.refreshSetting()
        //      this.api.updateWearableType(value).then((res:any)=>{
        //      if(res.status){
        //       console.log("type",res)
        //       var msg = 'Minimum distance and wearable type updated Successfully'
        //      this.general.openSnackBar(msg,'')
        //      this.refreshSetting()
        //      }

             
        //  })
        }
        })
       } catch (err) {
       }
     }
   }

  
  onSubmittxPowerForm(data) {
    if (this.txPowerForm.valid) {
      try {
        // console.log("threshold ===",data)
        data.userId = this.dataGet.userId
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


  customise(event){
    console.log("event===",event)
    this.statusCustomise = this.statusCustomise == true ? false : true
    this.distanceForm.patchValue({
      customize:event.checked==true?1:0
    })
  }
  onclick(event){
    this.distanceForm.reset()
    this.selectedValue=event.value==1?false:true
     
  }

  changeDistance(event){
    
    if(this.setting.type==0){
      if(event.value == 1 ){
        this.distanceForm.patchValue({
          rssi:'BE'
        })
      }
      else if(event.value == 2){
        this.distanceForm.patchValue({
          rssi:'BC'
        })
      }
      else if(event.value == 3){
        this.distanceForm.patchValue({
          rssi:'B6'
        })
      }
    }
    else if(this.setting.type==1){
      if(event.value == 1 ){
        this.distanceForm.patchValue({
          rssi:'AC'
        })
      }
      else if(event.value == 2){
        this.distanceForm.patchValue({
          rssi:'A9'
        })
      }
      else if(event.value == 3){
        this.distanceForm.patchValue({
          rssi:'A5'
        })
      }
    }
  }
  onSubmitScanningForm(data){
    // console.log("data==",data)
    if (this.scanningForm.valid) {
      try {
        data.userId=this.dataGet.userId
        this.api.updateScanningInterval(data).then((res:any)=>{
          // console.log("Scanning Interval===",res)
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


  onSubmitTimeForm(data){
    //  console.log(" time data===",data);

       data.seconds=data.minutes!=="none"?data.minutes*60:data.seconds



     var second=data.seconds <=9 && data.seconds >= 0 ?"0"+data.seconds:data.seconds
     var data1={
       userId:this.dataGet.userId,
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
   onSubmitWorkForm(data) {
    // console.log("time==",data)
    var dateobj=new Date()
    var year = dateobj.getFullYear();
    var month = dateobj.getMonth() + 1
    var day = dateobj.getDate()
    var date = month + '/' + day + '/'  + year

    var time1=date+" "+data.fromTime
    var time2=date+" "+data.toTime
    time1=new Date(time1).toUTCString()
    time2=new Date(time2).toUTCString()
    var h=new Date(time1).getUTCHours()
    var m=new Date(time1).getUTCMinutes()
    var h1=new Date(time2).getUTCHours()
    var m1=new Date(time2).getUTCMinutes()
     var hh = h <= 9 && h >= 0 ? "0"+h : h;
     var mm = m <= 9 && m >= 0 ? "0"+m : m;
     var hh1 = h1 <= 9 && h1 >= 0 ? "0"+h1 : h1;
     var mm1 = m1 <= 9 && m1 >= 0 ? "0"+m1 : m1;

    data.fromTime = hh + ':' + mm
    data.toTime = hh1 + ':' + mm1
    // console.log("data====",data)


     if (this.workingForm.valid) {
       try {
         console.log("time data===",data)
         data.userId = this.dataGet.userId
         this.api.setTime(data).then((res:any)=>{
           console.log("time insrted or updated",res)
          if(res.status){
            this.multipleShift=false
            var msg = 'Shift time update Successfully'
            this.general.openSnackBar(msg,'')
           
           }else{
            this.multipleShift=true
           }
         })
       } catch (err) {
       }
     }
   }


   onSubmitlanguageForm(data){
    console.log("language===",data)
    data.userId=this.dataGet.userId
    this.api.setLanguage(data).then((res:any)=>{
      this.general.updateItem('sensegizlogin','language',data.language)
     this.refreshSetting()
    //  setTimeout(()=>{
    //    window.location.reload()
    //  },1000)
    })
  }

 
   onSubmitBufferForm(value){

    if (this.bufferForm.valid) {
      try {
        // console.log("buffer data==",value)
        var data={
        userId : this.dataGet.userId,
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
   bufferval(event){
     console.log(event.target.value)
    
      this.bufferValue=event.target.value>5?true:false
    
   }

   getMin(event){
    // console.log("event==",event)
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
