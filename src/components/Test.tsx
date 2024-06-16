import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';


function Test() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Nombre d'éléments par page
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Recupere tous les produits
  useEffect(() => {
    fetch(`http://localhost:3001/e-Ectro/produit/`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setProducts(data);
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
  }, []);

  // Filtrage par prix
  const filteredProducts = products.filter(p => {
    const price = parseFloat(p.prix);
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    return (!minPrice || price >= min) && (!maxPrice || price <= max);
  });

  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

   // Fonction pour ajouter un produit au panier
   const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p._id === product._id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <>
      <Navbar />
      {/*-- Breadcrumb Start --*/}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="#">Home</a>
              <a className="breadcrumb-item text-dark" href="#">Shop</a>
              <span className="breadcrumb-item active">Promo List</span>
            </nav>
          </div>
        </div>
      </div>
      {/*-- Breadcrumb End --*/}

      <div className="container-fluid">
        <div className="row px-xl-5">
          {/*-- Shop Sidebar Start --*/}
          <div className="col-lg-3 col-md-4">
            {/*-- Price Start --*/}
            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by price</span></h5>
            <div className="bg-light p-4 mb-30">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            {/*-- Price End --*/}
          </div>
          {/*-- Shop Sidebar End --*/}

          {/*-- Shop Product Start --*/}
          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <button className="btn btn-sm btn-light"><i className="fa fa-th-large"></i></button>
                    <button className="btn btn-sm btn-light ml-2"><i className="fa fa-bars"></i></button>
                  </div>
                  <div className="ml-2">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#">Latest</a>
                        <a className="dropdown-item" href="#">Popularity</a>
                        <a className="dropdown-item" href="#">Best Rating</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {currentProducts.map(p => (
                <div key={p._id} className="col-lg-3 col-md-4 col-sm-6 pb-1">
                  <div className="product-item bg-light mb-4">
                    <a href={`/detail/${p._id}`} className="text-decoration-none">
                      <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" src={p.image} alt={p.libelle} />
                        <div className="product-action">
                          <a className="btn btn-outline-dark btn-square" href="/carte" onClick={() => addToCart(product)}><i className="fa fa-shopping-cart"></i></a>
                          <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
                          <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></a>
                          <a className="btn btn-outline-dark btn-square" href="#search"><i className="fa fa-search"></i></a>
                        </div>
                      </div>
                      <div className="text-center py-4">
                        {p.libelle}
                        <div className="d-flex align-items-center justify-content-center mt-2">
                          <h5>${p.prix}</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <small className="fa fa-star text-primary mr-1"></small>
                          <small className="fa fa-star text-primary mr-1"></small>
                          <small className="fa fa-star text-primary mr-1"></small>
                          <small className="fa fa-star text-primary mr-1"></small>
                          <small className="fa fa-star text-primary mr-1"></small>
                          <small>(99)</small>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className="col-12">
                <nav>
                  <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => paginate(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/*-- Shop Product End --*/}
        </div>
        {/*-- Shop End --*/}
      </div>
    </>
  );
}

export default Test;
