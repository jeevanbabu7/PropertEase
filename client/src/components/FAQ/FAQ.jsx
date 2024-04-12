import React from 'react'
import '/FAQ.css'

const FAQ = () => {
  return (
<section className='faq-wrapper'>
        <h4 class="title">FAQs</h4>

        <div class="faq">
            <div class="question">
                <h3>What are the services you offer?</h3>

                <svg width="15" height="10" viewBox="0 0 42 25">
                    <path d="M3 3L21 21L39 3" stroke="white" stroke-width="7" stroke-linecap="round"/>
                </svg>
            </div>
            <div class="answer">
                <p>We offer all the basic facilities including fresh water and peaceful living atmosphere.
                    Maintanence requests will be addressed at the earliest and necessary actions will be taken.
                    Efficient communication between the resident and the house owner is provided. 
                    </p>
            </div>
        </div>

        <div class="faq">
            <div class="question">
                <h3>How will you solve the maintanence requests?</h3>

                <svg width="15" height="10" viewBox="0 0 42 25">
                    <path d="M3 3L21 21L39 3" stroke="white" stroke-width="7" stroke-linecap="round"/>
                </svg>
            </div>
            <div class="answer">
                <p>The maintanence requests will be addressed on the basis of priority with full efficiency 
                    and customer satisfaction. Our team is there to assist you in all sorts of requirements always.
                    </p>
            </div>
        </div>

        <div class="faq">
            <div class="question">
                <h3>Are your houses pet-friendly?</h3>

                <svg width="15" height="10" viewBox="0 0 42 25">
                    <path d="M3 3L21 21L39 3" stroke="white" stroke-width="7" stroke-linecap="round"/>
                </svg>
            </div>
            <div class="answer">
                <p>Most of the houses are pet-friendly.But still there are some houses where pets are restricted.
                    We kindly request you to choose your house accordingly.
                    </p>
            </div>
        </div>

        <div class="faq">
            <div class="question">
                <h3>What can I do if the house-owner dont pick up my calls?</h3>

                <svg width="15" height="10" viewBox="0 0 42 25">
                    <path d="M3 3L21 21L39 3" stroke="white" stroke-width="7" stroke-linecap="round"/>
                </svg>
            </div>
            <div class="answer">
                <p>There is a contact support which helps you to make the owner aware of your concern.
                    The owner will be able to answer to your query at the earliest through this.

                    </p>
            </div>
        </div>

    </section>
  )
}

export default FAQ
