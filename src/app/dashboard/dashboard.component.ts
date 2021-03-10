import { Component, OnInit } from '@angular/core';
import { LoginCheckService } from '../login-check.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  language:any
  loginData :any
  constructor(private login:LoginCheckService ) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.language=this.loginData.language
  //  console.log("language==",this.language)

  }

}
