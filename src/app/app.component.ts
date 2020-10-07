import { Component,OnInit } from '@angular/core';
import { LoginCheckService } from './login-check.service';
import { Router , ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../environments/environment'
import { GeneralMaterialsService } from './general-materials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sensegiz';
  statusMessage = 'sensegiz';
  loginData:boolean=false
  loginMobData:boolean=false
  loginStatus:boolean=false
  loginDataInfo:any
  checkUrl:any
  statusHome:boolean
  statusNotHome:boolean
  isMobile:boolean
  isTablet:boolean
  isDesktopDevice:boolean
  deviceStatus:boolean
  twoStepAuth:any
  statusFreeze:boolean=false
  freezeMessage:String="Downloading"
  deviceInfo = null;
  language:any
  host:any = environment.apiHost

  constructor(
    private login:LoginCheckService,
    private router:Router,
    private route:ActivatedRoute,
    private general:GeneralMaterialsService,
    private deviceService: DeviceDetectorService){
    // this.loginData = this.login.loginStatus()
    this.loginDataInfo = this.login.loginData()
    this.twoStepAuth=this.login.authData()
    console.log("auth dT==",this.login.authData())
    this.login.loginCred.subscribe(res=>{
      // console.log("login data===",res)
      this.twoStepAuth=this.login.authData()
      this.loginData = res
      this.loginMobData=res
      // this.twoStepAuth=res

      this.loginDataInfo = this.login.loginData()
      this.language=this.loginDataInfo.language
      console.log("this.language====",this.language)
    })
    this.loginDataInfo = this.login.loginData()
   console.log("loginDataInfo===",this.loginDataInfo);
   console.log("loginData===",this.loginData);

  this.login.loginCheckStatus.subscribe(res=>{
    // console.log("login data1===",res)
    this.loginStatus = res
    this.loginDataInfo = this.login.loginData()
    this.language=this.loginDataInfo.language
    console.log("this.language====",this.language)
    console.log("heloooo",this.loginDataInfo)
    if(this.loginDataInfo.twoStepAuth=='N'){
      // this.twoStepAuth=true
      // console.log("im Noo")
    }

  })

  this.login.authCheck.subscribe(res=>{
    this.twoStepAuth=this.login.authData()
  })

  this.general.loadingFreez.subscribe((res:any)=>{
    console.log("statusfreeze==",res)
    this.statusFreeze = res.status
  })

  }

  ngOnInit(){
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
    // console.log(this.deviceInfo);
    // console.log(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    // console.log(this.isTablet);  // returns if the device us a tablet (iPad etc)
    // console.log(this.isDesktopDevice); // returns if the app is running on a Desktop
   this.status()
  }

  status(){
    this.deviceStatus=this.deviceStatus==true?false:true
  }

  logout(){
    localStorage.clear()
    this.login.loginCheckStatus.next(false)
    this.login.loginCred.next(false)
    this.login.authCheck.next(false)
    this.router.navigate(['/login'])
  }
}
