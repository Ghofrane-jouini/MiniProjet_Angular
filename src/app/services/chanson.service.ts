import { Injectable } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { Genre } from '../model/Genre.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenreWrapper } from '../model/GenreWrapped';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ChansonService {

  apiURL: string = 'http://localhost:8081/Chansons/api';
  apiURLGen: string = 'http://localhost:8081/Chansons/gen';

  constructor(private http: HttpClient) {}

  // Chansons
  listeChansons(): Observable<Chanson[]> {
    return this.http.get<Chanson[]>(this.apiURL);
  }

  ajouterChanson(chanson: Chanson): Observable<Chanson> {
    return this.http.post<Chanson>(this.apiURL, chanson, httpOptions);
  }

  consulterChanson(id: number): Observable<Chanson> {
    return this.http.get<Chanson>(`${this.apiURL}/${id}`);
  }

  updateChanson(chanson: Chanson): Observable<Chanson> {
    return this.http.put<Chanson>(`${this.apiURL}/${chanson.idChanson}`, chanson, httpOptions);
  }

  supprimerChanson(id: number): Observable<any> {
  return this.http.delete(`${this.apiURL}/${id}`);
}


  rechercherParNom(nom: string): Observable<Chanson[]> {
    return this.http.get<Chanson[]>(`${this.apiURL}?titre=${nom}`);
  }

  rechercherParGenre(idGen: number): Observable<Chanson[]> {
    return this.http.get<Chanson[]>(`${this.apiURL}/chansGen/${idGen}`);
}


  // Genres
  listeGenres(): Observable<GenreWrapper> {
    return this.http.get<GenreWrapper>(this.apiURLGen);
  }

  ajouterGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.apiURLGen, genre, httpOptions);
  }

  updateGenre(genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${this.apiURLGen}/${genre.idGen}`, genre, httpOptions);
  }

  consulterGenre(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.apiURLGen}/${id}`);
  }
}


