import { useEffect , useState} from 'react';


function Navbar () {
    
    const [categories, setCategories] = useState([]);
    //Initialisation de la liste des produits
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
 
    return (
      <>
            {/* Topbar Start*/} 
    <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
            <div className="col-lg-6 d-none d-lg-block">
                <div className="d-inline-flex align-items-center h-100">
                    <a className="text-body mr-3" href="/about">About</a>
                    <a className="text-body mr-3" href="/contact">Contact</a>
                    <a className="text-body mr-3" href="">Help</a>
                    <a className="text-body mr-3" href="/faq">FAQs</a>
                </div>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
                <div className="d-inline-flex align-items-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">My Account</button>
                        <div className="dropdown-menu dropdown-menu-right">
                        <a href="/login"><button className="dropdown-item" type="button">Sign in</button></a>
                            <a href="/signup"><button className="dropdown-item" type="button">Sign up</button></a>
                        </div>
                    </div>
                    <div className="btn-group mx-2">
                        <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">USD</button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" type="button">EUR</button>
                            <button className="dropdown-item" type="button">GBP</button>
                            <button className="dropdown-item" type="button">CAD</button>
                        </div>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">EN</button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" type="button">FR</button>
                            <button className="dropdown-item" type="button">AR</button>
                            <button className="dropdown-item" type="button">RU</button>
                        </div>
                    </div>
                </div>
                <div className="d-inline-flex align-items-center d-block d-lg-none">
                    <a href="" className="btn px-0 ml-2">
                        <i className="fas fa-heart text-dark"></i>
                        <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: "2px" }}>0</span>
                    </a>
                    <a href="" className="btn px-0 ml-2">
                        <i className="fas fa-shopping-cart text-dark"></i>
                        <span className="badge text-dark border border-dark rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                    </a>
                </div>
            </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
            <div className="col-lg-4">
                <a href="" className="text-decoration-none">
                    <span className="h1 text-uppercase text-primary bg-dark px-2">Ectro</span>
                    <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Sarl</span>
                </a>
            </div>
            <div className="col-lg-4 col-6 text-left">
                <form action="">
                    <div className="input-group">
                        <input id="search" type="text" className="form-control" placeholder="Search for products"/>
                        <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-lg-4 col-6 text-right">
                <p className="m-0">Customer Service</p>
                <h5 className="m-0">+237 95 41 24 90</h5>
            </div>
        </div>
    </div>
     {/* Topbar End*/} 

     {/* Navbar Start*/} 
    <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
        <div className="btn d-flex align-items-center justify-content-between bg-primary w-100" style={{ height: "65px", padding: "0 30px" }}>
            
        </div>
        </div>

            <div className="col-lg-9">
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <a href="" className="text-decoration-none d-block d-lg-none">
                        <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                        <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav mr-auto py-0">
                            <a href="/" className="nav-item nav-link">Home</a>
                            <a href="/shop" className="nav-item nav-link">Shop</a>
                            
                            {/* 
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Categorie<i className="fa fa-angle-down mt-1"></i></a>
                                <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                    <a href="/carte" className="dropdown-item">Shopping Cart</a>
                                    <a href="/checkout" className="dropdown-item">Checkout</a>
                                </div>
                            </div>
                            */}
                             <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Categorie<i className="fa fa-angle-down mt-1"></i></a>
                                <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                    {categories.map(cat=>(
                                        <a href={`/categorie/${cat._id}`} className="dropdown-item">{cat.nom}</a>
                                    ))}
                                </div>
                            </div>
                            <a href="/promo" className="nav-item nav-link">Promotion</a>
                            <a href="/contact" className="nav-item nav-link">Contact</a>
                            <a href="/news" className="nav-item nav-link">News</a>
                        </div>
                        <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                            <a href="" className="btn px-0">
                                <i className="fas fa-heart text-primary"></i>
                                <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom: "2px;"}}>0</span>
                            </a>
                            <a href="/carte" className="btn px-0 ml-3">
                                <i className="fas fa-shopping-cart text-primary"></i>
                                <span className="badge text-secondary border border-secondary rounded-circle"  style={{paddingBottom: "2px;"}}>0</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    {/* Navbar End*/}


    
      </>
    )
  }


export default Navbar
