import { Component, OnInit } from '@angular/core';
import {Book} from '../model/book';
import {Category} from '../model/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../service/book/book.service';
import {CategoryService} from '../service/category/category.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  selectedFile = null;
  book: Book = {};
  categories: Category[] = [];
  bookForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(),
    author: new FormControl(),
    image: new  FormControl(),
    category: new FormControl()
  });
  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.getAllCategory();
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  get idControl() {
    return this.bookForm.get('id');
  }

  get nameControl() {
    return this.bookForm.get('name');
  }

  create() {
    const data: FormData = new FormData();
    data.append('name', this.bookForm.get('name').value);
    data.append('price', this.bookForm.get('price').value);
    data.append('author', this.bookForm.get('author').value);
    data.append('image', this.selectedFile);
    data.append('category', this.bookForm.get('category').value);
    if (this.bookForm.invalid) {
    return;
    } else {
      const book = data;
      this.bookService.create(book).subscribe(() => {
        this.router.navigateByUrl('/');
      });
      this.bookForm.reset();
    }
  }
}
