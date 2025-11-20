import { Genre } from "./Genre.model";
export interface Chanson {
  idChanson?: number;
  titre?: string;
  artiste?: string;
  duree?: number;
  dateSortie?: Date;
  Genre : Genre;
  email?:string;
}
