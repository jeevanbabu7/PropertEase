import Header from "../header/header"
import Main from "../main/main"
import Comapanies from "../companies/companies"
import Residencies from "../residencies/residencies"
import Value from "../value/value"
import Contact from "../contact/contact"
import FAQ from "../FAQ/FAQ"
import Footer from "../footer/footer"
import GetStarted from "../GetStarted/getStarted"
import Feedback from "../feedback/feedback"
import Testimonials from "../testimonials/testimonials"
import ContactUs from "../contact-us/contactUs"

const Home = () => {


    return (
        <>
            <div className='App'>
                <div>
                    {/* <div className='white-gradient'/> */}
                    <div className='group1'>
                        <Header />
                        <Main />
                    </div>
                </div>

                {/* <Comapanies /> */}
                <Residencies />
                <Value />
                <Testimonials />
                {/* <Contact /> */}
                <ContactUs />
                <FAQ />
                {/* <Feedback /> */}
                <GetStarted />
                <Footer />


            </div>
        </>
    )
}

export default Home;