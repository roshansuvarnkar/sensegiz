import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-ble-id',
  templateUrl: './admin-add-ble-id.component.html',
  styleUrls: ['./admin-add-ble-id.component.css']
})
export class AdminAddBleIdComponent implements OnInit {

	type:any
	dataGet:any
	loginData:any
	bleIdForm:FormGroup;
  dateForm:FormGroup;
	language:any
    constructor(
	    private fb: FormBuilder,
	    public dialogRef: MatDialogRef<AdminAddBleIdComponent>,
	    @Inject(MAT_DIALOG_DATA)  data,
	    private api: ApiService,
	    private login:LoginCheckService,
       private router: Router,
      private route: ActivatedRoute,
	    private general:GeneralMaterialsService
  ) {
      this.type = data.type
      this.dataGet = data.data
    //   console.log("type==",data)
  }

  ngOnInit(): void {
	 this.language=this.dataGet.language
  		this.bleIdForm = this.fb.group({
		  items:this.fb.array([])
		});
    this.dateForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });

		this.refreshDevice()
  }



  refreshDevice(){
  	var data={
	    userId:this.dataGet.userId,
	    tblName:'deviceRegistration'
	}

  	this.api.getData(data).then((res:any)=>{
    	 //console.log("data===",res)
		if(res.status){
			const control = <FormArray>this.bleIdForm.controls.items;
			control.controls = [];
			for(var i=0;i<res.success.length;i++){
				control.push(this.fb.group(
				  {
					id:[res.success[i].id],
					deviceId: [res.success[i].deviceId],
					deviceName: [{value: res.success[i].deviceName, disabled: true}],
					macAddress:[res.success[i].macId,Validators.required]
				  }
				))
			}
		}
    })
  }



  submit(data){
	this.api.updateBleMac(data).then((res:any)=>{
		// console.log("add ble res===",res)
		if(res.status){
			var msg = "MAC id updated successfully"
			this.general.openSnackBar(msg,'')
			this.refreshDevice()
		}
	})
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
  onSubmitDateForm(data){
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
    
    var vales={
      userId:this.dataGet.userId,
	    tblName:'deviceRegistration',
      fromDate:from,
      toDate:to
    }
    this.dialogRef.close()
    this.router.navigate(['/admin-Analystics'], {
      queryParams: { user: JSON.stringify(vales)},
    });
  }
}
