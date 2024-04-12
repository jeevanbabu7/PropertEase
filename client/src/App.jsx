import Header from './components/header/header'
import Main from './components/main/main'
import Comapanies from './components/companies/companies'
import Residencies from './components/residencies/residencies'
import Value from './components/value/value'
import Contact from './components/contact/contact'
import GetStarted from './components/GetStarted/getStarted'
import Footer from './components/footer/footer'
import FAQ from './components/FAQ/FAQ'
import './App.css'
import './index.css'

function App() {

  return (
    <>
      <div className='App'>
        <div>
          <div className='white-gradient'/>
          <div className='group1'>
              <Header />
              <Main />
          </div>
        </div>

        <Comapanies />
        <Residencies />
        <Value />
        <Contact />
        <FAQ />
        <GetStarted />
        <Footer />


      </div>

    </>
  )
}

export default App
