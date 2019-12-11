import React from 'react';
import './footer.css';

class Footer extends React.Component {
  render(){
    return (
      <footer className="footer">
          Created by Doug Thayer<br /> 
          This product uses the TMDb API but is not endorsed or certified by TMDb.
      </footer>
    );
  }
}

export default Footer;
