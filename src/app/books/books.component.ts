import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { BookService } from '../services/book.service';
import { Book } from '../models/books';
import { UserService } from '../services/user.service';
import { User } from '../models/users';
import { UserCart } from '../models/UserCart';
import { CartService } from '../services/cart.service';
import { AuthcontrolService } from 'src/app/services/authcontrol.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books$!:Observable<Book[]>
  books: Book[] = [];
  singleBook!: Book;
  singleUser!: User;
  cart: UserCart = { id: 0,userId:0,firstName: '',lastName:'',bookId:0,title:'',description:'',author:''}
  category = 'All';
  loginType: any;
  bookId: any;
  userId: any;
  userName: any;
  cartObj: UserCart[] = [];

  constructor(private bookService: BookService, private router: Router,
  private userService:UserService,private cartService:CartService, public auth: AuthcontrolService) { }

  ngOnInit(): void {    
    if(sessionStorage.getItem("auth_data") != null) { 
      this.getAllBooks(); 
      this.userId = this.auth.userId;
      this.loginType = sessionStorage.getItem("loginType") != null ? sessionStorage.getItem("loginType"): '';
      this.userName = sessionStorage.getItem("userName");
      this.cartService.getCartItemsByUserId().subscribe(res => { 
        this.cartObj = res;
      });
    } else { this.router.navigateByUrl('/'); }
    /*for(let i=0; i<this.cartObj.length; i++) {
      if(this.cartObj[i].userId == this.userId) {
        if() { this.cartObj[i].bookId == } else { }
      }
    }*/
  }

  public deleteBook(id: number) {
    this.bookService.removeBook(id).subscribe(res => {
      console.log(res);
    });
    window.location.reload();    
  }

  public getAllBooks() { 
    this.bookService.getAllBooks().subscribe(response => {
      this.books = response;
      console.log(this.books)
    });
  }

  public subscribeBook(id: number) {
    this.bookService.getBookById(id).subscribe(res => {
      this.singleBook = res;
      console.log(this.singleBook);
      this.userService.getUserById(this.userId).subscribe(user => {
        this.singleUser = user;        
        this.cart.userId = this.singleUser.id;
        this.cart.firstName = this.singleUser.firstName;
        this.cart.lastName = this.singleUser.lastName;
        this.cart.bookId = this.singleBook.id;
        this.cart.title = this.singleBook.title;
        this.cart.description = this.singleBook.description;
        this.cart.author = this.singleBook.author;
        this.cartService.addBookToCart(this.cart).subscribe(res => {
          console.log(res);
          alert(this.cart.title + " book added to cart");
          // this.router.navigate([`/books/${this.cart.userId}`])
        })
      })
  })
  }
  
  selectedChoice(category:string) {
    this.category = category;
  }

  getBookId(bookId: any) {
    this.bookId = bookId;
  }
}