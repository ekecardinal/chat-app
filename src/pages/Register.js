import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'

//hooks
import useSignup from '../hooks/useSignup'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function Register() {
  const [error1, setError] = useState('')

  const { signup, error, isPending, success } = useSignup()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const email = data.get('email')
    const password = data.get('password')
    if (!name || !password || !email) {
      setError('All fields are required')
    }
    signup(email, password, name)
  }
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/messenger', {
          replace: true,
        })
      }, 1500)
    }
  }, [success, navigate])

  return (
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
          Sign up
        </Typography>
        {(error || error1) && (
          <Box margin={3}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        {success && (
          <Box margin={3}>
            <Alert severity="success">{success}</Alert>
          </Box>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          {!isPending && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          )}
          {isPending && (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled
            >
              Please Wait...
            </Button>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}

export default Register
