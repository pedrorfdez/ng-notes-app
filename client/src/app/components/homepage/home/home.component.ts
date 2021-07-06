import { Component, OnInit } from '@angular/core';

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

  constructor(private noteService: NoteService) { }

  notesSelector(categoryId: string) {
    this.getCategoryNotes(categoryId);
    this.showNotes = true;
  }

  ngOnInit(): void {
    this.getCategories();
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
}
