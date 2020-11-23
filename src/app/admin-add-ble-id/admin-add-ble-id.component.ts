import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';

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
	language:any
    constructor(
	    private fb: FormBuilder,
	    public dialogRef: MatDialogRef<AdminAddBleIdComponent>,
	    @Inject(MAT_DIALOG_DATA)  data,
	    private api: ApiService,
	    private login:LoginCheckService,
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

		this.refreshDevice()
  }



  refreshDevice(){
  	var data={
	    userId:this.dataGet.userId,
	    tblName:'deviceRegistration'
	}

  	this.api.getData(data).then((res:any)=>{
    	// console.log("data===",res)
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

}
