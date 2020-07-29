import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralMaterialsService {
  _timezone: any = null;
  _timeZoneAbbr: any

  constructor(private _snackBar: MatSnackBar,private http:HttpClient) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


exportToExcel(table:any,excelFileName: string,header: string){


  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(table);


  const wb: XLSX.WorkBook = XLSX.utils.book_new();


  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


  XLSX.writeFile(wb, excelFileName);

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


  onUpload(files) {
    return new Promise((resolve,reject)=>{
      const formData = new FormData();
      for (const file of files) {
        formData.append(name, file, file.name);
      }
      this.http.post('./assets/', formData).subscribe((res:any)=>{
        resolve(res)
      });
    })
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

}
