import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';



function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = '7afc075a1cbd4d67ad42ad638235cfd3'; // Remplacez YOUR_API_KEY par votre propre clé API
    const apiUrl = `https://newsapi.org/v2/everything?q=health&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.articles) {
          setNews(data.articles);
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
  }, []);

  return (
    <>
    <Navbar/>
      <div className="container">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Dernières actualités santé</span>
      </h2>
      <div className="row">
        {news.map((article, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-4">
            <div className="card product-item">
              <img src={article.urlToImage} alt="" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title"><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h5>
                <p className="card-text">{article.description}</p>
              </div>
              <div className="card-footer bg-light">
                <small className="text-muted">Auteur: {article.author}</small><br />
                <small className="text-muted">Publié le: {new Date(article.publishedAt).toLocaleDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <Footer/>
    </>
    

    
  );
}

export default NewsPage;
