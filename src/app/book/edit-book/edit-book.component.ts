import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../model/category';
import {BookService} from '../service/book/book.service';
import {CategoryService} from '../service/category/category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  selectedFile = new File(['none'], 'filename.jpg');
  bookForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    author: new FormControl(),
    image: new FormControl(),
    category: new FormControl()
  });
  id: number;
  categories: Category[] = [];
  image = null;
  constructor(private bookService: BookService,
              private categoriesService: CategoryService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
    this.activatedRouter.paramMap.subscribe((paramMap) => {
      this.id = + paramMap.get('id');
      this.getBookById(this.id);
    });
  }

  ngOnInit() {
    this.getAllCategory();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile);
  }

  getBookById(id: number) {
    return this.bookService.findById(id).subscribe((book) => {
      this.image = book.image;
      this.bookForm = new FormGroup({
        id: new FormControl(book.id),
        name: new FormControl(book.name),
        price: new FormControl(book.price),
        author: new FormControl(book.author),
        image: new FormControl(),
        category: new FormControl(book.category.id)
      });
    });
  }
  updateBook(id: number) {
    const book: FormData = new FormData();
    book.append('id', this.bookForm.get('id').value);
    book.append('name', this.bookForm.get('name').value);
    book.append('price', this.bookForm.get('price').value);
    book.append('author', this.bookForm.get('author').value);
    book.append('image', this.selectedFile);
    book.append('category', this.bookForm.get('category').value);
    this.bookService.update(id, book).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  getAllCategory() {
    this.categoriesService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  get nameControl() {
    return this.bookForm.get('name');
  }
}
