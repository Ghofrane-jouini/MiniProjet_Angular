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
  Genres: Genre[] = [];
  ajout: boolean = true;
  newGenre: Genre = { idGen: 0, nomGen: '' };
  updatedGenre: Genre = { idGen: 0, nomGen: '' };

  constructor(private chansonService: ChansonService) { }

  ngOnInit(): void {
    this.chargerGenres();
  }

  // Fonction pour ajouter un nouveau genre
  ajouterGenre() {
    if (!this.newGenre.nomGen || this.newGenre.nomGen.trim() === '') {
      alert("Veuillez entrer un nom de genre valide !");
      return;
    }

    this.chansonService.ajouterGenre(this.newGenre).subscribe({
      next: (res) => {
        console.log("Genre ajouté:", res);
        this.newGenre = { idGen: 0, nomGen: '' }; // reset form
        this.chargerGenres();
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout du genre:", err);
        alert("Impossible d'ajouter ce genre.");
      }
    });
  }

  // Fonction pour mettre à jour un genre existant
  updateGenre(Gen: Genre) {
    this.updatedGenre = { ...Gen };
    this.ajout = false;
  }

  // Fonction pour recharger la liste des genres
  chargerGenres() {
    this.chansonService.listeGenres().subscribe(res => {
      this.Genres = res._embedded.genres;
      console.log("Genres chargés :", this.Genres);
    });
  }
}
