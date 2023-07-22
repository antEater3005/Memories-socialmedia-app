import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './Style';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate(0);
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;

    // JWT Authentication
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile'))?.userData);
  }, [location]);

  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <NavLink to='/' className={classes.brandContainer}>
        <img
          className={classes.image}
          src={memoriesText}
          alt='icon'
          height='45px'
        />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt='icon'
          height='40px'
        />
      </NavLink>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.name}
              src={user.picture}
            >
              {/* {user.name.charAt[0]} */}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              onClick={logout}
              color='secondary'
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
