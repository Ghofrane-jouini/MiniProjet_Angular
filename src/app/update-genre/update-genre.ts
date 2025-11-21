import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../model/Genre.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-genre',
  imports: [FormsModule],
  templateUrl: './update-genre.html',
  styles: ``
})
export class UpdateGenre {
  @Input()
  Genre?: Genre;
  @Input()
  ajout?: boolean;
  @Output()
  GenreUpdated = new EventEmitter<Genre>();
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateGenre ", this.Genre);
  }
  saveGenre() {
    this.GenreUpdated.emit(this.Genre);
  }
}