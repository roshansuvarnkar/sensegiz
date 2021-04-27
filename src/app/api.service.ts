/* import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { identifierModuleUrl } from '@angular/compiler';
import { GeneralMaterialsService } from './general-materials.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host:string = environment.apiHost

  constructor(private http:HttpClient, private general:GeneralMaterialsService) { }

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

  editCoinRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/setCoinList';
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
  coinRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/coinRegistration';
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



updateWearableType(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/setWearableType';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}

updateScanningInterval(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/setScanningInterval';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}
updateBuzzerConfig(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/setBuzzerConfiguration';
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



getDepartmentReportTotalCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/departmentCTReportCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}


getDeallocatedDevice(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/getDeallocatedDevice';
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

 setGatewayDataRate(data)
 {
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   let url = this.host+'/setGatewayDataRate';
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


// getInactivityDeviceSetting(data){
//   const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };
//   let url = this.host+'/inactivityDeviceSetting';
//   return new Promise((resolve,reject)=>{
//     this.http.post(url,data,httpOptions).subscribe(res=>{
//       resolve(res);
//     })
//   });
// }
getInactivityDeviceSetting(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/updateInactivity';
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

getDurationThreshold(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/durationThreshold';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });

}

getUsernameSuggestion(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/fetchUserNames';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });

}

updateMeetingCount(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/setMeetingCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}

uploadLogo(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/upload-image';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });

}

uploadDeviceFile(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/upload-file';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}

twoStepAuth(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/setTwostepAuth';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}

sendOtp(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/sendOTP';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}

confirmOtp(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/confirmOTP';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });

}

updatePassword(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/updatePassword';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });

}

createSubUser(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/createSubUser';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}

getSubUser(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getSubUser';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });

}

deleteSubUser(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/deleteSubUser';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });

}

getOnlineCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/getOnlinedevice';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });

}

downloadActiveOfflineUsers(data,fileName){
  this.general.loadingFreez.next({status:true})

  let url = this.host+'/downloadActiveOfflineUsers';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
      if(res.status==200)
      this.downloadFile(res,fileName)

      resolve(true);
    },
    err=>{
      console.log("err==",err)
    })
  });

}
setLanguage(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/setLanguage';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });

}
setDeviceMultiShift(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let url = this.host+'/setDeviceMultiShift';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });
}
infectedContactalert(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/infectedContactAlert';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });

}
downloadCummulative(data,fileName){

  this.general.loadingFreez.next({status:true})

  let url = this.host+'/downloadCTReport';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
      // console.log("nam--",res)
      if(res.status==200)
      this.downloadFile(res,fileName)

      resolve(true);
    },
    err=>{
      console.log("err==",err)
    })
  });

}

getCustomReport(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/getOnlineOfflineReport';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,httpOptions).subscribe(res=>{
      resolve(res);
    })
  });

}
downloadFile(response,fileName){
  let body = response.body
  let dataType = body.type;
  let binaryData = [];
  binaryData.push(body);
  this.general.loadingFreez.next({status:false})
  let downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
  downloadLink.setAttribute('download', fileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();
}
downloadReport(data,fileName){
  this.general.loadingFreez.next({status:true})

  let url = this.host+'/download';
  return new Promise((resolve,reject)=>{
    this.http.post(url,data,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
      if(res.status==200)
      this.downloadFile(res,fileName)

      resolve(true);
    },
    err=>{
      console.log("err==",err)
    })
  });

}

  viewCTReport(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/viewCTReport';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });

  }

  downloadCustomReport(data,fileName){
    this.general.loadingFreez.next({status:true})

    let url = this.host+'/downloadOnlineOfflineReport';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
        // console.log("nam--",res)
        if(res.status==200)
        this.downloadFile(res,fileName)

        resolve(true);
      },
      err=>{
        console.log("err==",err)
      })
    });

  }

  downloadDeptCummulative(data,fileName){

    this.general.loadingFreez.next({status:true})

    let url = this.host+'/departmentDownloadCTReport';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
        // console.log("nam--",res)
        if(res.status==200)
        this.downloadFile(res,fileName)

        resolve(true);
      },
      err=>{
        console.log("err==",err)
      })
    });

  }

  editIsolation(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/makePersonIsolated';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }
  deallocateDevice(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url = this.host+'/deallocateDevice';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }

  setDeviceRssi(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/setDeviceRssi';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }

  getCountryZone(){
    return new Promise((resolve,reject)=>{
      this.http.get('../../assets/zone.json').subscribe((res:any)=>{
        resolve(res.zone)
      },
      err=>{
        reject(err)
      })
    })
  }

  getAllDepartment(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getAllDepartment';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }

  setDeviceDepartment(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/setDeviceDepartment';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }

  getDepartmentreport(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/departmentCTReport';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    });
  }
  downloadDeallocatedDevice(data,fileName){
    this.general.loadingFreez.next({status:true})

    let url = this.host+'/downloadDeallocatedDevice';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
        if(res.status==200)
        this.downloadFile(res,fileName)
        resolve(true);
      },
      err=>{
        console.log("err==",err)
      })
    });

  }
} */

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { identifierModuleUrl } from '@angular/compiler';
import { GeneralMaterialsService } from './general-materials.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host:string = environment.apiHost

  constructor(private http:HttpClient, private general:GeneralMaterialsService) { }

  send(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/login';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      },err=>{
       // console.log("err==",err)
        reject(err)
      })
    });
  }


  deviceRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/deviceRegistration';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }




  editDeviceRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/updateDeviceDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }




  EditUserRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }

    let url = this.host+'/updateUserDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }

  editCoinRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let body={
      data:data
    }
    let url = this.host+'/setCoinList';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }

  UserRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/userDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }
  coinRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let body={
      data:data
    }
    let url = this.host+'/coinRegistration';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }




  deletedeviceandUser(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let body={
      data:data
    }
    let url = this.host+'/deleteDeviceDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }





  getData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/getData';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }




  getDeviceData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/getDeviceData';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }


  getDeviceDataCount(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let body={
      data:data
    }
    let url = this.host+'/getDeviceDataCount';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }

  setTime(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let body={
      data:data
    }

    let url = this.host+'/deviceShift';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }



  addDistance(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }

    let url = this.host+'/deviceSetting';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }


  editInfectedPerson(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }

    let url = this.host+'/updateInfected';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }



updateWearableType(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/setWearableType';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}

updateScanningInterval(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/setScanningInterval';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}
updateBuzzerConfig(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/setBuzzerConfiguration';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}
  getCountData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let body={
      data:data
    }
    let url = this.host+'/getPortalHome';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }




  addMaxContactThreshold(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/deviceSettingThreshold';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }


  getAssignedDevices(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/appAdminAssignView';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }



  getLiveData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/getData';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }


  getDeviceHistoryBasedOnDate(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/deviceHistory';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }
  getDeviceHistoryBasedOnDeviceId(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }

    let url = this.host+'/historyBasedOnDeviceId';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }
  getDeviceHistoryBasedOnDeviceName(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/historyBasedOnDeviceName';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }

// max Time Contact

  getMaxTimeContact(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/maxTimeContact';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }


  getMaxContactDevice(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/maxContactDevice';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }


  getPerDayCount(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }

    let url = this.host+'/perDayCount';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }




  getHomeCountData(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/getDataType';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }



getDepartmentReportTotalCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let body={
    data:data
  }
  let url = this.host+'/departmentCTReportCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}


getDeallocatedDevice(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let body={
    data:data
  }
//console.log(body)
  let url = this.host+'/getDeallocatedDevice';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{

      resolve(res.data);
    })
  });
}






   editShift(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/updateDeviceShift';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }



showWarning(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let body={
    data:data
  }

   let url = this.host+'/deviceWarning';
   return new Promise((resolve,reject)=>{
     this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       resolve(res.data);
     })
   });
 }


 editSettingShift(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let body={
    data:data
  }

   let url = this.host+'/updateSettingsShift';
   return new Promise((resolve,reject)=>{
     this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       resolve(res.data);
     })
   });
 }




  adminLogin(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let body={
    data:data
  }
   let url = this.host+'/adminLogin';
   return new Promise((resolve,reject)=>{
     this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       resolve(res.data);
     })
   });
 }


 getAdminData(){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   var data = ""
   let body={
    data:data
  }
   let url = this.host+'/getUser';
   return new Promise((resolve,reject)=>{
     this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       resolve(res.data);
     })
   });
 }


 createUser(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let body={
    data:data
  }
   let url = this.host+'/createUser';
   return new Promise((resolve,reject)=>{
     this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       resolve(res.data);
     })
   });
 }


 deleteAdminUser(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let body={
    data:data
  }
   let url = this.host+'/deleteUser';
   return new Promise((resolve,reject)=>{
     this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       resolve(res.data);
     })
   });
 }


 updateBleMac(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let body={
    data:data
  }
   let url = this.host+'/updateMacId';
   return new Promise((resolve,reject)=>{
     this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       resolve(res.data);
     })
   });
 }

getTotalRowCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/getRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });

}

 addTxPower(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let body={
    data:data
  }
   let url = this.host+'/setTxPower';
   return new Promise((resolve,reject)=>{
     this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       resolve(res.data);
     })
   });
 }


 deleteShift(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let body={
    data:data
  }
   let url = this.host+'/deleteDeviceShift';
   return new Promise((resolve,reject)=>{
     this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       resolve(res.data);
     })
   });
 }

 setGatewayDataRate(data)
 {
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let body={
    data:data
  }
   let url = this.host+'/setGatewayDataRate';
   return new Promise((resolve,reject)=>{
     this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       resolve(res.data);
     })
   });
 }

 getLiveDataTotalCount(data){
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   let body={
    data:data
  }
   let url = this.host+'/getRowCount';
   return new Promise((resolve,reject)=>{
     this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       resolve(res.data);
     })
   });
 }

 getHistoryDateReportTotalCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/deviceHistoryRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}

getHistoryNameReportTotalCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/historyBasedOnDeviceNameRowCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}

getSummaryReport(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/infectedDeviceName';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}


// getInactivityDeviceSetting(data){
//   const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };
//   let url = this.host+'/inactivityDeviceSetting';
//   return new Promise((resolve,reject)=>{
//     this.http.post(url,data,httpOptions).subscribe(res=>{
//       resolve(res);
//     })
//   });
// }
getInactivityDeviceSetting(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/updateInactivity';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}



getBufferDeviceSetting(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/bufferDeviceSetting';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}



updateInactivityStatus(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/inactivityStatus';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}

getDurationThreshold(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/durationThreshold';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });

}

getUsernameSuggestion(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/fetchUserNames';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });

}

updateMeetingCount(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/setMeetingCount';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}

uploadLogo(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/upload-image';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });

}

uploadDeviceFile(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/upload-file';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}

twoStepAuth(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }

  let url = this.host+'/setTwostepAuth';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}

sendOtp(data){

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/sendOTP';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}

confirmOtp(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/confirmOTP';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });

}

updatePassword(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }

  let url = this.host+'/updatePassword';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });

}

createSubUser(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/createSubUser';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}

getSubUser(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/getSubUser';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });

}

deleteSubUser(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/deleteSubUser';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });

}

getOnlineCount(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }

  let url = this.host+'/getOnlinedevice';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });

}

downloadActiveOfflineUsers(data,fileName){
  this.general.loadingFreez.next({status:true})
  let body={
    data:data
  }
  let url = this.host+'/downloadActiveOfflineUsers';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe((res:any)=>{
      if(res.status==200)
      this.downloadFile(res,fileName)

      resolve(true);
    },
    err=>{
     // console.log("err==",err)
    })
  });

}
setLanguage(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }

  let url = this.host+'/setLanguage';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });

}
setDeviceMultiShift(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/setDeviceMultiShift';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });
}
infectedContactalert(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }
  let url = this.host+'/infectedContactAlert';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });

}
downloadCummulative(data,fileName){

  this.general.loadingFreez.next({status:true})
  let body={
    data:data
  }
  let url = this.host+'/downloadCTReport';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe((res:any)=>{
      // console.log("nam--",res)
      if(res.status==200)
      this.downloadFile(res,fileName)

      resolve(true);
    },
    err=>{
      //console.log("err==",err)
    })
  });

}

getCustomReport(data){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  let body={
    data:data
  }

  let url = this.host+'/getOnlineOfflineReport';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data);
    })
  });

}
downloadFile(response,fileName){
  let body = response.body
  let dataType = body.type;
  let binaryData = [];
  binaryData.push(body);
  this.general.loadingFreez.next({status:false})
  let downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
  downloadLink.setAttribute('download', fileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();
}
downloadReport(data,fileName){
  this.general.loadingFreez.next({status:true})
  let body={
    data:data
  }
  let url = this.host+'/download';
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe((res:any)=>{
      if(res.status==200)
      this.downloadFile(res,fileName)

      resolve(true);
    },
    err=>{
     // console.log("err==",err)
    })
  });

}

  viewCTReport(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/viewCTReport';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
       // console.log(res.data)
        resolve(res.data);
      })
    });

  }

  downloadCustomReport(data,fileName){
    this.general.loadingFreez.next({status:true})
    let body={
      data:data
    }
    let url = this.host+'/downloadOnlineOfflineReport';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe((res:any)=>{
        // console.log("nam--",res)
        if(res.status==200)
        this.downloadFile(res,fileName)

        resolve(true);
      },
      err=>{
        //console.log("err==",err)
      })
    });

  }

  downloadDeptCummulative(data,fileName){

    this.general.loadingFreez.next({status:true})
    let body={
      data:data
    }
    let url = this.host+'/departmentDownloadCTReport';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe((res:any)=>{
        // console.log("nam--",res)
        if(res.status==200)
        this.downloadFile(res,fileName)

        resolve(true);
      },
      err=>{
        //console.log("err==",err)
      })
    });

  }

  editIsolation(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/makePersonIsolated';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }
  deallocateDevice(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/deallocateDevice';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }

  setDeviceRssi(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/setDeviceRssi';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }

  getCountryZone(){
    return new Promise((resolve,reject)=>{
      this.http.get('../../assets/zone.json').subscribe((res:any)=>{
        resolve(res.zone)
      },
      err=>{
        reject(err)
      })
    })
  }

  getAllDepartment(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }

    let url = this.host+'/getAllDepartment';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }

  setDeviceDepartment(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/setDeviceDepartment';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }

  getDepartmentreport(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/departmentCTReport';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }
  downloadDeallocatedDevice(data,fileName){
    this.general.loadingFreez.next({status:true})
    let body={
      data:data
    }
    let url = this.host+'/downloadDeallocatedDevice';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe((res:any)=>{
        if(res.status==200)
        this.downloadFile(res,fileName)
        resolve(true);
      },
      err=>{
        //console.log("err==",err)
      })
    });

  }
  temperatureData(data){
    const httpOptions={
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    let url =this.host+'/temperatureData';
    let body={
      data:data
    }
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data)
      })
    })

}
updateTemperatureFormat(data){
  const httpOptions={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }
  let url =this.host+'/updateTemperatureFormat';
  let body={
    data:data
  }
  return new Promise((resolve,reject)=>{
    this.http.post(url,body,httpOptions).subscribe((res:any)=>{
      resolve(res.data)
    })
  })
}
downloadTemperatureData(data,fileName){
  this.general.loadingFreez.next({ status: true });

  let url = this.host + '/downloadTemperatureData';
  let body = {
    data: data,
  };

  return new Promise((resolve, reject) => {
    this.http
      .post(url, body, {
        observe: 'response',
        responseType: 'blob' as 'json',
      })
      .subscribe(
        (res: any) => {
          // resolve(decry);
          if (res.status == 200) this.downloadFile(res, fileName);
          resolve(true);
        },
        (err) => {
          //console.log('err==', err);
        }
      );
  });
}
temperatureDataCount(data) {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  let body = {
    data: data,
  };
  let url = this.host + '/temperatureDataCount';
  return new Promise((resolve, reject) => {
    this.http.post(url, body, httpOptions).subscribe((res: any) => {
      resolve(res.data);
    });
  });
}
 updateTemperaturePeriod(data){
    const httpOptions={
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    let url =this.host+'/updateTemperaturePeriod';
    let body={
      data:data
    }
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data)
      })
    })
  }
  getDataCount(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let body = {
      data: data,
    };
    let url = this.host + '/getDataCount';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
  OnlineOfflineReportCount(data){

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body={
      data:data
    }
    let url = this.host+'/OnlineOfflineReportCount';
    return new Promise((resolve,reject)=>{
      this.http.post(url,body,httpOptions).subscribe((res:any)=>{
        resolve(res.data);
      })
    });
  }
   viewCTReportCount(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let body = {
      data: data,
    };
    let url = this.host + '/viewCTReportCount';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
   onofftoggele(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let body = {
      data: data,
    };
    let url = this.host + '/updateOnOffStatus';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }

  getSyncedDeviceDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let body = {
      data: data,
    };
    let url = this.host + '/getSyncedDeviceDetails';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }

  MoregetSyncedDeviceDataTypes(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let body = {
      data: data,
    };
    let url = this.host + '/getSyncedDeviceDataTypes';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
  getSyncedDeviceDetailsCount(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let body = {
      data: data,
    };
    let url = this.host + '/getSyncedDeviceDetailsCount';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
  getSyncedDeviceDataTypesCount(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let body = {
      data: data,
    };
    let url = this.host + '/getSyncedDeviceDataTypesCount';
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe((res: any) => {
        resolve(res.data);
      });
    });
  }
}

