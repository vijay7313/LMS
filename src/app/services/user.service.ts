import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user:Array<User>=[]
  constructor(private http: HttpClient) { }
  addUser(user:User):Observable<User> {
    return this.http.post<User>(`${environment.apiurl}/users`, user);
  }
  getAllUser() {
    return this.http.get<User[]>(`${environment.apiurl}/users`);
  }
  removeUser(id : number){
    return this.http.delete<User>(`${environment.apiurl}/users/${id}`) 
  }
  getUserById(id:number) {
    return this.http.get<User>(`${environment.apiurl}/users/${id}`);
  }
  updateUserInfo(id:number,user: User): Observable<User>{
    return this.http.put<User>(`${environment.apiurl}/users/${id}`, user);
 }
}
