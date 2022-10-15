import {Component} from "@angular/core";
import {catchError, Subscription, throwError} from "rxjs";
import {HttptService} from "../services/httpt.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent {
  pokemonList!: [{ name: string, url: string }]
  status = 'loader'
  offset = 0
  limit = 20
  pages = []

  private subscription = new Subscription();

  constructor(private httpRequest: HttptService) {
  }

  getPokemonList(limit:number, offset:number) {
    this.subscription.add(this.httpRequest.getPokemonsList(limit, offset)
      .pipe(
        catchError((err) => {
            console.log(err);
            this.status = 'error'
            return throwError(err);
          },
        ),
      ).subscribe(
        response => {
          this.pokemonList = response.results
          this.status = 'success'
          this.pages = []
          for (let i = 1; i <= Math.ceil(response.count / limit); i++) {
            // @ts-ignore
            this.pages.push(i)
          }
        }))
  }

  ngOnInit(): void {
    this.getPokemonList(this.limit, this.offset)
  }

  onGetData() {
    this.getPokemonList(this.limit, this.offset)
  }
  onOpenPage(page:number){
    this.getPokemonList(this.limit, (page - 1) * this.limit )
  }

}
