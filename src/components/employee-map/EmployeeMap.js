import React from 'react';
import './EmployeeMap.css';

function LongRectangle(props){
    return (
        <svg width='210' height='110'>
            <rect 
                width='200' 
                height='100'
                x='2'
                y='2'
                className='svgShape'
            />
        </svg>
    )
}

function TallRectangle(props) {
    return (
        <svg width='110' height='210'>
            <rect 
                width='100' 
                height='200'
                x='2'
                y='2'
                className='svgShape'
            />
        </svg>
    )
}

function Square(props) {
    return (
        <svg width='110' height='110'>
            <rect 
                width='100' 
                height='100'
                x='2'
                y='2'
                className='svgShape'
            />
        </svg>
    )
}

class EmployeeMap extends React.Component {
    render(){
        return (
            <div className='map'>
                <LongRectangle />
                <TallRectangle />
                <Square />
            </div>
        )
    }
}

class Employee extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            workStations: '',
            prevWorkLocation: '',
            
        }
    }
}

export default EmployeeMap;