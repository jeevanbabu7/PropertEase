import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import Home from './components/home/home'
import SignUp from './components/authentication/signup'
import Login from './components/authentication/login'
import './App.css'
import './index.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/log-in' element={<Login />}/>
          <Route path='/sign-up' element={<SignUp />}/>
        </Routes>
      </Router>

    </>
  )
}

export default App
