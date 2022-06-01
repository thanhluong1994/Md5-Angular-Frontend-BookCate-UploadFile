import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookListComponent} from './book/book-list/book-list.component';
import {CreateBookComponent} from './book/create-book/create-book.component';
import {EditBookComponent} from './book/edit-book/edit-book.component';
import {DeleteBookComponent} from './book/delete-book/delete-book.component';


const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: 'create',
    component: CreateBookComponent
  },
  {
    path: 'edit/:id',
    component: EditBookComponent
  },
  {
    path: 'delete/:id',
    component: DeleteBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
