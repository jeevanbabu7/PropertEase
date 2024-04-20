import React, { useState } from 'react';
import './FAQ.css';

const FAQS = [
    {
        que: "What are the services you offer?",
        ans: "We offer all the basic facilities including fresh water and peaceful living atmosphere. Maintenance requests will be addressed at the earliest and necessary actions will be taken. Efficient communication between the resident and the house owner is provided."
    },
    {
        que: "How will you solve the maintenance requests?",
        ans: "The maintenance requests will be addressed on the basis of priority with full efficiency and customer satisfaction. Our team is there to assist you in all sorts of requirements always."
    },
    {
        que: "Are your houses pet-friendly?",
        ans: "Most of the houses are pet-friendly. But still, there are some houses where pets are restricted. We kindly request you to choose your house accordingly."
    },
    {
        que: "What can I do if the house-owner doesn't pick up my calls?",
        ans: "There is a contact support which helps you to make the owner aware of your concern. The owner will be able to answer to your query at the earliest through this."
    }
];

const FAQ = () => {

    const [questionOpen, setQuestionOpen] = useState(null);

    const toggleQuestion = (index) => {
        setQuestionOpen(prevState => (prevState === index ? null : index));
    };

    const FAQDom = FAQS.map((item, index) => {
        const isOpen = questionOpen === index;

        return (
            <div key={index} className={`faq ${isOpen ? 'active' : ''}`} onClick={() => toggleQuestion(index)} id="FAQ">
                <div className="question">
                    <h3 className='primaryText'>{item.que}</h3>
                    
                    <svg width="15" height="10" viewBox="0 0 42 25">
                        <path d="M3 3L21 21L39 3" stroke="white" strokeWidth="7" strokeLinecap="round"/>
                    </svg>
                </div>
                {isOpen && (
                    <div className="answer secondaryText">
                        <p>{item.ans}</p>
                    </div>
                )}
            </div>
        );
    });

    return (
        <section className='faq-wrapper'>
            <h4 className="title orangeText">FAQs</h4>
            {FAQDom}
        </section>
    );
};

export default FAQ;
