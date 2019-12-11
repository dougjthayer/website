import React from 'react';
import './App.css';
import Home from '../home/home';
import MovieSearch from '../movie-search/movie-search';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from '../navbar/navbar';

// returns a div telling the user that the page they tried to navigate to does not exist
const NotFound = () => {
  return (
    <div className="notFound">The page you are looking for does not exist...</div>
  )
}

// NavBar component rendered outside the switch so it's always mounted
// Home is an exact path to prevent routes starting with / accidentally directing to Home component
class App extends React.Component {
  render(){
    return (
      <div>
        <BrowserRouter>
          <NavBar />         
          <Switch>
            <Route component={MovieSearch} path="/tmdb-demo" />     
            <Route component={Home} exact path="/" />
            <Route component={NotFound} />                 
          </Switch>
        </BrowserRouter>
      </div>          
    );
  }
}

export default App;