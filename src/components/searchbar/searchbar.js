import React from 'react';
import axios from 'axios';
import './searchbar.css';
import ResultsContainer from '../results-container/results-container';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../tools/loadingIndicator';

const API_KEY = 'd95e0715a998b10f00c3768041d74ac0'
const API_URL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1'

// state contains query and results array
class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      query: '', 
      results: []      
    };

    this.getData = this.getData.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.trackDataPromise = this.trackDataPromise.bind(this);
  }

  // focuses on search bar on component mount
  componentDidMount(){
    this.search.focus();
  }  

  // sets state to user query
  // if query is 2 or more characters, executes getData function
  changeInput = () => {
    this.setState({
      query: this.search.value      
    }, () => {
        if (this.state.query && this.state.query.length > 1){                                                                  
          this.trackDataPromise()                          
        }
    })
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
          axios.get(`${API_URL}&query=${this.state.query}&language=en-US&api_key=${API_KEY}`)         
          .then(({ data }) => {          
            this.setState({
              results: data.results                              
            })
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
        <div id="search" className="search">
          <input 
          type="text" 
          name="search" 
          id="search-input" 
          className="search-input" 
          placeholder="Search movie by title..."
          ref={input => this.search = input} 
          onChange={this.changeInput} />         

          <br /><br />          
        </div>
        <LoadingIndicator />
        <br />                
        <ResultsContainer results={this.state.results} query={this.state.query}/>              
      </div>
    );
  }
}

export default SearchBar;
