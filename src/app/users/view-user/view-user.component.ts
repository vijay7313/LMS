import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';
import { EditBookComponent } from '../../books/edit-book/edit-book.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  viewusers$!: Observable<User[]>
  viewusers!: User[];
  edituser!:User;
  private edit!:EditBookComponent;
  userId: any;

  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(res => {
      this.viewusers=res;
      console.log("check" +this.viewusers);
    });
    this.viewusers$ = this.userService.getAllUser();
  }
  removeUser(id: number) {
    console.log("test")
    this.userService.removeUser(id).subscribe(res => {
      this.userService.getAllUser().subscribe(getnew => {
        this.viewusers = getnew;
        window.location.reload();        
      })
      })
  }
  editUser(id: number) {
    console.log("edit" + id);
    this.userService.getUserById(id).subscribe(res => {
     
      this.edituser = res
      console.log(this.edituser)
     this.edit.ngOnInit.call(this.viewusers)
    })

  }
  
  getUserId(userId: any) {
    this.userId = userId;
  }

}
