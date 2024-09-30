import { DivComponent } from "../../common/div-component.js";
import { Card } from "../card/card.js";
import { Pagination } from "../pagination/pagination.js";
import './card-list.css'

export class CardList extends DivComponent {
  constructor(appState, parentState) {
    super();
    this.appState = appState;
    this.parentState = parentState;
  }

  render() {
    if(this.parentState.loading){
      this.el.innerHTML = '<div class="card_list__loader">Загрузка</div>';
      return this.el;
    }
    this.el.classList.add('card_list');
    const cardGrid = document.createElement('div');
    cardGrid.classList.add('card__grid');
    this.el.append(cardGrid);

    for(const cardState of this.parentState.list){
      cardGrid.append(new Card(this.appState, cardState).render());
    }
    this.el.append(new Pagination(this.parentState).render());
    
    return this.el;
  }
}