import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chansons',
  standalone: true,
  templateUrl: './chansons.html',
  styleUrls: ['./chansons.css'],
  imports: [DatePipe,RouterLink,CommonModule,]
})
export class Chansons implements OnInit {
  chansons: Chanson[] = [];
  constructor(private chansonService: ChansonService,  public auth: AuthService
) { this.chansons = chansonService.listeChansons(); }

  ngOnInit(): void {
  }
  supprimerChanson(ch: Chanson) {
    let conf = confirm("Etes-vous sûr de supprimer la chanson?");
    if (conf)
      this.chansonService.supprimerChanson(ch)
  }

}
