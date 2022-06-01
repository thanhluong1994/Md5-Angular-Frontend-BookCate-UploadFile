import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../../model/book';
import {environment} from '../../../../environments/environment';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Book[]> {
    return  this.http.get<Book[]>(`${API_URL}/books`);
  }

  create(book): Observable<Book> {
    return this.http.post<Book>(`${API_URL}/books`, book);
  }

  findById(id): Observable<Book> {
    return this.http.get(`${API_URL}/books/${id}`);
  }
   update(id, data): Observable<Book> {
    return this.http.post(`${API_URL}/books/${id}`, data);
   }

   delete(id): Observable<Book> {
    return this.http.delete(`${API_URL}/books/${id}`);
   }
}
