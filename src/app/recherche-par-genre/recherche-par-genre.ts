import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Genre } from '../model/Genre.model';
import { AuthService } from '../services/auth.service';
import { GenreWrapper } from '../model/GenreWrapped';

@Component({
  selector: 'app-recherche-par-genre',
  standalone: true,
  imports: [DatePipe, RouterLink, CommonModule, FormsModule],
  templateUrl: './recherche-par-genre.html',
})
export class RechercheParGenre implements OnInit {

  Genres: Genre[] = [];
  chansons: Chanson[] = [];
  idGenre!: number;
  allChansons: Chanson[] = [];
  constructor(private chansonService: ChansonService, public auth: AuthService) { }

  ngOnInit(): void {
    this.chansonService.listeGenres().subscribe(GenreWrapper => {
      this.Genres = GenreWrapper._embedded.genres;
      if (this.Genres.length > 0) {
        this.idGenre = this.Genres[0].idGen;
        this.onChange();
      }
    });
  }

  onChange() {
  const GenreIdNum = Number(this.idGenre);
  console.log("Selected genre ID:", GenreIdNum);

  this.chansonService.rechercherParGenre(GenreIdNum).subscribe(chansons => {
    this.chansons = chansons;
    console.log("chansons from API filtered by genre:", this.chansons);
  });
}



  supprimerChanson(ch: Chanson) {
    let conf = confirm("Etes-vous sûr de supprimer la chanson?");
    if (conf) {
      this.chansonService.supprimerChanson(ch.idChanson!)
        .subscribe(() => {this.onChange();        });
    }
  }
}
