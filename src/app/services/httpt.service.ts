import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";


interface PokemonListResponse {
  count: number
  next: string
  previous: null
  results: [{ name: string, url: string }]
}

export interface PokemonInfoResponse {
  name: string
  sprites: {
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
  }

}

@Injectable({providedIn: 'root'})

export class HttptService {

  constructor(private http: HttpClient) {
  }

  getPokemonsList(limit: number, offset: number): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
  }

  getPokemonInfo(name: string): Observable<PokemonInfoResponse> {
    return this.http.get<PokemonInfoResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`)
  }
}
