import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserCart } from '../models/UserCart';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // cart: Array<Cart> = [];
  constructor(private http: HttpClient) { }
  addBookToCart(Cart: UserCart): Observable<UserCart>{
    console.log("inside")
    return this.http.post<UserCart>(environment.apiurl + '/cart', Cart);
  }
  getCartItemsByUserId() {
    return this.http.get<UserCart[]>(`${environment.apiurl}/cart`);
  }
}
