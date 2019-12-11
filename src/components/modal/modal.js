import React from 'react';
import './modal.css';

const POSTER_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

// state contains info for the movie the user clicked on
// as well as a toggle for showing the modal
class Modal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      title: '',
      overview: '',
      release: '',
      poster: '',
      modalShow: false
    };
    this.closeModal = this.closeModal.bind(this);
  }

  // checks if most recent movie selected is the same as the previous
  // if different, uses id to find the movie info in the results array
  // sets id and sets modal toggle to true
  componentDidUpdate(prevProps){
    if(this.props.id !== prevProps.id){
      this.findResultByID(this.props.id);

      this.setState({
        id: this.props.id,
        modalShow: this.props.toggle
      })       
    }    
  }
  
  // uses id from props to find the movie in the array of results
  // if found, grabs movie info from result and sets state
  findResultByID = (id) => {
    for(var i=0;i < this.props.info.length; i++){
      if (id === this.props.info[i].id)                    
        this.setState({  
          title: this.props.info[i].title,
          overview: this.props.info[i].overview,
          release: this.props.info[i].release_date,
          poster: POSTER_URL + this.props.info[i].poster_path
        })       
    }
  } 

  // sets modal toggle to false
  closeModal = (e) => {
    this.setState({
      modalShow: false
    })
  }

  // renders the modal, hidden by default
  // shows or hides the modal depending on current value of modalShow in state
  // close modal when user clicks screen, or when user clicks the X in modal block
  // displays poster and movie info in modal
  render(){
    return(
      <div 
        className={this.state.modalShow ? "modal-show" : "modal-hide"} 
        onClick={this.closeModal}>
        <div className="modal-block">
          <div 
            className="modal-close-button" 
            onClick={(e) => this.closeModal(e)}/>
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

export default Modal;
