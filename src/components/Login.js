import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useState } from 'react';

const Login = () => {

  const auth = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const setDefaultUser = () => {
    setUser({
      email: '',
      password: ''
    })
  }

  const defaultTheme = createTheme();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser( prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/api/v1/verify-user", user);
      auth.login({username: response.data.username, sessionToken: response.data.token});
      navigate('/dashboard', {replace: true});
    } catch (error) {
      navigate('/signup', {replace: true})
      console.log(error);
    }
    
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
      
      <Box component="form" onSubmit={handleLogin} noValidate sx={{mt:1}} >
        <TextField
          Margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="User Email"
          autoComplete="email"
          autoFocus
          value={user.email}
          onChange={handleChange} />
        
        <TextField
          marhin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          autoComplete="current-password"
          value={user.password}
          onChange={handleChange} />
        <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

      </Box>
      </Box>
      </Container>
      </ThemeProvider>
  )
}

export default Login
