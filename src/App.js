import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Login from './pages/Login'
import Register from './pages/Register'
import Messenger from './pages/Messenger'
import Nav from './components/Nav'

//Hooks
import { useAuthContext } from './hooks/useAuthContext'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'

const theme = createTheme()

function App() {
  const { authIsReady, user } = useAuthContext()
  return (
    <ThemeProvider theme={theme}>
      {authIsReady && (
        <div>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                exact
                element={!user ? <Login /> : <Home />}
              />
              <Route
                path="/register"
                exact
                element={!user ? <Register /> : <Home />}
              />
              <Route
                path="/"
                exact
                element={user ? <Home /> : <Login />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </ThemeProvider>
  )
}

export default App
