import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useFetchUser } from './SignInHooks';
import { useSelector } from 'react-redux';
import { useUtils } from '../common';
import { setUserId, validCredentials } from '../User/UserReducer';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='#'>
        Strength App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://i.pinimg.com/originals/ae/42/e4/ae42e483bf459a77366e39a9837122a2.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(14, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const { history, dispatch } = useUtils();

  // Sign In
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let signInFunc = useFetchUser();

  let credentialsError = useSelector((state) => state.user.credentialError);

  // Get or Set userId
  let userId = useSelector((state) => state.user.curUserId);

  if (userId === null) {
    userId = localStorage.getItem('userId');
    if (userId) {
      history.push('/dashboard');
      dispatch(setUserId(userId));
    }
  }

  const onSubmit = () => {
    signInFunc(username, password);

    // TODO: Add a UI Warning/Alert
    // setTimeout(() => {
    //   // Reset to no credentials error
    //   dispatch(validCredentials());
    // }, 1500);
    // Dispatch via Axios
  };

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={1} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            {credentialsError ? (
              <TextField
                error
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id={credentialsError ? 'outlined-error-helper-text' : 'email'}
                label={credentialsError ? 'Error' : 'Email Address'}
                helperText={credentialsError ? 'Invalid Credentials' : ''}
                name='email'
                autoComplete='email'
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
            )}

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
            />
            {credentialsError ? 'Invalid Credentials' : ''}
            <Link>
              <Button
                type='button'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={(e) => onSubmit()}
              >
                Sign In
              </Button>
            </Link>
            <Grid container>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
