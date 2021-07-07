import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { NoteService } from "../../../services/notes/note.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: any = [];
  
  notes: any = [];

  showNotes: Boolean = false;

  currentCategory: any = {
    categoryId: '',
    categoryName: ''
  };

  showNotesToggler() {
    this.showNotes = !this.showNotes
  }

  queryParams: any = {};

  constructor(private noteService: NoteService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams
      .subscribe((params) => this.queryParams = params, err => console.log(err)
      )
  }

  notesSelector(categoryId: string, categoryName: string) {
    this.getCategoryNotes(categoryId);
    this.showNotesToggler();
    this.currentCategory = {categoryId, categoryName};
  }

  ngOnInit(): void {
    this.getCategories();
    if (this.queryParams.categoryId) {
      this.notesSelector(this.queryParams.categoryId, this.queryParams.categoryName);
    }
  }

  getCategories() {
    this.noteService.getCategories()
      .subscribe(
        res => {
          this.categories = res;
        },
        err => console.log(err)
      );
  };

  getCategoryNotes(categoryId: string) {
    this.noteService.getCategoryNotes(categoryId)
      .subscribe(
        res => {
          this.notes = res;
        },
        err => console.log(err)
      );
  };

  deleteNote(noteId: string, index: number) {
    this.noteService.deleteNote(noteId)
      .subscribe();
    this.notes.splice(index, 1);
  }
}
