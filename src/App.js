import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Login from './pages/Login'
import Register from './pages/Register'
import Messenger from './pages/Messenger'
import Nav from './components/Nav'

//Hooks
import { useAuthContext } from './hooks/useAuthContext'

const theme = createTheme()

function App() {
  const { authIsReady, user } = useAuthContext()
  return (
    <ThemeProvider theme={theme}>
      {authIsReady && (
        <div>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route
                path="/"
                exact
                element={!user ? <Login /> : <Messenger />}
              />
              <Route
                path="/register"
                exact
                element={!user ? <Register /> : <Messenger />}
              />
              <Route
                path="/messenger"
                exact
                element={user ? <Messenger /> : <Login />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </ThemeProvider>
  )
}

export default App
