import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbooksComponent } from './books/addbooks/addbooks.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { BooksComponent } from './books/books.component';
import { LandingComponent } from './common/landing/landing.component';
import { LoginComponent } from './user-login/login/login.component';
import { RegisterComponent } from './user-login/register/register.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { CartComponent } from './common/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent,
    // canActivate:[AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(module => module.BooksModule),
    // canActivate:[AuthGuard]
    // data: { preload:true }
  },
  {
    path: 'addBook', component: AddbooksComponent,
    // canActivate:[AuthGuard]
  },
  {
    path: 'viewUsers', component: ViewUserComponent,
    canActivate:[AuthGuard]
  },
  // {
  //   path: 'addUser', component: AddUserComponent,
  //   // canActivate:[AuthGuard]
  // },
  {
    path: 'edituser/:id', component: EditUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editbook/:id', component: EditBookComponent,
    canActivate: [AuthGuard]
  
  },
  { path: 'cart/:id', component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', component: PageNotFoundComponent,
    // canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
