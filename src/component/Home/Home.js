import React, {  useState } from 'react';
import './Home.css';
import data from '../../fakeData/FakeData';
import PlaceDetail from '../PlaceDetail/PlaceDetail';
import { Col, Container, Row } from 'react-bootstrap';



const Home = () => {
 
    const [places, setPlaces] = useState(data);

    const handleImageClick = (key) => {
        
    }
    


    return (
        <div className="homeContainer"> 
        <Container >
  <Row>
    <Col sm={4} className="homeDescription">
    <h1>Cox's Bazar</h1>
                <p> We wanted to try the best hotel in Cox's Bazar so we decided with royal tulip. They provided shuttle service from Cox's Bazar to the hotel which is about 1 hour ...</p>
    </Col>
    <Col sm={1}></Col>
    <Col sm={7} className="homeImage">  {
                    places.map(place => <PlaceDetail key={place.key} place={place} handleImageClick={handleImageClick} ></PlaceDetail> )
                }</Col>
  </Row>
  </Container>
  </div>
    );
};

export default Home;