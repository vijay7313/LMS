import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthcontrolService } from 'src/app/services/authcontrol.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  submitDisabled: boolean = false;
  errorMessage: string = "";  
  
  constructor(private formBuilder: FormBuilder, private router: Router, public auth: AuthcontrolService) {
    this.loginForm = formBuilder.group({
      loginType: [null],
      userName: [null],
      password: [null]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.submitDisabled = true;
    if(this.loginForm.valid) {
      const val=this.loginForm.value;      
      this.auth.login(val.userName, val.password).subscribe((user) => {
          console.log(user);
          if(user[0] != null) {
            this.auth.userId = user[0].id;
            sessionStorage.setItem("userId", user[0].id.toString());          
            sessionStorage.setItem("loginType",val.loginType);
            sessionStorage.setItem("userName",user[0].firstName + " " + user[0].lastName);
            if(user[0].password != val.password) {
              this.errorMessage = "Username / password is incorrect.";
            } else {
              this.router.navigateByUrl('/books');
            }   
          } else {
            this.errorMessage = "User datail is not available";
          }   
        }
      );
      
    }
  }

}