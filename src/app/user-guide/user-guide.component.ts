import { Component, OnInit } from '@angular/core';
import { LoginCheckService } from '../login-check.service';
@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.css']
})
export class UserGuideComponent implements OnInit {
		loginData:any
		language:any
  constructor(private login:LoginCheckService) { }

  ngOnInit(): void {
    this.loginData = this.login.Getlogin()
    this.loginData = JSON.parse(this.loginData)
    this.language=this.loginData.language
    console.log("language==",this.language) 
    
  }

}
