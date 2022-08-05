import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs/internal/Observable';
import { UserCart } from 'src/app/models/UserCart';
import { AuthcontrolService } from 'src/app/services/authcontrol.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart$!:Observable<UserCart[]>
  cart: UserCart[] = [];
  usercart: UserCart[] = [];

  userId: any;
  len: number = 0;
  date: Date | undefined ;
  returnDate: Date | undefined ;

  constructor(private router: Router, private cartService:CartService, public auth: AuthcontrolService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("auth_data") != null) { 
      this.date = new Date();
      this.returnDate = new Date();
      this.returnDate = new Date(this.returnDate.setMonth(this.returnDate.getMonth() + 1));
      this.auth.userId = sessionStorage.getItem("userId");
      this.cartService.getCartItemsByUserId().subscribe(res => { 
        let count = res.length;
        for (let i = 0; i < count; i++) {
          if (this.auth.userId == res[i].userId) {
            this.usercart[this.len] = res[i];
            this.len++;
          }
        }     
      });
    } else { this.router.navigateByUrl('/'); }
  }

}
