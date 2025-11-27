import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { Router } from '@angular/router';
import { Genre } from '../model/Genre.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-chanson',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-chanson.html',
  styleUrls: ['./add-chanson.css']
})
export class AddChanson implements OnInit {

  newChanson = new Chanson();
  message!: string;
  Genres!: Genre[];
  newIdGen!: number;
  newGenre!: Genre;
  myForm!: FormGroup;

  constructor(
    private chansonService: ChansonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.chansonService.listeGenres().
      subscribe(gens => {
        console.log(gens);
        this.Genres = gens._embedded.genres;
      }
      );

  }

  /*addChanson() {
    const formValues = this.myForm.value;

    const existingIds = this.chansonService.listeChansons().map(ch => ch.Genre.idGen);

    //if (existingIds.includes(Number(formValues.idGen))) {
    //alert("Cet ID existe déjà ! Veuillez en choisir un autre.");
    // return;}

    const chansonToAdd: Chanson = {
      idChanson: Number(formValues.idChanson),
      titre: formValues.titre,
      artiste: formValues.artiste,
      duree: formValues.duree,
      dateSortie: formValues.dateSortie,
      Genre: this.chansonService.consulterGenre(Number(formValues.idGen))
    };

    this.chansonService.ajouterChanson(chansonToAdd);
    this.router.navigate(['/chansons']);
  }*/
  addChanson() {
  if (!this.newIdGen) {
    alert('Veuillez sélectionner un genre valide!');
    return;
  }

  this.chansonService.consulterGenre(this.newIdGen).subscribe({
    next: (genre) => {
      this.newChanson.genre = genre;

      this.newChanson.idChanson = undefined;

      this.chansonService.ajouterChanson(this.newChanson).subscribe({
        next: (chan) => {
          console.log('Chanson ajoutée:', chan);
          this.router.navigate(['/chansons']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout:', err);
          alert('Erreur lors de l\'ajout de la chanson.');
        }
      });
    },
    error: (err) => {
      console.error('Erreur lors de la récupération du genre:', err);
      alert('Impossible de récupérer le genre sélectionné.');
    }
  });
}


}
