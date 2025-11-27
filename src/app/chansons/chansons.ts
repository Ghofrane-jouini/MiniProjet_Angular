import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { Genre } from '../model/Genre.model';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chansons',
  standalone: true,
  templateUrl:'./chansons.html',
  styleUrls: ['./chansons.css'],
  imports: [DatePipe, RouterLink, CommonModule, FormsModule]
})
export class Chansons implements OnInit {

  chansons: Chanson[] = [];
  nouvelleChanson: Chanson = new Chanson();

  constructor(private chansonService: ChansonService, public auth: AuthService) {}

  ngOnInit() {
    this.chargerChansons();
  }

 chargerChansons() {
  this.chansonService.listeChansons().subscribe({
    next: (chansons) => {
      this.chansons = chansons.map(c => ({
        ...c,
        genre: c.genre ? c.genre : { idGen: 0, nomGen: "Inconnu" } 
      }));
      console.log("Chansons reçues :", this.chansons);
    },
    error: (err) => console.error("Erreur API:", err)
  });
}


  supprimerChanson(chanson: Chanson) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.chansonService.supprimerChanson(chanson.idChanson!).subscribe(() => {
        console.log("chanson supprimé");
        this.chargerChansons();
      });
  }




}
