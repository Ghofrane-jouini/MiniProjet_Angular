import { Component, OnInit } from '@angular/core';
import { ChansonService } from '../services/chanson.service';
import { Genre } from '../model/Genre.model';
import { CommonModule } from '@angular/common';
import { UpdateGenre } from '../update-genre/update-genre';

@Component({
  selector: 'app-liste-genres',
  imports: [CommonModule, UpdateGenre],
  templateUrl: './liste-genres.html',
  styles: ``
})
export class ListeGenres implements OnInit {
  Genres!: Genre[];
  ajout: boolean = true;
  constructor(private chansonService: ChansonService) { }
  ngOnInit(): void {
    this.Genres = this.chansonService.listeGenres();
    console.log(this.Genres);
  }
  updatedGenre: Genre = { "idGen": 0, "nomGen": "" };
  GenreUpdated(g: Genre) {
    //console.log("Genre mis à jour :", g);

    this.chansonService.ajouterGenre(g);
    this.Genres = this.chansonService.listeGenres();
  }
  chargerGenres() {
    const result = this.chansonService.listeGenres();
    this.Genres = result;
    console.log(result);
  }
  updateGenre(Gen: Genre) {
    this.updatedGenre = Gen;
    this.ajout = false;
  }

}