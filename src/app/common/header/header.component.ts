import { Component, OnInit } from '@angular/core';
import { AuthcontrolService } from 'src/app/services/authcontrol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginType: any;
  userId: any;
  userName: any;

  constructor(public auth: AuthcontrolService, private router:Router) { }

  ngOnInit(): void {   
    this.auth.userId = sessionStorage.getItem("userId"); 
    this.loginType = sessionStorage.getItem("loginType");
    this.userName = this.auth.getUserName(); 
  }

  logout() {
    this.auth.logout();
  }
}
