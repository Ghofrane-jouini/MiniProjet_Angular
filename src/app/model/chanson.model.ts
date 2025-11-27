import { Genre } from "./Genre.model";

export class Chanson {
  idChanson?: number;
  titre?: string;
  artiste?: string;
  duree?: number;
  dateSortie?: string;
  genre!: Genre;   
  email?: string;

}
