import React, { useState } from 'react';
import {
  Avatar,
  Paper,
  Grid,
  Typography,
  Container,
  Button,
} from '@material-ui/core';
import useStyles from './Style';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './Icon';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth';
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
    setShowPassword(false);
  };

  const googleLoginSuccess = async (res) => {
    const decoded_data = jwtDecode(res?.credential);
    try {
      dispatch({
        type: 'AUTH',
        payload: { userData: decoded_data, token: res?.credential },
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleLoginFailure = () => {
    alert('Google Sign In was unsuccessful. Try again later');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name='confirmPassword'
                label='Confirm Password'
                handleChange={handleChange}
                type='Password'
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            className={classes.submit}
            color='secondary'
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleOAuthProvider
            clientId={
              '339840792424-sh47s74lrlm66d9skfci7s7s7cogs403.apps.googleusercontent.com'
            }
            // render={(renderProps) => (
            //   <Button
            //     className={classes.googleButton}
            //     color='primary'
            //     fullWidth
            //     onClick={renderProps.onClick}
            //     disabled={renderProps.disabled}
            //     startIcon={<Icon />}
            //     variant='contained'
            //   >

            //     Google Sign In
            //   </Button>
            // )}
            // onSuccess={googleSuccess}
            // onFailure={googleFailure}
            // cookiePolicy='single_host_origin'
          >
            <GoogleLogin
              size='medium'
              theme='filled_blue'
              shape='pill'
              onSuccess={googleLoginSuccess}
              onError={googleLoginFailure}
            />
          </GoogleOAuthProvider>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
