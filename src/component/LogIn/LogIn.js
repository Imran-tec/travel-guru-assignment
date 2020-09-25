import React, { useState } from 'react';
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { userContext } from '../../App';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LogInManager';
import './LogIn.css';
import fb from '../../Images/Icon/fb.png';
import  google from '../../Images/Icon/google.png';



const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'10vh',
    backgroundColor:'',
   
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      display:'block',
      margin:'auto',
    },
  },
 
}));

const LogIn = () => {
const [matchPassword, setMatchPassword] = useState(true)
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error:''
  });
  
  const handlePassword = (e) => {
      if(e.target.name === 'lastPass'){
        let confirmPassword = e.target.value;
        if(user.password !== confirmPassword){
          setMatchPassword(false)
        }
        else{
          setMatchPassword(true)
        }
      }

  
  
  }
  
  const [loggedInUser, setLoggedInUser ] = useContext(userContext);

  initializeLoginFramework();

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        
        handleResponse(res, true);
      })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        
        handleResponse(res, true);
      })

  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
          handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 5;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
     
    }
  }
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
       
        handleResponse(res, true);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
       
        setUser(res)
        handleResponse(res, true);
      })
     
    }
    e.preventDefault();
  }

const toggleBtn = {
  border:'none',
  color:'sandybrown',
  backgroundColor:'white'
}

  const smAll = {
display:'block',
margin:'0 auto',
textAlign:'center'
  }
  const classes = useStyles();
const submitBtn = {
  backgroundColor:'rgba(249, 165, 26, 1)',
  border:'none'
}

  return (
    <div className="form_container">
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
      
       {newUser &&   <TextField
          id="standard-password-input"
          label="first name"
          type="text"
          autoComplete="current-password"
          required
          name="name"
          onBlur={handleBlur}
          
        />}
<br/>
{newUser &&   <TextField
          id="standard-password-input"
          label="last name"
          type="text"
          autoComplete="current-password"
          name="lastname"
          onBlur={handleBlur}
        />}
<br/>
<TextField
          id="standard-password-input"
          label="user name or email"
          type="email"
          autoComplete="current-password"
          required
          name="email"
          onBlur={handleBlur}
         
        />
<br/>
<TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          name="password"
          
          onBlur={ handleBlur}
        />
       {newUser && <small style={smAll}>minimum 6 character with one letter </small>}
<br/>

{ newUser  && 
  <TextField
          id="standard-password-input"
          label=" confirm Password"
          type="password"
          autoComplete="current-password"
          name="lastPass"
          onChange={handlePassword}
          required
          
          />
     
 }
 {
   !matchPassword && <small style={{color:'red'}} > password invalid </small>
 }
     <br/>  
 
        

         
<input style={submitBtn} className="submitBtn" type="submit" value={newUser?'create an account':'Log In'}/>

</form>

    <small style={smAll}> {newUser?"already have an account?":" don't have an account"} <button style={toggleBtn} onClick={()=> setNewUser(!newUser)} > {newUser?"Log in":"create an account"} </button> </small>
    <hr/>
<div className="Continue_Btn">
<button onClick={fbSignIn} ><img className="icon" src={fb} alt=""/> Continue with Facebook </button>


<button onClick={googleSignIn} > <img className="google_icon" src={google} alt=""/> Continue with  Google </button>
 <br/>
</div>


 <p style={{color:'red',textAlign:'center'}}> {loggedInUser.error}  </p>
      
    </div>
  );
};

export default LogIn;