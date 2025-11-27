import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChansonService } from '../services/chanson.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Genre } from '../model/Genre.model';

@Component({
  selector: 'app-update-chanson',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-chanson.html',
  styles: ``,
})
export class UpdateChanson implements OnInit {
  currentChanson = {} as Chanson;

  Genres!: Genre[];
  updatedGenId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chansonService: ChansonService
  ) { }

  ngOnInit(): void {
    // Charger les genres
    this.chansonService.listeGenres().
      subscribe(gens => {
        console.log(gens);
        this.Genres = gens._embedded.genres;
      }
      );
    this.chansonService.consulterChanson(this.activatedRoute.snapshot.params['id'])
  .subscribe(gen => {
    this.currentChanson = gen;
    // تحويل التاريخ
    if (this.currentChanson.dateSortie) {
      const d = new Date(this.currentChanson.dateSortie);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      this.currentChanson.dateSortie = `${yyyy}-${mm}-${dd}`;
    }

    // genre
    if (this.currentChanson.genre) {
      this.updatedGenId = this.currentChanson.genre.idGen;
    }
  });


  }

  updateChanson() {
    // Mettre à jour le genre sélectionné
    this.currentChanson.genre = this.Genres.find(
      (gen) => gen.idGen == this.updatedGenId
    )!;

    // Appeler le service pour mettre à jour
    this.chansonService.updateChanson(this.currentChanson).subscribe((chan) => {
      this.router.navigate(['/chansons']);
    });
  }
}
