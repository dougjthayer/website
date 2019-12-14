import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

// NavBar containing NavLinks to home and TMDb demo components
// uses NavNavLink for active styling
class NavBar extends React.Component {
    render(){
        return(                                 
            <div className="navbar">
                <style>
                    @import url('https://fonts.googleapis.com/css?family=Work+Sans:400,900&display=swap');
                </style> 
                <NavLink exact to="/" className="link-icon" activeClassName="active-link">
                    <svg 
                        version="1.1" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg" 
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="navbar-svg">
                            <g 
                                stroke-linecap="round" 
                                stroke-width="1.5" 
                                stroke="#000" 
                                fill="none" 
                                stroke-linejoin="round">
                                    <path 
                                        d="M3.75,
                                        13.939v8.25h6v-6l1.77636e-14,
                                        2.26494e-07c-1.25089e-07,
                                        -0.828427 0.671573,
                                        -1.5 1.5,
                                        -1.5h1.5l-6.55671e-08,
                                        1.77636e-15c0.828427,
                                        -3.62117e-08 1.5,
                                        0.671573 1.5,
                                        1.5v6h6v-8.25">
                                    </path>
                                    <path 
                                        d="M0.75,
                                        12.439l10.189,
                                        -10.189l4.17091e-09,
                                        -4.17358e-09c0.585599,
                                        -0.585974 1.53535,
                                        -0.586278 2.12132,
                                        -0.000679757c0.000226661,
                                        0.000226516 0.00045325,
                                        0.000453104 0.000679765,
                                        0.000679765l10.189,
                                        10.189">
                                    </path>
                                    <path 
                                        d="M16.5,
                                        5.689v-1.5h3.75v5.25">
                                    </path>
                                    <path 
                                        d="M1.5,
                                        22.19h21">
                                    </path>
                                </g>
                            </svg>
                </NavLink>
                <NavLink to="/tmdb-demo" className="link-icon" activeClassName="active-link">
                    <svg 
                        version="1.1" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg" 
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="navbar-svg">
                            <g 
                                stroke-linecap="round" 
                                stroke-width="1.5" 
                                stroke="#000" 
                                fill="none" 
                                stroke-linejoin="round">
                                    <path 
                                        d="M23.25,
                                        6.873h-22.5v-4.5l1.77636e-14,
                                        2.26494e-07c-1.25089e-07,
                                        -0.828427 0.671573,
                                        -1.5 1.5,
                                        -1.5h19.5l-6.55671e-08,
                                        1.33227e-15c0.828427,
                                        -3.62117e-08 1.5,
                                        0.671573 1.5,
                                        1.5Z">
                                    </path>
                                    <path 
                                        d="M0.75,
                                        9.873v10.5l1.70974e-14,
                                        2.26494e-07c1.25089e-07,
                                        0.828427 0.671573,
                                        1.5 1.5,
                                        1.5h9.75">
                                    </path>
                                    <path 
                                        d="M23.25,
                                        12.12v-2.25">
                                    </path>
                                    <path 
                                        d="M8.25,
                                        0.87l-1.5,
                                        6">
                                    </path>
                                    <path 
                                        d="M17.25,
                                        0.87l-1.5,
                                        6">
                                    </path>
                                    <path 
                                        d="M22.886,
                                        18.107l-6.042,
                                        -3.625l1.52034e-08,
                                        9.12614e-09c-0.355143,
                                        -0.213182 -0.815861,
                                        -0.0981 -1.02904,
                                        0.257043c-0.0699788,
                                        0.116579 -0.106949,
                                        0.249988 -0.106957,
                                        0.385957v7.25l-1.21928e-09,
                                        -4.26529e-05c6.25445e-08,
                                        0.414214 0.335787,
                                        0.75 0.75,
                                        0.75c0.135969,
                                        -2.05308e-08 0.269381,
                                        -0.0369631 0.385963,
                                        -0.106935l6.042,
                                        -3.625l5.58097e-08,
                                        -3.35051e-08c0.355131,
                                        -0.213201 0.470188,
                                        -0.673925 0.256987,
                                        -1.02906c-0.0632905,
                                        -0.105424 -0.151531,
                                        -0.193669 -0.256951,
                                        -0.256965Z">
                                    </path>
                                </g>
                            </svg>
                </NavLink>
                <NavLink to="/employee-map" activeClassName="active-link">
                    <img 
                        src=""
                        alt=""
                        className="NavLink-icon"
                    />                    
                </NavLink>
            </div>             
        );
    }
}

export default NavBar;