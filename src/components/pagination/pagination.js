import { DivComponent } from "../../common/div-component.js";
import './pagination.css'

export class Pagination extends DivComponent {
  #isActivePaginationButton = {
    nextButton : true,
    preveousButton : true,
  };
  #totalPages;
  #currentPage;

  constructor(parentState) {
    super();
    this.parentState = parentState; 
    this.#totalPages = Math.ceil(this.parentState.numFound /  this.parentState.cardsPerPage);
    this.#currentPage = this.parentState.offset ? (this.parentState.offset /  this.parentState.cardsPerPage) + 1 : 1;
  }

  #changePage(buttonType){
    if(buttonType === 'nextButton'){
      this.parentState.offset  +=  this.parentState.cardsPerPage;
    }else{
      this.parentState.offset  -=  this.parentState.cardsPerPage;
    }
  }

  render() {
    this.el.classList.add('pagination_block');
    this.el.innerHTML = `
      <button id="preveousButton" class="pagination__button_previous">Предыдущая страница</button>
      <button id="nextButton" class="pagination__button_next">Следующая страница</button>
    `;
    if(this.#totalPages === 1){
      this.#isActivePaginationButton.nextButton = false;
      this.#isActivePaginationButton.preveousButton = false;
    }else{
      if(this.#currentPage === 1){
        this.#isActivePaginationButton.preveousButton = false;
      }
      if(this.#currentPage === this.#totalPages){
        this.#isActivePaginationButton.nextButton = false;
      }
    }
    for(const elKey in this.#isActivePaginationButton){
      if(this.#isActivePaginationButton[elKey]){
        const buttonEl = this.el.querySelector(`#${elKey}`)
        buttonEl.classList.add('active')
        buttonEl.addEventListener('click', () => this.#changePage(elKey))
      }
    }
    return this.el;
  }
}