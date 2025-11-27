import { Genre } from './Genre.model';
export class GenreWrapper{
_embedded!: { genres: Genre[]};
}
