import React from 'react';
import './MovieSearch.css';
import Footer from './footer/Footer';
import SearchBar from './searchbar/SearchBar';

// contains TMDb logo and renders the SearchBar and Footer components
class MovieSearch extends React.Component {
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
          <SearchBar />     
          <Footer />
        </div>           
    );
  }
}

export default MovieSearch;