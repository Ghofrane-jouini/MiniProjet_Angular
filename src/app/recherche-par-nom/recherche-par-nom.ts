import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchFilterPipe } from '../search-filter-pipe';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [DatePipe, FormsModule, SearchFilterPipe, CommonModule, RouterLink],
  templateUrl: './recherche-par-nom.html',
})
export class RechercheParNom implements OnInit {

  nomGen!: string;
  titre!: string;
  chansons: Chanson[] = [];
  allchansons: Chanson[] = [];
  searchTerm: string = '';

  constructor(private chansonService: ChansonService, public auth: AuthService) { }

  ngOnInit(): void {
    this.chansonService.listeChansons().subscribe(chans => {
      this.chansons = chans;
      this.allchansons = chans;
    });
  }

  rechercherChanson() {
    this.chansonService.rechercherParNom(this.titre).subscribe(chansons => {
      console.log(chansons);
      this.chansons = chansons;
    });
  }

  onKeyUp(filterText: string) {
    const text = filterText.toLowerCase();
    this.chansons = this.allchansons.filter(item =>
      item.titre?.toLowerCase().includes(text)
    );
  }

  supprimerChanson(chanson: Chanson) {
    if (confirm("Voulez-vous vraiment supprimer cette chanson ?")) {
      this.chansonService.supprimerChanson(chanson.idChanson!).subscribe(() => {
        this.chansons = this.chansons.filter(c => c.idChanson !== chanson.idChanson);
      });
    }
  }
}
