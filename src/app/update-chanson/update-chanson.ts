import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import type { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { Genre } from '../model/Genre.model';

@Component({
  selector: 'app-update-chanson',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-chanson.html',
  styles: []
})
export class UpdateChanson implements OnInit {
  currentChanson: Chanson = {
    idChanson: 0, titre: '', artiste: '', duree: 0, dateSortie: new Date(), Genre: { idGen: 0, nomGen: '' }
  };
  Genres!: Genre[];
  updatedGenId!: number;
  myForm!: FormGroup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chansonService: ChansonService,
    private formBuilder: FormBuilder
  ) { }
  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month, day].join('-');
  }

  ngOnInit(): void {
    this.Genres = this.chansonService.listeGenres();
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.currentChanson = this.chansonService.consulterChanson(id)!;
    this.updatedGenId = this.currentChanson.Genre.idGen;
    const formattedDate = this.formatDate(this.currentChanson.dateSortie!);

    this.myForm = this.formBuilder.group({
      idChanson: [this.currentChanson.idChanson, [Validators.required, Validators.pattern("^[0-9]*$")]],
      titre: [this.currentChanson.titre, [Validators.required, Validators.minLength(3)]],
      artiste: [this.currentChanson.artiste, Validators.required], 
      duree: [this.currentChanson.duree, [Validators.required, Validators.min(0)]],
      dateSortie: [formattedDate, Validators.required],
      idGen: [this.currentChanson.Genre!.idGen, Validators.required],
      email: [this.currentChanson.email, [Validators.required, Validators.email]]
    });

  }

  updateChanson() {
   
    const formValues = this.myForm.getRawValue();
    const genre = this.chansonService.consulterGenre(formValues.idGen);

    const updatedChanson: Chanson = {
      idChanson: formValues.idChanson,
      titre: formValues.titre,
      artiste: formValues.artiste,
      duree: formValues.duree,
      dateSortie: formValues.dateSortie,
      email: formValues.email,
      Genre: genre
    };

    this.chansonService.updateChanson(updatedChanson);
    this.router.navigate(['/chansons']);
  }




}
