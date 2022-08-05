import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from './books-routing.module';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { EditBookComponent } from './edit-book/edit-book.component';


@NgModule({
  declarations: [
    AddbooksComponent,
    EditBookComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class BooksModule { }
