import React from 'react';
import axios from 'axios';
import './MovieSearch.css';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../Tools/LoadingIndicator';

const API_KEY = 'd95e0715a998b10f00c3768041d74ac0'
const API_URL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page='

const POSTER_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';

// contains TMDb logo and renders the SearchBar and Footer components
class MovieSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      query: '',
      clickedPosterID: '',
      modalShow: false,
      genres: [],
      totalResults: 0,
      currentPage: 0,
      loading: false,
      prevY: 0
    }
    
    this.setResults = this.setResults.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.setPosterID = this.setPosterID.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.trackDataPromise = this.trackDataPromise.bind(this);
    this.getData = this.getData.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setPrevY = this.setPrevY.bind(this);
    this.clearResults = this.clearResults.bind(this);
  }

  componentDidMount(){
      this.getGenres()
  }

  getGenres = () => {
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=d95e0715a998b10f00c3768041d74ac0&language=en-US')
      .then(({data}) => {        
        this.setState({
          genres: data.genres
        })
      })
  }

  setResults(newResults, dataTotalPages, dataTotalResults){
    if(this.state.results !== []){
      this.setState(previousState => ({
        results: [...previousState.results, ...newResults],
        totalResults: dataTotalResults,
        totalPages: dataTotalPages
      }))
    } else {
      this.setState({
        results: newResults,
        totalResults: dataTotalResults,
        totalPages: dataTotalPages
      })
    }
  }

  //Possibly not needed
  clearResults = () =>{
    this.setState({
      results: []
    })
  }

  setQuery(newQuery){    
    this.setState({
      query: newQuery
    })    
  }

  setPosterID(newID){
    this.setState({
      clickedPosterID: newID
    })
  }

  setLoading(status){
    if(status === "true")
      this.setState({ loading: true});
    else
      this.setState({ loading: false});
  }

  setPage(page){
    this.setState({
      currentPage: page
    })
  }

  toggleModal(){
    if(this.state.modalShow === false)
      this.setState({
        modalShow: true
      })
    else
      this.setState({
        modalShow: false
      })
  }

  // getData wrapped in promise tracker for loading indicator and to prevent input lag
  trackDataPromise = () => {
    trackPromise(
      this.getData()
    )
  }

  setPrevY(newY){
    this.setState({
      prevY: newY
    })
  }

  // promise function with a 1 second delay
  // sends user query to API and stores results in state
  getData = () => {
    if(this.state.currentPage === 0) this.setState({ currentPage: 1});
    this.setState({ loading: true});
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          axios.get(`${API_URL}${this.state.currentPage}&query=${this.state.query}&language=en-US&api_key=${API_KEY}`)         
          .then(({ data }) => {                     
            this.setResults(data.results,data.total_pages,data.total_results);
            this.setState({ loading: false });
          })
        )
      }, 1000)         
    })    
    return promise;
  }
  
  render(){
    return (         
        <div className="movieSearch">
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />                            
          <title>TMDb API Test</title>        
          <a href="https://www.themoviedb.org/">
            <img 
            src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg" 
            id="tmdb" 
            alt="" />
          </a>
          <SearchBar results={this.state.results} query={this.state.query} setResults={this.setResults} setQuery={this.setQuery} trackDataPromise={this.trackDataPromise} getData={this.getData} clearResults={this.clearResults} setPage={this.setPage}/>
          <LoadingIndicator />
          <ResultsContainer results={this.state.results} query={this.state.query} setPosterID={this.setPosterID} toggleModal={this.toggleModal} genres={this.state.genres} currentPage={this.state.currentPage} totalResults={this.state.totalResults} getData={this.getData} setPage={this.setPage} prevY={this.prevY} setPrevY={this.setPrevY}/>
          <Modal modalShow={this.state.modalShow} clickedPosterID = {this.state.clickedPosterID} results={this.state.results} toggleModal={this.toggleModal} />     
          <footer className="footer">           
            This product uses the TMDb API but is not endorsed or certified by TMDb.
          </footer>        
        </div>           
    );
  }
}

//////////////////////////
// SearchBar component //
////////////////////////
class SearchBar extends React.Component {
  constructor(props){
    super(props);    

    this.changeInput = this.changeInput.bind(this);
    this.getTextWidth = this.getTextWidth.bind(this);
  }

  // focuses on search bar on component mount
  componentDidMount(){
    this.search.focus();
  }
  
  clearInput = (event) => {
    if (this.search.value.length > 0)
      this.props.setQuery('');
      this.search.value = '';
  }

  getTextWidth = (text, font) => {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  }

  // sets state to user query
  // if query is 2 or more characters, executes getData function
  changeInput = async () => {       
    await this.props.setQuery(this.search.value);
    if (this.props.query && this.props.query.length > 1){ 
        this.props.trackDataPromise();                         
    }
    if (this.props.query.length < 2){
      this.props.setPage(0);
      this.props.clearResults();
    }
      var font = window.getComputedStyle(document.getElementById("search-input")).font;
      document.getElementById("search-input-underline").style.width = this.getTextWidth(this.props.query,font + 'pt Work Sans') + "px";
    }  

  // renders input field, LoadingIndicator component and ResultsContainer component
  // passing results and user query to ResultsContainer
  render(){
    return (
      <div className="container">           
        <div className="search">
          <input 
            type="text"
            id="search-input"           
            className="search-input" 
            placeholder="Search movie by title..."
            ref={input => this.search = input} 
            onChange={this.changeInput} 
          />
          <div id="search-input-underline"/>
        </div>        
      </div>
    );
  }
}

/////////////////////////////////
// ResultsContainer component //
///////////////////////////////
class ResultsContainer extends React.Component {  
  constructor(props){
    super(props);
    
    this.clickPoster = this.clickPoster.bind(this);
    this.findGenresByID = this.findGenresByID.bind(this);
    this.displayedResults = this.displayedResults.bind(this);          
  }

  componentDidMount(){
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    }

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  componentWillUnmount(){
    this.observer.unobserve(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (entities[0].intersectionRatio === 1 && this.props.currentPage !== 0){
      this.props.setPage(this.props.currentPage + 1);
      this.props.getData();
    }
    this.props.setPrevY(y);
  }

  // when user clicks on a poster, modal toggle is set to true and result id is captured
  clickPoster = async (id) => {    
    await this.props.setPosterID(id);
    this.props.toggleModal();
  }

  findGenresByID = (id) => {
      var foundGenres = '';            
      for(let i=0;i<this.props.results.length;i++){
        if(this.props.results[i].id === id){
          for(let j=0;j<this.props.genres.length;j++)
            for(let k=0;k<this.props.results[i].genre_ids.length;k++)
              if(this.props.results[i].genre_ids[k] === this.props.genres[j].id)
                foundGenres+= this.props.genres[j].name + ', ';
        }      
      }
      return foundGenres;
  }

  displayedResults = () => {
    if (this.props.currentPage * 20 > this.props.totalResults)
      return this.props.totalResults;
    else
      return this.props.currentPage * 20;
  }

  // renders nothing if no results are stored in state
  // displays all posters for movies from results array if available
  // otherwise displays a 'No Poster Found' image
  // passes current state, clicked poster id and modal toggle to Modal component
  render() {
    if (this.props.results === null) return null;
    return (      
      <div className="container">
        <div className={this.props.query.length >= 2 ? "results-text-show" : "results-text-hide"}>
          <span className="results-showing">{this.displayedResults()}</span> of <span className="results-showing">{this.props.totalResults}</span> results showing
        </div>               
        <div className={this.props.query.length < 2 ? "results-hide" : "results-show"}>          
          {this.props.results.map(item => {
              let path = POSTER_URL + item.poster_path;
              let year = item.release_date.slice(0,4);
              let foundGenres = this.findGenresByID(item.id);            
              foundGenres = foundGenres.substring(0,foundGenres.length-2);                         
                return (
                  <div className="result-block">                                              
                    <img 
                      key={item.id} 
                      src={item.poster_path === null ? 'https://s3.ca-central-1.amazonaws.com/dougjthayer.com-images/noposter.png' : path}
                      className="poster"
                      title={item.title}
                      alt=""
                      onClick={(e) => this.clickPoster(item.id, e)}                   
                    />
                    <span className="result-title">{item.title} <span className="result-year-genre">({year})</span></span>
                    <span className="result-year-genre">{foundGenres}</span>                    
                  </div>                                    
                )              
              })
          }        
        </div>
        <div className="page-bottom-boundary" ref={loadingRef => (this.loadingRef = loadingRef)}/>
      </div>
    );
  }
}

//////////////////////
// Modal component //
////////////////////
class Modal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      title: '',
      poster: '',
      overview: '',
      release: ''
    }
    
    this.findResultByID = this.findResultByID.bind(this);
  }

  // checks if most recent movie selected is the same as the previous
  // if different, uses id to find the movie info in the results array
  // sets id and sets modal toggle to true
  componentDidUpdate(prevProps){
    if(this.state.id !== prevProps.clickedPosterID){      
      this.findResultByID(this.props.clickedPosterID);
      
      this.setState({
        id: this.props.clickedPosterID
      })      
    }    
  }
  
  findResultByID = (id) => {
    for(var i=0;i < this.props.results.length; i++){
      if (id === this.props.results[i].id)                    
        this.setState({
          id: this.props.clickedPosterID,  
          title: this.props.results[i].title,
          overview: this.props.results[i].overview,
          release: this.props.results[i].release_date,
          poster: POSTER_URL + this.props.results[i].poster_path
        })       
    }
  }  

  // renders the modal, hidden by default
  // shows or hides the modal depending on current value of modalShow in state
  // close modal when user clicks screen, or when user clicks the X in modal block
  // displays poster and movie info in modal
  render(){
    return(
      <div 
        className={this.props.modalShow ? "modal-show" : "modal-hide"} 
        onClick={(e) => this.props.toggleModal(e)}>
        <div className="modal-block">
          <div 
            className="modal-close-button" 
            onClick={(e) => this.props.toggleModal(e)}/>
          <div>
            <img 
              src={this.state.poster} 
              className="modal-poster" 
              title={this.state.title} alt=""/>
            <p className="modal-text">Title: {this.state.title}</p>
            <p className="modal-text">Overview: {this.state.overview}</p>
            <p className="modal-text">Release Date: {this.state.release}</p>
          </div>                
        </div>
      </div>
    )
  }
}

export default MovieSearch;