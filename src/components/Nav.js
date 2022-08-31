import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

//Hooks
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

export default function Nav() {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  let navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat App
          </Typography>
          {!user ? (
            <div>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
              <Button color="inherit" onClick={() => navigate('/')}>
                Login
              </Button>
            </div>
          ) : (
            <Button variant="contained" color="warning" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
