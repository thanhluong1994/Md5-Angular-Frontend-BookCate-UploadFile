import { Component, OnInit } from '@angular/core';
import {Book} from '../model/book';
import {BookService} from '../service/book/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
books: Book[] = [];
  constructor(private bookService: BookService,
              private router: Router) { }

  ngOnInit() {
    this.getAllBook();
  }
getAllBook() {
  this.bookService.getAll().subscribe((data) => {
    this.books = data;
  }, (error) => {
  });
}

}
