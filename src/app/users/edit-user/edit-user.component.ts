import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/users';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUser!: User
  
  loginForm: any;

  submitDisabled: boolean = false;

  errorMessage: string = "";
  userId: string = "";
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
    // this.loginForm = formBuilder.group({
    //   firstName: [null],
    //   lastName: [null],
    //   email: [null],
    //   mobileNo: [null],
    //   password:[null]
    // }); 
   }

  @ViewChild('firstName') firstName!: ElementRef
  @ViewChild('lastName') lastName!: ElementRef
  @ViewChild('email') email!: ElementRef
  @ViewChild('mobileNo') mobileNo!: ElementRef
 
  ngOnInit(): void {
   


    this.userId = this.router.url.split("/")[2];
    let id: number = +this.userId;
    this.userService.getUserById(id).subscribe(res => {
      this.editUser = res
      console.log(this.editUser);
  })
  }
  updateUser() {
    this.editUser.firstName = this.firstName.nativeElement.value;
    this.editUser.lastName = this.lastName.nativeElement.value;
    this.editUser.userName = (this.firstName.nativeElement.value.slice(0, 3).toLowerCase()) +
      (this.lastName.nativeElement.value.slice(0, 3).toLowerCase());
    this.editUser.email = this.email.nativeElement.value;
    this.editUser.mobileNo = this.mobileNo.nativeElement.value;
    this.userService.updateUserInfo(this.editUser.id,this.editUser).subscribe(res => {
      this.router.navigate(['viewUsers']);
    })
}
}
