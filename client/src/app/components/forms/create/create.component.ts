import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { NoteService } from "../../../services/notes/note.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  category: any = {
    categoryId: '',
    categoryName: ''
  };

  note: any = {
    noteName: '',
    noteText: ''
  }

  editMode: Boolean = false;

  constructor(private noteService: NoteService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams
      .subscribe(
        res => this.category = res,
        err => console.log(err)
      );
  }

  createNote() {
    this.note.categoryId = this.category.categoryId;
    this.noteService.createNote(this.note)
      .subscribe(
        res => {
          this.router.navigate(['/'], {queryParams: {categoryId: this.category.categoryId, categoryName: this.category.categoryName}});
        },
        err => console.log(err)
      )
    
  }

  editNote() {
    this.noteService.editNote(this.note.noteId, this.note)
      .subscribe(
        res => {          
          this.router.navigate(['/'], {queryParams: {categoryId: this.category.categoryId, categoryName: this.category.categoryName}});
        },
        err => console.log(err)
      )
    
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.noteService.getNote(params.id)
        .subscribe(
          res => {
            let temp: any = res;
            this.note = temp[0];            
            this.editMode = true;
          },
          err => console.log(err)
        )
    }
    
    
  }

}
