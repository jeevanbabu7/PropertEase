import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import Home from './components/home/home'
import SignUp from './components/authentication/signup'
import Login from './components/authentication/login'
import Header from './components/header/header'
import './App.css'
import './index.css'
import Dashboard from './components/dashboard/dashboard'
import Properties from './components/properties/properties'
import Profile from './components/profile/profile'

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/sign-in' element={<Login />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/properties' element={<Properties />}/>
          <Route path='/profile' element={<Profile />}/>
          
        </Routes>
      </Router>

    </>
  )
}

export default App
