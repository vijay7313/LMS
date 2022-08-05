import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { CarouselComponent } from './common/carousel/carousel.component';
import { BooksComponent } from './books/books.component';
import { BookService } from './services/book.service';
import { CartService } from './services/cart.service';
import { LoginComponent } from './user-login/login/login.component';
import { RegisterComponent } from './user-login/register/register.component';
import { LandingComponent } from './common/landing/landing.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { FilterComponent } from './common/filter/filter.component';
import { FilterbookPipe } from './pipes/filter.pipe';
import { CartComponent } from './common/cart/cart.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BooksComponent,
    CarouselComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    AddUserComponent,
    ViewUserComponent,
    EditUserComponent,
    FilterComponent,
    FilterbookPipe,
    CartComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    BookService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }