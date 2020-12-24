import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginCheckService } from '../login-check.service';
import { GeneralMaterialsService } from '../general-materials.service';
import { Router ,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-edit-setting-shift',
  templateUrl: './edit-setting-shift.component.html',
  styleUrls: ['./edit-setting-shift.component.css']
})
export class EditSettingShiftComponent implements OnInit {

	shiftForm:FormGroup
	type:any
	shifts:any
	loginData:any
	dataGet:any
	language:any
    constructor(
	    private fb: FormBuilder,
	    public dialogRef: MatDialogRef<EditSettingShiftComponent>,
	    @Inject(MAT_DIALOG_DATA)  data,
	    private api: ApiService,
	    private login:LoginCheckService,
		private general:GeneralMaterialsService,
		private route: ActivatedRoute
  	){
		this.type=data.type
		this.shiftForm = this.fb.group({
		  items:this.fb.array([])
		});
  	}

	ngOnInit(): void {
		this.loginData = this.login.Getlogin()
		this.loginData = JSON.parse(this.loginData)
		this.language=this.loginData.language
		console.log("language==",this.language)

	  this.route.queryParams.subscribe(params => {
		this.dataGet = JSON.parse(params.record) ;
		// console.log("data==",this.dataGet.userId)
	})
	  this.refreshShift()
	}

	refreshShift(){
	  var data={
	    userId:this.dataGet.userId,
	    tblName:'deviceShift'
	  }
	  console.log("data==",data)
	  this.api.getData(data).then((res:any)=>{
	    console.log("shift  data ======",res);
	    if(res.status){
	      this.shifts=res.success
		  for(let i=0;i<res.success.length;i++){
			var dateobj=new Date()
			var year = dateobj.getFullYear();
			var month = dateobj.getMonth() + 1
			var day = dateobj.getDate()
			var date = month + '/' + day + '/'  + year
		  
			var time1=date+" "+this.shifts[i].fromTime+':00 UTC'
			var time2=date+" "+this.shifts[i].toTime+':00 UTC'
			time1=new Date(time1).toString()
			time2=new Date(time2).toString()
			
		
			var h=new Date(time1).getHours()
			var m=new Date(time1).getMinutes()
			var h1=new Date(time2).getHours()
			var m1=new Date(time2).getMinutes()
			var hh = h <= 9 && h >= 0 ? "0"+h : h;
			var mm = m <= 9 && m >= 0 ? "0"+m : m;
			var hh1 = h1 <= 9 && h1 >= 0 ? "0"+h1 : h1;
			var mm1 = m1 <= 9 && m1 >= 0 ? "0"+m1 : m1;
			
	  
			this.shifts[i].fromTime=hh+':'+mm
			this.shifts[i].toTime=hh1+':'+mm1
	  }
  		    const control = <FormArray>this.shiftForm.controls.items;
			control.controls = [];
			for(var i=0;i<this.shifts.length;i++){
				control.push(this.fb.group(
				  {
				    id:[this.shifts[i].id],
				    userId:[this.shifts[i].userId],
				    shiftName:[this.shifts[i].shiftName],
				    fromTime:[this.shifts[i].fromTime],
				    toTime:[this.shifts[i].toTime],
				  }
				))
			}
  		//   console.log("controls=",control)
	    }
	  })
	}



	submit(a){
		// var times1=a.fromTime.split(':')
		// var times2=a.toTime.split(':')
		// var min=Math.abs(times2[1]-times1[1])
    	// var hour=Math.abs(times2[0]-times1[0])
		// console.log("minhour",min,hour)
		// if((hour < 9 && (min>=0 && min<=59)) || (hour == 9 && min == 0)){
			var dateobj=new Date()
			var year = dateobj.getFullYear();
			var month = dateobj.getMonth() + 1
			var day = dateobj.getDate()
			var date = month + '/' + day + '/'  + year
		
			var time1=date+" "+a.fromTime
			var time2=date+" "+a.toTime
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
	
			a.fromTime = hh + ':' + mm
			a.toTime = hh1 + ':' + mm1  
			console.log("a===",a)

		
			this.api.editSettingShift(a).then((res:any)=>{
			// console.log("shift edit==",res)
			if(res.status){
			var msg = 'Shift updated Successfully'
			this.general.openSnackBar(msg,'')
			}
			this.refreshShift()
		})
	// }
	// else if(hour >=9 && min>0){
    //     alert('Sorry! Time range cannot be greater than 09:00 hours.')
    // }
}

//Unable to convert
  delete(a){
    // console.log("delete===",a);
    

    if(confirm("Are you sure you want to delete the shift")){
      this.api.deleteShift(a).then((res:any)=>{
        console.log("shift delete==",res)
        if(res.status){
       var msg = 'Shift deleted Successfully'
		
          this.general.openSnackBar(msg,'')
        }
        this.refreshShift()
      })
    }else{
		this.refreshShift()
	}
    
  }

}
