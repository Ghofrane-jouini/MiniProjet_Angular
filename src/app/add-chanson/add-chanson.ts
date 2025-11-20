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

  newChanson: Chanson = {
    idChanson: 0,
    titre: '',
    artiste: '',
    duree: 0,
    dateSortie: new Date(),
    Genre: { idGen: 0, nomGen: '' }
  };

  Genres!: Genre[];
  myForm!: FormGroup;

  constructor(
    private chansonService: ChansonService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.Genres = this.chansonService.listeGenres();

    this.myForm = this.formBuilder.group({
      idChanson: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      titre: ['', [Validators.required, Validators.minLength(3)]],
      artiste: ['', [Validators.required]],
      duree: [0, [Validators.required, Validators.min(0)]],
      dateSortie: ['', Validators.required],
      idGen: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addChanson() {
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
  }
}
