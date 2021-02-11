import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router , ActivatedRoute } from '@angular/router';

import{Observable, BehaviorSubject} from 'rxjs'
import * as XLSX from 'xlsx';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class GeneralMaterialsService {
  _timezone: any = null;
  _timeZoneAbbr: any
  check:boolean=true
  public loadingFreez : BehaviorSubject<any> = new BehaviorSubject<any>([])

  constructor(private _snackBar: MatSnackBar, private http:HttpClient,private router:Router) {
    // this.logout()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


exportToExcel(table:any,excelFileName: string,header: string){


  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(table);


  const wb: XLSX.WorkBook = XLSX.utils.book_new();


  var worksheet=XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


  XLSX.writeFile(wb, excelFileName);
        console.log("ws===",ws)
        console.log("wb===",wb)


}

exportAsExcelFile(json: any[], excelFileName: string,header: string){
  const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(json);
      // console.log("ws===",ws)

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      // console.log("wb===",wb)

      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.read(header)

      XLSX.writeFile(wb, excelFileName);

}



setObject(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
    console.log("get==",this.getObject('sensegizlogin'))
}

getObject(key) {
    return JSON.parse(localStorage.getItem(key));
}

updateItem(key, property, value)
{
    var obj = this.getObject(key);
    obj[property] = value;
    console.log("obj===",obj)

    this.setObject(key, obj);
}

updatedOnDate(date){

  var months=['Jan','Feb', 'Mar','Apr','May','Jun','Jul','Aug','sep','Oct','Nov','Dec']

  var dateObj=new Date(date)
  var year = dateObj.getFullYear();
  var month = months[dateObj.getMonth()];
  var day = ("0" + dateObj.getDate()).slice(-2);
  var from = month  + ',' + day + ','  +year

  var h=dateObj.getHours()
  var m=dateObj.getMinutes()
  var s=dateObj.getSeconds()
  var hh = h <= 9 && h >= 0 ? "0"+h : h;
  var mm = m <= 9 && m >= 0 ? "0"+m : m;
  var ss=  s <= 9 && s >= 0 ? "0"+s : s;
  var datetime=from +', '+hh+':'+mm+':'+ss
  return datetime


}
convertTime(a){
  // console.log(a)

  var timeArr = a.split(':')

  var date = ''
  if(timeArr[0]!='00'){
    date += timeArr[0] + ' hour '
  }
  if(timeArr[1]!='00'){
    date += timeArr[1] + ' minute '
  }
  if(timeArr[2]!='00'){
    date += timeArr[2] + ' second '
  }
  if(date == '' ||   date == '-'){
    date = '05 second'
  }
  return date
}

startTime(data1,data2){
  var date=new Date(data2)
  if(data1!="00:00:00" || data1!='-'){
    var a=data1.split(':')
    date.setHours(date.getHours() -a[0]);
    date.setMinutes(date.getMinutes() - a[1]);
    date.setSeconds(date.getSeconds() - a[2]);
    // console.log("new date==",date)
  }
  if(data1=="00:00:00" || data1=='-'){
    date.setSeconds(date.getSeconds() - 5);
  }


  return date
}
pingAlertStatus(inTime){
  var pigTime=moment(inTime)
  var date=moment(new Date())
 var pigsplt=(moment(date).diff(moment(pigTime)))
  var pigArt= moment.duration(pigsplt)
var momemts=Math.floor(pigArt.asMinutes())
  console.log(pigArt)
  return momemts
}


  getZone(date){
    var timezone=date.getTimezoneOffset()
    console.log("time zone==",timezone)

    let m = timezone % 60;
    console.log("m==",m)
    timezone = (timezone - m) / 60;
    let h = timezone
    console.log("h==",m)

    let mm = m <= 9 && m >= 0 ? "0"+m : m;
    let hh = h <= 9 && h >= 0 ? "0"+h : h;

    var timezones=-(timezone)
    console.log("time zone==",timezone)

    if(timezones<0 ){
      var timeZone= '-'+((hh)+':'+(mm)).toString()
    }
    else{
      timeZone= '+'+ ((-hh)+':'+ (-mm)).toString()
    }

    return timeZone
  }




}
