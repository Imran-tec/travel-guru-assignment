import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Map from '../Map/Map';
import Fakehotel from '../../fakeData/Fakehotel';
import HotelDetail from '../HotelDetail/HotelDetail';
import './Booking.css';



const Booking = () => {
   const localstrogeData = JSON.parse(sessionStorage.getItem('name'))
   
    const [hotels, setHotel] = useState(Fakehotel)
    return (
        <div>
          
          <Container className="booking_container">
        
        <Row>
    <Col>
   <h3> stay in {localstrogeData} </h3>    <br/>

   {
       hotels.map(hotel => <HotelDetail key={hotel.price}  hotel = {hotel}></HotelDetail> )
   }
    </Col>
    <Col>
  <Map></Map>
    </Col>
      </Row>
      </Container>
        </div>
    );
};

export default Booking;