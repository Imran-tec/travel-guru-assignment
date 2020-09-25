import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Images/Logo.png';
import log from '../../Images/homelogo.png'
import './Header.css';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { userContext } from '../../App';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));



const Header = () => {
 
  const [loggedInUser, setLoggedInUser] = useContext(userContext)
  const classes = useStyles();

    return (
        <div className="header">
         
          <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography className={classes.title} variant="h6" noWrap>
            <img className="logo" src={log} alt=""/>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
             
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            
          </div>
         
          <div className={classes.grow} />
          <nav className="nav_container">
            <Link to ="/home"> Home</Link>
            <Link to ="/news"> News</Link>
            <Link to ="/destination">Destination</Link>
            <Link to ="/contact"> Contact</Link>
          </nav>

          <Link to="/booking"> <button style={{backgroundColor:'rgba(249, 165, 26, 1)'}}>{loggedInUser.email || loggedInUser.name? loggedInUser.name:'LogIn'} </button> </Link>
         {loggedInUser.isSignedIn && <a href="/home"> <button  onClick={() => setLoggedInUser({}) &&
          sessionStorage.clear() } style={{backgroundColor:'rgba(249, 165, 26, 1)'}} > Log out </button> </a>}
        </Toolbar>
      </AppBar>
    
    </div>
  


 
        </div>
    );
};

export default Header;