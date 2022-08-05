import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable,map,tap, shareReplay, Subject } from 'rxjs';
import { User } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthcontrolService {
  checklogin: boolean = false;
  private subject = new BehaviorSubject<any>(null);
  user$: Observable<User> = this.subject.asObservable(); 
  userId: any;
  isLoggedIn$: Observable<boolean>;
  isLoggedOff$ : Observable<boolean>;

  
  constructor(private http: HttpClient, private router: Router) { 
    this.isLoggedIn$ = this.user$.pipe(map(user => !(!user)));
    this.isLoggedOff$ = this.user$.pipe(map(loggedIn => !loggedIn));
    const user = localStorage.getItem("auth_data");
    if (user) {
      this.subject.next(JSON.parse(user));
      console.log("=====>"+this.isLoggedIn$)
    }
  }
  
  login(userName: string, password: string): Observable<User[]> {
    
    return this.http.get<User[]>(environment.apiurl + `/users?userName=${userName}`)
      .pipe(
        tap(user => {
          this.subject.next(user[0]);          
          if (user.length >= 1) {
            sessionStorage.setItem("auth_data", JSON.stringify(user[0]));            
          }
        })        
    );    
  }

  logout() {
    this.subject.next(null);
    sessionStorage.removeItem("auth_data");
    sessionStorage.removeItem("loginType");
    this.router.navigateByUrl('/login');
    setTimeout(() => {
        window.location.reload();
    }, 300);    
  }

  public isUserLoggedIn() {
    return (sessionStorage.getItem("auth_data") ? true : false);
  }

  public getLoginType() {
     return sessionStorage.getItem("loginType");
  }

  public getUserName() {
    return sessionStorage.getItem("userName");
 }

}