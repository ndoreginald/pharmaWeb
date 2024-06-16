//import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

function Faq () {
  
    const faqData = [
        {
          question: 'Question 1',
          answer: 'Réponse à la question 1.',
        },
        {
          question: 'Question 2',
          answer: 'Réponse à la question 2.',
        },
        {
          question: 'Question 3',
          answer: 'Réponse à la question 3.',
        },
        // Ajoutez d'autres questions et réponses selon vos besoins
      ];
    return (
      <>
      <Navbar/>
        <div className="container">
  <h2 className="text-center mt-5 mb-4">FAQ</h2>
  <div className="accordion" id="faqAccordion">
    {faqData.map((item, index) => (
      <div className="accordion-item" key={index}>
        <h2 className="accordion-header" id={`heading${index}`}>
          <button  className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
            {item.question}
          </button>
        </h2>
        <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#faqAccordion">
          <div className="accordion-body">{item.answer}</div>
        </div>
      </div>
      
    ))}
  </div>
  <div className="text-center mt-4">
    <a href="/chatbox"><button className="btn btn-primary">Démarrer une discussion</button></a>
  </div>
  
      
    </div>
    <Footer/>
      </>
    )

}

export default Faq
