import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

// NavBar containing links to home and TMDb demo components
// uses NavLink for active styling
class NavBar extends React.Component {
    render(){
        return(                      
            <div className="navbar">
                <NavLink exact to="/" activeClassName="active-link">
                    <img
                        src="https://s3.ca-central-1.amazonaws.com/dougjthayer.com-images/round_home_white_18dp.png" 
                        alt=""
                        className="link-icon"                    
                    />
                </NavLink>
                <NavLink to="/tmdb-demo" activeClassName="active-link">
                    <img 
                        src="https://s3.ca-central-1.amazonaws.com/dougjthayer.com-images/round_local_movies_white_18dp.png" 
                        alt=""
                        className="link-icon"                     
                    />
                </NavLink>
                <NavLink to="/employee-map" activeClassName="active-link">
                    <img 
                        src="https://s3.ca-central-1.amazonaws.com/dougjthayer.com-images/round_supervised_user_circle_white_18dp.png"
                        alt=""
                        className="link-icon"
                    />                    
                </NavLink>
            </div>             
        );
    }
}

export default NavBar;