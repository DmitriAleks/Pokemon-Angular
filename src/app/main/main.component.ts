import {Component} from "@angular/core";
import {catchError, Subscription, tap, throwError} from "rxjs";
import {HttptService, PokemonInfoResponse} from "../services/httpt.service";

enum RESPONSE_STATUS {
  LOADER = 'loader',
  SUCCESS = 'success',
  ERROR = 'error',
  INTRO = 'intro',
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  status = RESPONSE_STATUS.LOADER
  offset = 0
  limit = 20
  pages = []
  currentPage = 1
  pokemonList: PokemonInfoResponse[] = []
  leftPortionPageNumber = 0;
  rightPortionPageNumber = 10;

  private subscription = new Subscription();

  constructor(private httpRequest: HttptService) {
  }

  getPokemonList(limit:number, offset:number) {
    this.subscription.add(this.httpRequest.getPokemonsList(limit, offset)
      .pipe(
        catchError((err) => {
            this.status = RESPONSE_STATUS.ERROR
            return throwError(err);
          },
        ),
      ).subscribe(
        response => {
          this.pokemonList = []
          response.results.map(el=>{
            this.httpRequest.getPokemonInfo(el.name).subscribe(
              response => {
              this.pokemonList.push(response)
              }
            )
          })
          this.status = RESPONSE_STATUS.SUCCESS
          this.pages = []
          for (let i = 1; i <= Math.ceil(response.count / limit); i++) {
            // @ts-ignore
            this.pages.push(i)
          }
         this.pages =  this.pages.filter(p => p >= this.leftPortionPageNumber && p <= this.rightPortionPageNumber)
        }))
  }

  ngOnInit(): void {
    this.getPokemonList(this.limit, this.offset)
  }

  onGetData() {
    this.getPokemonList(this.limit, this.offset)
  }
  onOpenPage(page:number){
    this.currentPage = page
    this.leftPortionPageNumber = page - 5;
    this.rightPortionPageNumber = page + 5;
    this.getPokemonList(this.limit, (page - 1) * this.limit )
  }

}
