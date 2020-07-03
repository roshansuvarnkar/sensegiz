import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host:string = environment.apiHost

  constructor(private http:HttpClient) { }

  send(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/login';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      },err=>{
        console.log("err==",err)
        reject(err)
      })
    });
  }


  deviceRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/deviceRegistration';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }




  editDeviceRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateDeviceDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }




  EditUserRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateUserDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }


  UserRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/userDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }





  deletedeviceandUser(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/deleteDeviceDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }





  getData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getData';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }




  getDeviceData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getDeviceData';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }


  getDeviceDataCount(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getDeviceDataCount';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }

  setTime(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/deviceShift';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }



  addDistance(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/deviceSetting';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }



  editInfectedPerson(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateInfected';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }


  getCountData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getPortalHome';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }




  addMaxContactThreshold(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/deviceSettingThreshold';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }


  getAssignedDevices(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/appAdminAssignView';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }



  getLiveData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getData';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }


  getDeviceHistoryBasedOnDate(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/deviceHistory';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }
  getDeviceHistoryBasedOnDeviceId(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/historyBasedOnDeviceId';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }
  getDeviceHistoryBasedOnDeviceName(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/historyBasedOnDeviceName';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }

// max Time Contact

  getMaxTimeContact(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/maxTimeContact';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }


  getMaxContactDevice(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/maxContactDevice';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }


  getPerDayCount(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/perDayCount';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }




  getHomeCountData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getDataType';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }




   editShift(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateDeviceShift';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }



showWarning(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   let url = this.host+'/deviceWarning';
   return new Promise((resolve,reject)=>{
     this.http.post(url,data,httpOptions).subscribe(res=>{
       resolve(res);
     })
   });
 }


 editSettingShift(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   let url = this.host+'/updateSettingsShift';
   return new Promise((resolve,reject)=>{
     this.http.post(url,data,httpOptions).subscribe(res=>{
       resolve(res);
     })
   });
 }




  adminLogin(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   let url = this.host+'/adminLogin';
   return new Promise((resolve,reject)=>{
     this.http.post(url,data,httpOptions).subscribe(res=>{
       resolve(res);
     })
   });
 }


 getAdminData(){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   var data = ""
   let url = this.host+'/getUser';
   return new Promise((resolve,reject)=>{
     this.http.post(url,data,httpOptions).subscribe(res=>{
       resolve(res);
     })
   });
 }


 createUser(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let url = this.host+'/createUser';
   return new Promise((resolve,reject)=>{
     this.http.post(url,data,httpOptions).subscribe(res=>{
       resolve(res);
     })
   });
 }


 deleteAdminUser(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let url = this.host+'/deleteUser';
   return new Promise((resolve,reject)=>{
     this.http.post(url,data,httpOptions).subscribe(res=>{
       resolve(res);
     })
   });
 }


 updateBleMac(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let url = this.host+'/updateMacId';
   return new Promise((resolve,reject)=>{
     this.http.post(url,data,httpOptions).subscribe(res=>{
       resolve(res);
     })
   });
 }

getTotalRowCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/getRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });

}

 addTxPower(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let url = this.host+'/setTxPower';
   return new Promise((resolve,reject)=>{
     this.http.post(url,data,httpOptions).subscribe(res=>{
       resolve(res);
     })
   });
 }


 deleteShift(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let url = this.host+'/deleteDeviceShift';
   return new Promise((resolve,reject)=>{
     this.http.post(url,data,httpOptions).subscribe(res=>{
       resolve(res);
     })
   });
 }



 getLiveDataTotalCount(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let url = this.host+'/getRowCount';
   return new Promise((resolve,reject)=>{
     this.http.post(url,data,httpOptions).subscribe(res=>{
       resolve(res);
     })
   });
 }

 getHistoryDateReportTotalCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/deviceHistoryRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}

getHistoryNameReportTotalCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/historyBasedOnDeviceNameRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}

getSummaryReport(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/infectedDeviceName';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}


getInactivityDeviceSetting(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/inactivityDeviceSetting';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}



getBufferDeviceSetting(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/bufferDeviceSetting';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}



updateInactivityStatus(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/inactivityStatus';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}


}
