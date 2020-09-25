import React from 'react';
import { Link } from 'react-router-dom';
import './PlaceDetail.css';

const PlaceDetail = (props) => {
    const {img,name,key} = props.place;
    return (
        <div className="placeContainer">

          <Link to={`/book/${key}`}>  < img src={img} alt=""/>  </Link>
             <h2> {name} </h2>
       
           
        </div>
    );
};

export default PlaceDetail;