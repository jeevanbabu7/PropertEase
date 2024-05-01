import {BrowserRouter as Router , Routes,Route,Outlet} from 'react-router-dom'
import Home from './components/home/home'
import SignUp from './components/authentication/signup'
import Login from './components/authentication/login'
import Header from './components/header/header'
import './App.css'
import './index.css'
import Dashboard from './components/dashboard/dashboard'
import Properties from './components/properties/properties'
import Profile from './components/profile/profile'
import PropertyForm from './components/Listing/PropertyForm'
import UpdateProperty from './components/updateProperty/updateProperty'
import Property from './components/property/property'
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Home />} />
            
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/property" element={<PropertyForm />} />
            <Route path="/update-property/:id" element={<UpdateProperty />} />
            <Route path="/properties/:id" element={<Property />} />
          </Route>
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
