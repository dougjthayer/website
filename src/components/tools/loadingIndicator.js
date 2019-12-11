import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import ScaleLoader from 'react-spinners/ScaleLoader';
import './loadingIndicator.css';
 
export const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker({area: props.area});
 
return (
    <div>
        {promiseInProgress && (
        <div className="spinner">            
            <ScaleLoader
                size={150}
                color="#FFFFFF"                               
            />
        </div>)}
    </div>
  )
};

export default LoadingIndicator;