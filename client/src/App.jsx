import {BrowserRouter as Router , Routes,Route,Outlet} from 'react-router-dom'
import Home from './components/home/home'
import SignUp from './components/authentication/signup'
import Login from './components/authentication/login'
import Header from './components/header/header'
import LeaseRequestForm from './components/leaseform/leaseForm.jsx'
import './App.css'
import './index.css'
import Properties from './components/properties/properties'
import Profile from './components/profile/profile'
import PropertyForm from './components/Listing/PropertyForm'
import UpdateProperty from './components/updateProperty/updateProperty'
import Property from './components/property/property'
import { ColorModeContext,useMode } from './utils/theme.js'
import { CssBaseline, ThemeProvider } from '@mui/material'

import SideBarCmp from './scenes/global/sideBar'
import MaintenanceForm from './scenes/maintenance/maintenance.jsx'
import Users from './scenes/Users/users.jsx'
import Lease from './scenes/requests/lease.jsx'
import Layout from './scenes/dashboard/'
import DashboardComp from './components/dashboard/dashboardcomp.jsx'
import Calendar from './scenes/calendar/calendar.jsx'
import RequestDetails from './scenes/maintenance/requestDetails.jsx'
import Vacate from './components/vacate/vacate.jsx'
import AboutUsPage from './components/conatactHome/contactHome.jsx'
import Payment from './scenes/payment/payment.jsx'
import LandLordPayment from './scenes/payment/landlord.jsx'

function App() {
  const [theme,colorMode] = useMode(); 
  return (
    <>
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <Router>
            
            
            <Routes> 
              <Route path="/" element={<Header />}>
                <Route index element={<Home />} />
                <Route path="/sign-up/:role" element={<SignUp />} />
                <Route path="/sign-in/:role" element={<Login />} />
                <Route path="/properties/search" element={<Properties />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/property" element={<PropertyForm />} />
                <Route path="/update-property/:id" element={<UpdateProperty />} />
                <Route path="/properties/:id" element={<Property />} />
                <Route path='/property-request-form/:id' element={<LeaseRequestForm/>}/>
                <Route path='/about-us' element={<AboutUsPage />}/> 
              </Route>
              
              <Route path='/dashboard' element={<Layout />}>
                <Route index element={<DashboardComp />}/> 
                <Route  path='tenants' element={<Users />}/> 
                <Route  path='calendar' element={<Calendar />}/> 
                <Route path='lease-requests' element={<Lease/>}/>
                <Route path='maintenance-form' element={<MaintenanceForm/>}/>
                <Route path='maintenance-form/:requestId' element={<RequestDetails/>}/>
                <Route path='vacate' element={<Vacate/>}/>
                <Route path='payment' element={<Payment/>}/>
                <Route path='payment/owner' element={<LandLordPayment />}/>
                
              </Route>
            </Routes>
          </Router>
          </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
