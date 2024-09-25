import { AbstractView } from "../../common/view.js";
import onChange from 'on-change'
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";

export class MainView extends AbstractView {
  stateMainView = {
    numFound: 0,
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0,
    page: null
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this))
    this.stateMainView = onChange(this.stateMainView, this.stateMainViewHook.bind(this))
    this.setTitle('Поиск книг');
  }

  destroy(){
    onChange.unsubscribe(this.appState)
    onChange.unsubscribe(this.stateMainView)
  }

  appStateHook(path) {
    if(path === 'favorites'){
      this.render()
    }
  }

  async stateMainViewHook(path) {
    if(path === 'searchQuery') {
      this.stateMainView.loading = true;
      const data = await this.loadList(this.stateMainView.searchQuery, this.stateMainView.offset)
      this.stateMainView.loading = false;
      console.log(data);
      this.stateMainView.numFound = data.numFound;
      this.stateMainView.list = data.docs;
    }
    if(path === 'loading' || path === 'list') {
      this.render();
    }
  }

  async loadList(q, offset) {
    console.log('response')
    const res = await fetch(`http://openlibrary.org/search.json?q=${q}&offset=${offset}`)
    return res.json()
  }

  render(){
    const main = document.createElement('div');

    const elSearching = document.createElement('h1')
    elSearching.innerHTML = `Найдено книг - ${this.stateMainView.numFound}`;

    main.append(new Search(this.stateMainView).render())
    main.append(elSearching)
    main.append(new CardList(this.appState, this.stateMainView).render())
    this.app.innerHTML = '';
    this.app.append(main);
    this.renderHeader();
  }

  renderPagination(){
    
  }

  renderHeader() {
    const header = new Header(this.appState).render()
    this.app.prepend(header)
  }
}