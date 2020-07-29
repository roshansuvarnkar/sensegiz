import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as XLSX from 'xlsx'; 
@Injectable({
  providedIn: 'root'
})
export class GeneralMaterialsService {
  _timezone: any = null;
  _timeZoneAbbr: any

  constructor(private _snackBar: MatSnackBar) {}

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




}
