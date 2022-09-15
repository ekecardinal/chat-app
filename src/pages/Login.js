import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

//Hooks
import { useLogin } from '../hooks/useLogin'
import { Container } from '@mui/material'

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {'Copyright © '}
//       Appnovia {''}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   )
// }

function Login() {
  const [error1, setError] = useState('')
  const { login, isPending, error, message } = useLogin()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    if (!password || !email) {
      setError('All fields are required')
    }
    login(email, password)
  }

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        navigate('/messenger', {
          replace: true,
        })
      }, 1500)
    }
  }, [message, navigate])

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
        <Typography component="h1" variant="h3">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
            <Grid container justifyContent="flex-end">
              <Grid item fontSize={16} marginY={2}>
                <Link href="#" variant="body2" style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 2, textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isPending}
          >
            {!isPending ? 'Sign In' : 'Loading'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item fontSize={16} marginY={2}>
              Don't have an account? {''}
              <Link href="/register" variant="body2" style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 2, textDecoration: 'none' }}>
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/* <Copyright /> */}
      </Box>
    </Container>
  )
}

export default Login
