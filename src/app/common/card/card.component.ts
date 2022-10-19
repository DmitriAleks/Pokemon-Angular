import {Component, Input} from "@angular/core";
import {PokemonInfoResponse} from "../../services/httpt.service";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {

  @Input('pokemon') pokemon! : PokemonInfoResponse

}
