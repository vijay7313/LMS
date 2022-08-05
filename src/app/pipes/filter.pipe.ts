import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/books';

@Pipe({
  name: 'filterbook'
})
export class FilterbookPipe implements PipeTransform {

  transform(books: Book[], category: string) {
    if (category == "All") {
      return books;
    }
    else {
      return books.filter(book =>
        book.category==category)
    }
  }
}
