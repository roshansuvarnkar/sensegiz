import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subject, Subscriber } from 'rxjs';
import { environment } from '../environments/environment';
import { LoginCheckService } from './login-check.service';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  host: string = environment.socketHost;
  socket: any;

  constructor(
    private login:LoginCheckService,
  ) {
    this.setupSocketConnection()
   }
   setupSocketConnection(){
      var connectionOptions = {
      'force new connection': true,
      reconnectionAttempts: 'Infinity',
      timeout: 10000,
      transports: ['websocket'],
      secure: true,
      rejectUnauthorized: false,
    };
    this.socket = io(this.host)
    this.socket.on('disconnect',()=>{
      console.log('Disconnected');
    })
    this.socket.on('connect', () => {
      console.log('\n\nReconnected');
    });

    this.socket.on('joinRoom', (data) => {
      console.log('\n\joinRoom==', data);
    });

    this.socket.on('leaveRoom', (data) => {
      console.log('\nleaveRoom==', data);
      let dataLogin = this.login.loginData();
      if(dataLogin.userId == data.userId && data.isDeleted == 'Y'){
        this.login.logout()
      }
      // if(data.userName == )
    });
   }


  joinRoom(){
    let data = this.login.loginData();
    console.log("data login===",data);
    this.socket.emit("joinRoom",data.userId);
  }

  leaveRoom(data){
    console.log("leave room emit==",data);

    this.socket.emit("leaveRoom",data);
  }

  getjoinRoom(data){
    this.socket.emit("allRooms");
  }
}
