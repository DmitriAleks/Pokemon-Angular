import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";



interface PokemonListResponse {
  count: number
  next: string
  previous: null
  results: [{name: string, url: string}]
}

@Injectable({providedIn: 'root'})

export class HttptService {

  constructor(private http: HttpClient) {
  }

  getPokemonsList(limit: number,offset: number): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`https://pokeapi.co/api/v2/ability/?limit=${limit}&offset=${offset}`)
  }

}
