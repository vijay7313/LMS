import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from '../../models/books';

@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.css']
})
export class AddbooksComponent implements OnInit {
  addBookForm: any;
  submitDisabled: boolean = false;
  errorMessage: string = "";

  book: Book = {id:0, name: '', title:'', description:'', author:'', yearOfRelease:'', category:'', image:'', rating:0, count:0}
  
  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService, private formBuilder: FormBuilder) { 
    this.addBookForm = formBuilder.group({
      bookname: [null],
      descrption: [null],
      category: [null],
      author: [null],
      year:[null],
      rating: [null],
      copies: [null]
      
    });
  }
  @ViewChild('BookName') BookName!: ElementRef
  @ViewChild('Descrption') Descrption!: ElementRef
  @ViewChild('category') category!: ElementRef
  @ViewChild('image') image!: ElementRef
  @ViewChild('author') author!: ElementRef
  @ViewChild('year') year!: ElementRef
  @ViewChild('rating') rating!: ElementRef
  @ViewChild('count') count!: ElementRef
  
  ngOnInit(): void {
    if(sessionStorage.getItem("auth_data") != null) { } else { this.router.navigateByUrl('/'); }
  }
  url = "./assets/images/as.jpg";
  addBook() {
    this.submitDisabled = true;
    if (this.addBookForm.valid) {
      this.book.title = this.BookName.nativeElement.value;
      this.book.description = this.Descrption.nativeElement.value;
      this.book.category = this.category.nativeElement.value;
      // this.book.image = this.image.nativeElement.value;
      this.book.author = this.author.nativeElement.value;
      //this.book.yearOfRelease = this.rating.nativeElement.value;
      this.book.rating = this.rating.nativeElement.value;
      this.book.count = this.count.nativeElement.value;
      this.bookService.addBook(this.book).subscribe(response => {
        console.log(response);
        this.router.navigate(['books']);
      })
    }
  }

}