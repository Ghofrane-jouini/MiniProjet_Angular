import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Genre } from '../model/Genre.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recherche-par-genre',
  imports: [DatePipe, RouterLink, CommonModule, FormsModule],
  templateUrl: './recherche-par-genre.html',
  standalone: true
})
export class RechercheParGenre implements OnInit {
  Genres!: Genre[] ;
  chansons!: Chanson[];
  idGenre!: number;

  constructor(private chansonService: ChansonService ,public auth: AuthService) { }
  ngOnInit(): void {
    this.Genres=this.chansonService.listeGenres();
    this.chansons = this.chansonService.listeChansons();
  }
  onChange() {
    console.log("this.idGenre");
    this.chansons=this.chansonService.rechercheParGenre(this.idGenre);
  }
  supprimerChanson(ch: Chanson) {
    let conf = confirm("Etes-vous sûr de supprimer la chanson?");
    if (conf)
      this.chansonService.supprimerChanson(ch)
      this.chansons=this.chansonService.rechercheParGenre(this.idGenre);
  }

}
