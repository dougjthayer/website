import React from 'react';
import axios from 'axios';
import './MovieSearch.css';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../Tools/LoadingIndicator';

const API_KEY = 'd95e0715a998b10f00c3768041d74ac0'
const API_URL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1'

const POSTER_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';

// contains TMDb logo and renders the SearchBar and Footer components
class MovieSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      query: '',
      clickedPosterID: '',
      modalShow: false
    }
    
    this.setResults = this.setResults.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.setPosterID = this.setPosterID.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  setResults(newResults){
    this.setState({
      results: newResults
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
  
  render(){
    return (         
        <div className="movieSearch">                            
          <title>TMDb API Test</title>        
          <a href="https://www.themoviedb.org/">
            <img 
            src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg" 
            id="tmdb" 
            alt="" />
          </a>
          <SearchBar results={this.state.results} query={this.state.query} setResults={this.setResults} setQuery={this.setQuery}/>
          <LoadingIndicator />
          <ResultsContainer results={this.state.results} query={this.state.query} setPosterID={this.setPosterID} toggleModal={this.toggleModal} />
          <Modal modalShow={this.state.modalShow} clickedPosterID = {this.state.clickedPosterID} results={this.state.results} toggleModal={this.toggleModal} />     
          <footer className="footer">           
            This product uses the TMDb API but is not endorsed or certified by TMDb.
          </footer>
        </div>           
    );
  }
}

class SearchBar extends React.Component {
  constructor(props){
    super(props);    

    this.getData = this.getData.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.trackDataPromise = this.trackDataPromise.bind(this);
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

  // sets state to user query
  // if query is 2 or more characters, executes getData function
  changeInput = async () => {       
    await this.props.setQuery(this.search.value);              
    if (this.props.query && this.props.query.length > 1){                                                                                                        
        this.trackDataPromise()                          
      } 
    }  
  
  // getData wrapped in promise tracker for loading indicator and to prevent input lag
  trackDataPromise = () => {
    trackPromise(
      this.getData()
    )
  }

  // promise function with a 1 second delay
  // sends user query to API and stores results in state
  getData = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          axios.get(`${API_URL}&query=${this.props.query}&language=en-US&api_key=${API_KEY}`)         
          .then(({ data }) => {                     
            this.props.setResults(data.results)
          })
        )
      }, 1000)         
    })    
    return promise;
  }  

  // renders input field, LoadingIndicator component and ResultsContainer component
  // passing results and user query to ResultsContainer
  render(){
    return (
      <div className="container">           
        <div className="search">
          <input 
            type="text" 
            name="search"             
            className="search-input" 
            placeholder="Search movie by title..."
            ref={input => this.search = input} 
            onChange={this.changeInput} 
          />
          <div 
            className="search-clear"
            onClick={(e) => this.clearInput(e)}>x</div>       
        </div>         
      </div>
    );
  }
}

class ResultsContainer extends React.Component {  
  constructor(props){
    super(props);
    
    this.clickPoster = this.clickPoster.bind(this);          
  }

  // when user clicks on a poster, modal toggle is set to true and result id is captured
  clickPoster = async (id) => {    
    await this.props.setPosterID(id);
    this.props.toggleModal();
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
          Showing <span className="results-showing">X of Y</span> results
        </div>               
        <div className={this.props.query.length < 2 ? "results-hide" : "results-show"}>          
          {this.props.results.map(item => {
              let path = POSTER_URL + item.poster_path;
              let year = item.release_date.slice(0,4);             
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
                  </div>                                    
                )              
              })
          }        
              
        </div>
      </div>
    );
  }
}

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