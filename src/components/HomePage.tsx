import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from '../layout/Carousel';
import { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import '../App.css';
import axios from 'axios';

function HomePage () {
 

    const [products, setProducts] = useState([]);
    const [productsPopulate, setProductsPopulate] = useState([]);
    const [productsRecent, setProductsRecent] = useState([]);
    const [categories, setCategories] = useState([]);

    //Recupere tous les produits
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

    //Recupere tous les produits populaires
    useEffect(() => {
        fetch(`http://localhost:3001/e-Ectro/produit/popular`)
          .then(response => response.json())
          .then(data => {
            if (data) {
                setProductsPopulate(data);
            }
          })
          .catch(error => console.error('Erreur lors de la récupération des données :', error)); 
        }, []);

        //Recupere tous les produits recents
    useEffect(() => {
        fetch(`http://localhost:3001/e-Ectro/produit/recent`)
          .then(response => response.json())
          .then(data => {
            if (data) {
                setProductsRecent(data);
            }
          })
          .catch(error => console.error('Erreur lors de la récupération des données :', error)); 
        }, []);

    //Recupere la liste des categories
    useEffect(() => {
        fetch(`http://localhost:3001/e-Ectro/categorie/`)
          .then(response => response.json())
          .then(data => {
            if (data) {
                setCategories(data);
            }
          })
          .catch(error => console.error('Erreur lors de la récupération des données :', error)); 
    }, []);

    const incrementPopular = async (productId) => {
        try {
          const response = await axios.patch(`http://localhost:3001/e-Ectro/produit/${productId}`); 
          console.log('Popularité mise à jour:', response.data);
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la popularité:', error);
        }
      };

    return (
      <>
      <Navbar/>
       {/*--Carousel Start--*/}
        <Carousel/>
       {/*--Carousel End --*/}
      
        {/*--Featured Start--*/}
        <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                    <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                    <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                    <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                    <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                </div>
            </div>
        </div>
        </div>
        {/*--Featured End--*/}

     {/*--Categories Start--*/}

    <div className="container-fluid pt-5" id="categorie">
        <h2 className="mx-xl-5 mb-4"><span className="bg-secondary pr-4">Categories</span></h2>
        <div className="row px-xl-5 pb-3">
            {categories.map( cat => (
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                <a className="text-decoration-none" href={`/categorie/${cat._id}`}>
                    <div className="cat-item d-flex align-items-center mb-4">
                        <div className="overflow-hidden" style={{width: "100px",height: "100px"}}>
                            <img className="img-fluid" src="img/cat-1.jpg" alt={cat.nom}/>
                        </div>
                        <div className="flex-fill pl-3">
                            <h6>{cat.nom}</h6>
                            <small className="text-body">{cat.produits.length} Products</small>
                        </div>
                    </div>
                </a>
            </div>
            ))}
        </div>
    </div>

     {/*--Categories End--*/}

    {/*--Popular Products Start --*/}
    <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-secondary pr-3">Popular Products</span>
        </h2>
        <div className="row px-xl-5">
            {productsPopulate.map( p =>(
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div className="product-item bg-light mb-4">
                    <a href={`/detail/${p._id}`} className="text-decoration-none " onClick={() => incrementPopular(p._id)}>
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" src={p.image} alt={p.libelle}/>
                        <div className="product-action">
                            <a className="btn btn-outline-dark btn-square" href="/carte"><i className="fa fa-shopping-cart"></i></a>
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
        </div>
    </div>
    {/*--Populars Products End --*/}
    
    {/*--Offer Start --*/} 
    <div className="container-fluid pt-5 pb-3">
        <div className="row px-xl-5">
            <div className="col-md-6">
                <div className="product-offer mb-30" style={{height: "300px"}}>
                    <img className="img-fluid" src="img/offer-1.jpg" alt=""/>
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <a href="/shop" className="btn btn-primary">Shop Now</a>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="product-offer mb-30" style={{height: "300px"}}>
                    <img className="img-fluid" src="img/offer-2.jpg" alt=""/>
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <a href="/shop" className="btn btn-primary">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
   {/*--Offer End --*/} 


    {/*--Recents Products Start --*/}
    <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-secondary pr-3">Recent Products</span>
        </h2>
        <div className="row px-xl-5">
            {productsRecent.map( p =>(
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div className="product-item bg-light mb-4">
                    <a href={`/detail/${p._id}`} className="text-decoration-none" onClick={() => incrementPopular(p._id)}>
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" src={p.image} alt={p.libelle}/>
                        <div className="product-action">
                            <a className="btn btn-outline-dark btn-square" href="/carte"><i className="fa fa-shopping-cart"></i></a>
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
        </div>
    </div>
     {/*--Recents Products End --*/}
     
      {/*--Vendor Start--*/}
        
      {/*--Vendor End --*/}

      <Footer/>
     </>
    ) 
  }


export default HomePage;
