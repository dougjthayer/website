import React from 'react';
import './EmployeeMap.css';

class MapSVG extends React.Component{
    /*constructor(props){
        super(props);
        this.state({
            stations: workStation
        })
    }*/

    render(){
        return(
            <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="800" height="560" className="mapSVG">                
                <WorkStation width={75} height={160} x={10} y={10} name='A1-1'/>
                <WorkStation width={75} height={75} x={95} y={10} name='A1-2'/>
                <WorkStation width={75} height={75} x={95} y={95} name='A2-2'/>
                <WorkStation width={75} height={75} x={10} y={180} name='A3-1'/>

                <WorkStation width={75} height={160} x={230} y={10} name='B1-1'/>
                <WorkStation width={75} height={160} x={315} y={10} name='B1-2'/>
                <WorkStation width={75} height={75} x={400} y={10} name='B1-3'/>
                <WorkStation width={75} height={75} x={400} y={95} name='B2-3'/>
                <WorkStation width={160} height={75} x={315} y={180} name='B3-2'/>

                <WorkStation width={75} height={75} x={545} y={10} name='C1-1'/>
                <WorkStation width={75} height={75} x={630} y={10} name='C1-2'/>
                <WorkStation width={75} height={75} x={715} y={10} name='C1-3'/>
                <WorkStation width={160} height={75} x={630} y={95} name='C2-2'/>
                <WorkStation width={160} height={75} x={630} y={180} name='C3-2'/>

                <WorkStation width={75} height={160} x={10} y={305} name='D1-1'/>
                <WorkStation width={75} height={160} x={95} y={305} name='D1-2'/>
                <WorkStation width={160} height={75} x={10} y={475} name='D3-1'/>
                <WorkStation width={75} height={75} x={180} y={305} name='D1-3'/>
                <WorkStation width={75} height={75} x={180} y={390} name='D2-3'/>

                <WorkStation width={160} height={75} x={315} y={305} name='E1-1'/>
                <WorkStation width={160} height={75} x={485} y={305} name='E3-1'/>
                <WorkStation width={75} height={160} x={315} y={390} name='E2-1'/>
                <WorkStation width={75} height={160} x={400} y={390} name='E2-2'/>
                <WorkStation width={75} height={75} x={485} y={390} name='E2-3'/>                
            </svg>
        )
    }
}

class WorkStation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            width: props.width,
            height: props.height,
            x: props.x,
            y: props.y,
            name: props.name            
        }
    }

    render(){        
        return(            
            <g>
                <rect 
                    width={this.state.width} 
                    height={this.state.height} 
                    x={this.state.x} y={this.state.y} 
                    rx={5} ry={5} 
                    className='workStation' 
                />
                <text x={this.props.x + 5} y={this.props.y + 15} fill='white' font-size={12} className='workStation-text'>{this.props.name}</text>
            </g>
        )
    }
}

class EmployeeMap extends React.Component {
    render(){
        return (
            <div className='map'>
               <MapSVG />
            </div>
        )
    }
}

/*class Employee extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            workStations: '',
            stationHistory: '',
        }
    }
}*/

export default EmployeeMap;