import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchFilterPipe } from '../search-filter-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [DatePipe, FormsModule,SearchFilterPipe,CommonModule,RouterLink],
  templateUrl: './recherche-par-nom.html',
  standalone: true
})
export class RechercheParNom implements OnInit{
  nomGen!: string;
  titre!: string;
  chansons!: Chanson[] ;
  allchansons!: Chanson[];
  searchTerm: string='';

  constructor(private chansonService: ChansonService) { }
  ngOnInit(): void {
    this.chansons = this.chansonService.listeChansons();
    this.allchansons = this.chansonService.listeChansons();
  }
  rechercherChanson() {
  this.chansonService.rechercherParNom(this.titre)
    .subscribe(chansons => {
      console.log(chansons);
      this.chansons = chansons;
    });
}
  
  onKeyUp(filterText: string) {
    this.chansons = this.allchansons.filter(item =>
      item.titre?.toLowerCase().includes(filterText));
  }
  supprimerChanson(chanson: Chanson) {
  if (confirm("Voulez-vous vraiment supprimer cette chanson ?")) {
    this.chansonService.supprimerChanson(chanson);
    this.chansons = this.chansons.filter(c => c.idChanson !== chanson.idChanson);
  }
}

}
