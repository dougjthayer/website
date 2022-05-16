import React from 'react';
import './ResultsContainer.css';
import Modal from '../Modal/Modal';

const POSTER_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';

// state contains an array for each movie result, a toggle for showing the modal
// and the id of the poster the user clicked on
class ResultsContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      modalShow: false,
      clickedPosterID: ''  
    }
    this.clickPoster = this.clickPoster.bind(this);       
  }  

  // if previous results are different from current results
  // sets results to new results and resets modal toggle to false
  componentDidUpdate(prevProps){      
      if(this.props.results !== prevProps.results)  
        this.setState({      
          results: this.props.results,
          modalShow: false          
        })                
  }

  // when user clicks on a poster, modal toggle is set to true and result id is captured
  clickPoster = (id) => {    
    this.setState({
      modalShow: true,
      clickedPosterID: id      
    })
  }

  // renders nothing if no results are stored in state
  // displays all posters for movies from results array if available
  // otherwise displays a 'No Poster Found' image
  // passes current state, clicked poster id and modal toggle to Modal component
  render() {
    if (this.state.results === null) return null;
    return (
      <div className="container">
        <div className={this.props.query.length > 0 ? "results-text-show" : "results-text-hide"}>
            Showing <span>{this.state.results.length}</span> results
          </div>               
        <div className={this.props.query.length < 2 ? "results-hide" : "results-show"}>          
          {this.state.results.map(item => {
              let path = POSTER_URL + item.poster_path;          
              if(item.poster_path === null) 
                return (
                  <div>            
                  <img 
                    key={item.id} 
                    src='https://s3.ca-central-1.amazonaws.com/dougjthayer.com-images/noposter.png'
                    className="poster"
                    title={item.title}
                    alt=""
                    onClick={(e) => this.clickPoster(item.id, e)}                   
                  />
                  {item.title}, {item.release_date}
                  </div>
                )
              return (            
                <img 
                  key={item.id} 
                  src={path} 
                  className="poster"
                  title={item.title}
                  alt=""
                  onClick={(e) => this.clickPoster(item.id, e)}                  
                />
              )
              })
          }
        
        <Modal info = {this.state.results} toggle = {this.state.modalShow} id = {this.state.clickedPosterID} />       
        </div>
      </div>
    );
  }
}

export default ResultsContainer;
