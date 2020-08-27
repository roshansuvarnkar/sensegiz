import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
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
  setting:any=[]
  min:any=[]
  sec:any=[]
  dataGet:any
  statusCustomise:boolean=false
  selectedValue:boolean=false
  selectStatus1:boolean=false
  selectStatus2:boolean=false
  minStatus:boolean=false
  secStatus:boolean=false
  requiredStatus1:boolean=false
  requiredStatus2:boolean=false
  timeFormStatus:boolean=true
  constructor(private fb:FormBuilder,private api:ApiService,private login:LoginCheckService,private general:GeneralMaterialsService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.txPowerForm = this.fb.group({
      txPower: ['', Validators.required],
    });
    this.distanceForm = this.fb.group({
      distance: ['', Validators.required],
      rssi: ['', Validators.required],
    });
    this.scanningForm=this.fb.group({
      seconds:['',[Validators.required,Validators.max(60), Validators.min(1)]],

    })
    this.timeForm=this.fb.group({
      minutes:[{value:'',disabled: false},Validators.required],
      seconds:[{value:'',disabled: false},Validators.required]
    })
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
          rssi: res.success[0].rssi
        })
        // if(this.setting.type==0){
        //   this.selectStatus1=true
        //   if(this.setting.distance == 1){
        //     this.distanceForm.patchValue({
        //       distance: res.success[0].distance.toString(),
        //       rssi: 'BE'
        //     })
        //   }
        //   else  if(this.setting.distance == 2){
        //     this.distanceForm.patchValue({
        //       distance: res.success[0].distance.toString(),
        //       rssi: 'BC'
        //     })
        //   }
        //   else if(this.setting.distance == 3){
        //     this.distanceForm.patchValue({
        //       distance: res.success[0].distance.toString(),
        //       rssi: 'B6'
        //     })
        //   }
        // }
        // if(this.setting.type==1){
        //   this.selectStatus2=true
        //   if(this.setting.distance == 1){
        //     this.distanceForm.patchValue({
        //       distance: res.success[0].distance.toString(),
        //       rssi: 'AC'
        //     })
        //   }
        //   else  if(this.setting.distance == 2){
        //     this.distanceForm.patchValue({
        //       distance: res.success[0].distance.toString(),
        //       rssi: 'A9'
        //     })
        //   }
        //   else if(this.setting.distance == 3){
        //     this.distanceForm.patchValue({
        //       distance: res.success[0].distance.toString(),
        //       rssi: 'A5'
        //     })
        //   }
        // }
        if(res.success[0].durationThreshold<=55){
          this.minStatus=true
          this.timeFormStatus=false
          this.timeForm.patchValue({
            minutes:'none',
            seconds:res.success[0].durationThreshold
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
      }
    })
  }
  minThresholdMinsec(){
    var seconds=''
    for(let i =0;i<=5;i++){
      var minutes=i==0?'none':i
      this.min.push(minutes)
      console.log("min==",this.min)
     }
    for(let i =-1;i<=11;i++){
      if(i==1 || i==2 || i==3){
      }
      else{
        if(i==-1){
           seconds='none'
        }
        else{
         seconds=(i*5).toString()
        }
        this.sec.push(seconds)
        console.log("sec==",this.sec)

      }
    }
  }

  onSubmitDistanceForm(data) {
    if (this.distanceForm.valid) {
      try {
        console.log("distance ===",data)
        data.userId = this.dataGet.userId
        this.api.addDistance(data).then((res:any)=>{
          console.log("distance inserted or updated",res)
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


  customise(){
    this.statusCustomise = this.statusCustomise == true ? false : true
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
}
