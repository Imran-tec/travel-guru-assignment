import React, {  useContext, useState } from 'react';
import { Col, Container, Form, Row,  } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Link,  useParams } from 'react-router-dom';
import { userContext } from '../../App';
import data from '../../fakeData/FakeData';
import './Book.css';


const Book = () => {
const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const {key} = useParams();
    const place = data.find(p => p.key === key);
    const json = JSON.stringify(place.name);
    sessionStorage.setItem('name',json)
    const [startDate, setStartDate] = useState(new Date("2020/12/08"));
    const [endDate, setEndDate] = useState(new Date("2020/02/9"));
    
  
 
    return (
<div className="book_Container">  
<Container>
  <Row >
    <Col sm={6}  className="placeDescription">
    <h1 > {place.name} </h1>
    <p> {place.description} </p>
    </Col>
    
    
    <Col sm={1}></Col>

    <Col sm={5}>
      <div className="from_Container">   
    <Form>
        <Form.Group controlId="formGridAddress1">
    <Form.Label>Origin</Form.Label>
    <Form.Control placeholder="Dhaka" />
  </Form.Group>
  <Form.Group controlId="formGridAddress2">
    <Form.Label>Destination</Form.Label>
    <Form.Control  defaultValue={place.name} />
  </Form.Group>
  <Form.Row>
  <Form.Group as={Col} controlId="validationFormik03">
      <Form.Label>From</Form.Label>
      <br/>
      <ReactDatePicker
    selected={startDate}
    onChange={date => setStartDate(date)}
    selectsStart
    startDate={startDate}
    endDate={endDate}
    customInput={ <Form.Control name="date" type="text"  />}
  />
    </Form.Group>
    <Form.Group as={Col} controlId="validationFormik03" md="6" >
      <Form.Label>To</Form.Label>
      <br/>
      <ReactDatePicker
    selected={endDate}
    onChange={date => setEndDate(date)}
    selectsEnd
    startDate={startDate}
    endDate={endDate}
    customInput={ <Form.Control  type="text"  />}
  />
    </Form.Group>
    </Form.Row>
   <Link className="link" to="/booking" > <button className="btn" type="submit">Start Booking</button></Link>
</Form>
</div>
      
      </Col>
  </Row>
  
</Container>
</div>
       
    );
};

export default Book;