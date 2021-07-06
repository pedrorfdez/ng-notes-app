import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(`${this.API_URI}/categories`);
  };

  getCategoryNotes(categoryId: string) {
    return this.http.get(`${this.API_URI}/notes/${categoryId}`);
  };

  getNote(noteId: string) {
    return this.http.get(`${this.API_URI}/note/${noteId}`);
  };
}
