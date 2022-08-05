import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';
import { AuthcontrolService } from 'src/app/services/authcontrol.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

registrationForm: any;
submitDisabled: boolean = false;
errorMessage: string = "";

user:User={id:0, firstName:'', lastName:'', userName:'', email:'', mobileNo:0, password:'', domain:''}
constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router,
  private userService: UserService, public auth: AuthcontrolService) { 
    this.registrationForm = formBuilder.group({
      firstName: [null],
      lastName: [null],
      email: [null],
      mobileNo: [null],
      password:[null],
      domain:[null]  
    });  
  }

  @ViewChild('firstName') firstName!: ElementRef
  @ViewChild('lastName') lastName!: ElementRef
  @ViewChild('email') email!: ElementRef
  @ViewChild('mobileNo') mobileNo!: ElementRef
  @ViewChild('password') password!: ElementRef
  @ViewChild('domain') domain!: ElementRef
  
  ngOnInit(): void { }  

  addUser() {
    this.submitDisabled = true;
    if (this.registrationForm.valid) {
      this.user.firstName = this.firstName.nativeElement.value;
      this.user.lastName = this.lastName.nativeElement.value;
      this.user.userName = (this.firstName.nativeElement.value.slice(0, 3).toLowerCase()) + (this.lastName.nativeElement.value.slice(0, 3).toLowerCase());
      this.user.email = this.email.nativeElement.value;
      this.user.mobileNo = this.mobileNo.nativeElement.value;
      this.user.password = this.password.nativeElement.value;
      this.user.domain = this.domain.nativeElement.value;      
      this.user.role = "user";      
      console.log("response==>"+this.user);
      this.userService.addUser(this.user).subscribe(response => {
        document.getElementById("addUser").click();
        // this.router.navigate(['login']);
      });
      
    }
  } 

}
