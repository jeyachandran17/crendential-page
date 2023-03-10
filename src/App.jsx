import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Login } from './Login';
import { SignUp } from './SignUp';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';


function App() {
  const navigate = useNavigate();
  const bgstyle = {
    borderRadius: "0px",
    minHeight:"100vh",
  }
  
  const [show, setshow] = useState(true)
  const darkTheme = createTheme({
    palette: {
      mode: show ? 'dark' : 'light',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={4} sx={bgstyle} >
        <div className="App">
          <div className='home-nev'>
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit" onClick={()=>navigate("/")}>home</Button>
                <Button color="inherit" sx={{marginLeft:"auto"}} onClick={()=>navigate("/login")}>Login</Button>
                <Button color="inherit" onClick={() => navigate("/signup")}>Sign Up</Button>
                <IconButton color="inherit" onClick={() => setshow(!show)} >{show ? <BrightnessHighIcon/> : <Brightness4Icon/> }</IconButton>
              </Toolbar>
            </AppBar>
            <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/success" element={<ProductedRoute><SuccessPage /></ProductedRoute>} />
            </Routes>
          </div>
        </div>
      </Paper>
    </ThemeProvider>
  )
}

export default App

function ProductedRoute({ children }) {
  const token = localStorage.getItem('token');
  return (
    token ? (<section>
      {children}
    </section>) : <Navigate replace to ="/" />
  );
}

function logout() {
  localStorage.removeItem("token");
  // localStorage.clear();
  window.location.href = "/"; // one time refresh
}

function Home() {
  return (
    <div className='home-page'>
      <h1>Welcome react application</h1>
    </div>
  );
}

function SuccessPage() {
  return (
    <div className='success-page'>
      <h3>well done your are successfull login the page.</h3>
      <img src="https://media4.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" alt="" />
    </div>
  );
}
