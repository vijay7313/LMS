import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/books';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookService {
  books: Array<Book> = [];  

  constructor(private http: HttpClient) {}
  getAllBooks() {
    return this.http.get(environment.apiurl + '/books') as Observable<Book[]>
  }
  getBookById(id:number) {
    return this.http.get<Book>(`${environment.apiurl }/books/${id}`)
  }
//   updateUserInfo(id:number,user: User): Observable<User>{
//     return this.http.put<User>(`${environment.apiurl}/users/${id}`, user);
//  }
  UpdateBookInfo(id: number, book: Book): Observable<Book>{
    return this.http.put<Book>(`${environment.apiurl}/books/${id}`, book);
  }

  addBook(Book:Book):Observable<Book> {
    return this.http.post<Book>(environment.apiurl + '/books', Book);
  }
  removeBook(id:number) {
    return this.http.delete<Book>(`${environment.apiurl}/books/${id}`);
  }  
}