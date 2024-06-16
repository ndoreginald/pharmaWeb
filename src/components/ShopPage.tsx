import { SetStateAction, useEffect, useState } from "react";
import Footer from "../layout/Footer"
import Navbar from "../layout/Navbar"
import Pagination from "../layout/Pagination";
import PriceFilter from "../layout/PriceFilter";

function ShopPage() {

    const [products, setProducts] = useState([]);
    const [productsPopulate, setProductsPopulate] = useState([]);
  
   

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

    const productsData = [
        { id: 1, name: 'Product 1', price: 123, quantity: 1, image: 'img/product-1.jpg' },
        { id: 2, name: 'Product 2', price: 150, quantity: 1, image: 'img/product-2.jpg' },
        { id: 3, name: 'Product 3', price: 250, quantity: 1, image: 'img/product-3.jpg' },
        { id: 4, name: 'Product 4', price: 150, quantity: 1, image: 'img/product-4.jpg' },
        { id: 5, name: 'Product 5', price: 150, quantity: 1, image: 'img/product-5.jpg' },
        { id: 6, name: 'Product 6', price: 200, quantity: 1, image: 'img/product-6.jpg' },
        { id: 7, name: 'Product 7', price: 150, quantity: 1, image: 'img/product-7.jpg' },
        { id: 8, name: 'Product 8', price: 150, quantity: 1, image: 'img/product-8.jpg' },
        { id: 9, name: 'Product 9', price: 300, quantity: 1, image: 'img/product-9.jpg' },
        { id: 10, name: 'Product 10', price: 123, quantity: 1, image: 'img/product-1.jpg' },
        { id: 11, name: 'Product 11', price: 200, quantity: 1, image: 'img/product-2.jpg' },
        { id: 12, name: 'Product 12', price: 123, quantity: 1, image: 'img/product-3.jpg' },
        { id: 13, name: 'Product 12', price: 400, quantity: 1, image: 'img/product-4.jpg' },
    ];

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  
  const [filters, setFilters] = useState({
    price: { min: 0, max: 500 },
  });

  const handleFilterChange = (min: any, max: any) => {
    setFilters({ ...filters, price: { min, max } });
  };

  const filteredProducts = products.filter(p => 
    p.price >= filters.price.min && p.price <= filters.price.max
  );


  // Calcule les produits actuels
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change de page
  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

    return (
      <>
        <Navbar/>
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
                <PriceFilter handleFilterChange={handleFilterChange} />
                </div>
                 {/*-- Price End --*/}
             
            </div>
             {/*-- Shop Sidebar  End --*/}


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
              <div className="btn-group ml-2">
                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Showing</button>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#" onClick={() => setProductsPerPage(10)}>10</a>
                  <a className="dropdown-item" href="#" onClick={() => setProductsPerPage(20)}>20</a>
                  <a className="dropdown-item" href="#" onClick={() => setProductsPerPage(30)}>30</a>
                </div>
              </div>
            </div>
          </div>
        </div>
       
        {currentProducts.map(product => (
          <div key={product.id} className="col-lg-4 col-md-6 col-sm-6 pb-1">
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden">
                <img className="img-fluid w-100" src={product.image} alt={product.name} />
                <div className="product-action">
                  <a className="btn btn-outline-dark btn-square" href="/cart"><i className="fa fa-shopping-cart"></i></a>
                  <a className="btn btn-outline-dark btn-square" href="#"><i className="far fa-heart"></i></a>
                  <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-sync-alt"></i></a>
                  <a className="btn btn-outline-dark btn-square" href="#search"><i className="fa fa-search"></i></a>
                </div>
              </div>
              <div className="text-center py-4">
                        <a className="h6 text-decoration-none text-truncate" href="/detail">{product.name}</a>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>{product.price}</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
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
            </div>
          </div>
        ))}


          {products.map( p =>(
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div className="product-item bg-light mb-4">
                    <a href={`/detail/${p._id}`} className="text-decoration-none ">
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
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
 {/*-- Shop Product End --*/}



    </div>
   {/*-- Shop End --*/}
   </div>
   <Footer/>
      </>
    )
  }


export default ShopPage
