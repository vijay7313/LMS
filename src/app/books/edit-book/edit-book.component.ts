import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/books';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  editBook!:Book
  addBookForm: any;
  submitDisabled: boolean = false;
  errorMessage: string = "";
  bookId: string = "";
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private bookService:BookService) { }

  @ViewChild('BookName') BookName!: ElementRef
  @ViewChild('Descrption') Descrption!: ElementRef
  @ViewChild('category') category!: ElementRef
  @ViewChild('author') author!: ElementRef
  @ViewChild('year') year!: ElementRef
  @ViewChild('rating') rating!: ElementRef
  @ViewChild('count') count!: ElementRef
  
  ngOnInit(): void {
    if(sessionStorage.getItem("auth_data") != null) { 
      this.bookId = this.router.url.split("/")[2];
      let id: number = +this.bookId;
      this.bookService.getBookById(id).subscribe(res => {
        this.editBook = res
        console.log(this.editBook);
      });
    } else { this.router.navigateByUrl('/'); }    
  }
  updateBook() {
    this.editBook.title = this.BookName.nativeElement.value
    this.editBook.description = this.Descrption.nativeElement.value
    this.editBook.category = this.category.nativeElement.value
    // this.book.image = this.image.nativeElement.value
    this.editBook.author = this.author.nativeElement.value
    this.editBook.yearOfRelease = this.year.nativeElement.value
    this.editBook.rating = this.rating.nativeElement.value
    this.editBook.count = this.count.nativeElement.value
    this.bookService.UpdateBookInfo(this.editBook.id, this.editBook).subscribe(res => {
      this.router.navigate(['books']);
    })
}
}
