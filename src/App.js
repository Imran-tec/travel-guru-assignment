import React, { createContext, useState } from 'react';
import './App.css';
import Header from './component/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import News from './component/News/News';
import LogIn from './component/LogIn/LogIn';
import Destination from './component/Destination/Destination';
import Contact from './component/Contact/Contact';
import Book from './component/Book/Book';
import Booking from './component/Booking/Booking';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import NotFound from './component/NotFound/NotFound';

export const userContext = createContext();

function App() {
  
  const [loggedInUser,setLoggedInUser] = useState({})


  return (
   
    <userContext.Provider value={[loggedInUser,setLoggedInUser]} >
       <div className="app">  
      
     
<Router>
<Header></Header>
  <Switch>
    <Route path="/home"> <Home></Home> </Route>
    <PrivateRoute path="/news"><News></News></PrivateRoute>
    <Route path="/login"> <LogIn></LogIn> </Route>
    <PrivateRoute path="/destination"> <Destination></Destination> </PrivateRoute>
    <Route path="/book/:key"> <Book></Book> </Route>
    <Route path="/contact"> <Contact></Contact> </Route>
    <PrivateRoute path="/booking"> <Booking></Booking> </PrivateRoute>
    <Route exact path="/"> <Home></Home> </Route>
    <Route path="*"> <NotFound></NotFound> </Route>
  </Switch>
</Router>
</div>
    </userContext.Provider>
    
  );
}

export default App;
