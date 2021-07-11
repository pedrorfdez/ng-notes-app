import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { NoteService } from "../../../services/notes/note.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  buttonPressed = false;

  category: any = {
    categoryName: '',
    categoryDescription: ''
  }

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
  }

  addCategory() {
    this.noteService.addCategory(this.category)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  switch() {
    this.buttonPressed = !this.buttonPressed;
  }

}
