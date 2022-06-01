import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BookService} from '../service/book/book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
  selectedFile = null;
bookForm: FormGroup = new FormGroup({
  id: new FormControl(),
  name: new FormControl(),
  price: new FormControl(),
  author: new FormControl(),
  image: new FormControl(),
  category: new FormControl()
});
id: number;
  constructor(private bookService: BookService,
              private activatedService: ActivatedRoute,
              private router: Router) {
    this.activatedService.paramMap.subscribe((paramMap) => {
      this.id = +paramMap.get('id');
      this.getBookId(this.id);
    });
  }

  ngOnInit() {
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  getBookId(id) {
    this.bookService.findById(id).subscribe((book) => {
      this.bookForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl(book.name),
        price: new FormControl(book.price),
        author: new FormControl(book.author),
        image: new FormControl(book.image),
        category: new FormControl(book.category.id)
      });
    });
  }
delete(id) {
    this.bookService.delete(id).subscribe(() => {
      this.router.navigateByUrl('/');
    });
}
}
