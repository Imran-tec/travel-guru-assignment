import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './HotelDetail.css'

const HotelDetail = (props) => {
    const {title,price,image,description} = props.hotel;
  
    return (
        <div>
           
            <Container className="hotel_detail">
     
  <Row>

  <Col className="image_Container">
    <img src={image} alt=""/>
    </Col>

    <Col>
<h6>  {title} </h6>

<p> {description} </p>

<h5> ${price} </h5>
    </Col>

  
  </Row>
  </Container>
        </div>
    );
};

export default HotelDetail;