import { useParams } from "react-router-dom"
import Footer from "../layout/Footer"
import Navbar from "../layout/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";


function DetailPage () {
    const {id} = useParams();
    const [product,setProduct]=useState();
    const [productsPopulate,setProductsPopulate]=useState([]);
    const [nbrItems,setNbrItems] = useState(1);
    const [formData, setFormData] = useState({
        _id:'',
        libelle: '',
        description: '',
        idCategorie: '',
        prix: 0,
        quantite: nbrItems,
        image: '',
        popularity: 0,
        date_ajout: ''
    });
    const [cartItems,setCartItems]=useState(() => {
        // Parse les items existants dans localStorage, ou retourne un tableau vide s'il n'y a rien
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    // Récupérer le produit
    useEffect(() => {
        fetch(`http://localhost:3001/e-Ectro/produit/${id}`)
          .then(response => response.json())
          .then(data => {
            if (data) {
              setProduct(data);
              console.log(product);
            }
          })
          .catch(error => console.error('Erreur lors de la récupération des données :', error));
    }, [id]);

    useEffect(() => {
        if (product) {
          const formattedDate = product.date_ajout ? product.date_ajout.split('T')[0] : '';
          setFormData({
            _id: product._id || '',
            libelle: product.libelle || '',
            description: product.description || '',
            idCategorie: product.idCategorie|| '',
            prix: product.prix || 0,
            quantite: nbrItems,
            image: product.image || '',
            popularity: product.popularity || 0,
            date_ajout: formattedDate || ''
          });
        }
    }, [product]);

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

    const incrementPopular = async (productId) => {
        try {
          const response = await axios.patch(`http://localhost:3001/e-Ectro/produit/${productId}`); 
          console.log('Popularité mise à jour:', response.data);
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la popularité:', error);
        }
    };

    const handleDecrement = async () =>{
        setNbrItems(nbrItems-1);
    }
    const handleIncrement = async () =>{
        setNbrItems(nbrItems+1);
    }

    const AddToCart = async ()=>{
        // Ajoute formData à cartItems
        const updatedCartItems = [...cartItems, formData];
        setCartItems(updatedCartItems);
        // Met à jour localStorage
        try{
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); 
            console.log('Ajout reussi');
        }catch{
            console.log('Echec Ajout ');
        }
    }

    if (!product) {
        return <div>Chargement...</div>;
    }

    return (
      <>
      <Navbar/>
         {/* Breadcrumb Start */} 
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <a className="breadcrumb-item text-dark" href="/">Home</a>
                    <a className="breadcrumb-item text-dark" href="/shop">Shop</a>
                    <span className="breadcrumb-item active">Shop Detail</span>
                </nav>
            </div>
        </div>
    </div>
    {/* Breadcrumb End */}

             {/* Shop Detail Start */} 
    <div className="container-fluid pb-5">
        <div className="row px-xl-5">
            <div className="col-lg-5 mb-30">
                <div id="product-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner bg-light">
                        <div className="carousel-item active">
                            <img className="w-100 h-100" src={product.image} alt={product.libelle}/>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100 h-100" src={product.image} alt={product.libelle}/>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100 h-100" src={product.image} alt={product.libelle}/>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100 h-100" src={product.image} alt={product.libelle}/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                        <i className="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                        <i className="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                </div>
            </div>

            <div className="col-lg-7 h-auto mb-30">
                <div className="h-100 bg-light p-30">
                    <h3>{product.libelle}</h3>
                    <div className="d-flex mb-3">
                        <div className="text-primary mr-2">
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star-half-alt"></small>
                            <small className="far fa-star"></small>
                        </div>
                        <small className="pt-1">(99 Reviews)</small>
                    </div>
                    <h3 className="font-weight-semi-bold mb-4">$150.00</h3>
                    <p className="mb-4">{product.description}<br/>
                    Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit
                        clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea Nonumy
                    </p>
                    <div className="d-flex align-items-center mb-4 pt-2">
                        <div className="input-group quantity mr-3" style={{width: "130px"}}>
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-minus" onClick={()=>(handleDecrement())}>
                                    <i className="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text" className="form-control bg-secondary border-0 text-center" value={nbrItems}/>
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-plus" onClick={()=>(handleIncrement())}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <a href="/carte"><button className="btn btn-primary px-3" onClick={AddToCart}><i className="fa fa-shopping-cart mr-1"></i> Add To
                            Cart</button></a>
                    </div>
                    <div className="d-flex pt-2">
                        <strong className="text-dark mr-2">Share on:</strong>
                        <div className="d-inline-flex">
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row px-xl-5">
            <div className="col">
                <div className="bg-light p-30">
                    <div className="nav nav-tabs mb-4">
                        <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Description</a>
                        <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2">Information</a>
                        <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab-pane-1">
                            <h4 className="mb-3">Product Description</h4>
                            <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
                            <p>Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna takimata justo et amet magna et.</p>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-2">
                            <h4 className="mb-3">Additional Information</h4>
                            <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item px-0">
                                            Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                        </li>
                                        <li className="list-group-item px-0">
                                            Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                        </li>
                                        <li className="list-group-item px-0">
                                            Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                        </li>
                                        <li className="list-group-item px-0">
                                            Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                        </li>
                                      </ul> 
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item px-0">
                                            Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                        </li>
                                        <li className="list-group-item px-0">
                                            Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                        </li>
                                        <li className="list-group-item px-0">
                                            Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                        </li>
                                        <li className="list-group-item px-0">
                                            Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                        </li>
                                      </ul> 
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="mb-4">1 review for "Product Name"</h4>
                                    <div className="media mb-4">
                                        <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{width: "45px"}}/>
                                        <div className="media-body">
                                            <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                            <div className="text-primary mb-2">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                            <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="mb-4">Leave a review</h4>
                                    <small>Your email address will not be published. Required fields are marked *</small>
                                    <div className="d-flex my-3">
                                        <p className="mb-0 mr-2">Your Rating * :</p>
                                        <div className="text-primary">
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                        </div>
                                    </div>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="message">Your Review *</label>
                                            <textarea id="message" cols={30} rows={5} className="form-control"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Your Name *</label>
                                            <input type="text" className="form-control" id="name"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Your Email *</label>
                                            <input type="email" className="form-control" id="email"/>
                                        </div>
                                        <div className="form-group mb-0">
                                            <input type="submit" value="Leave Your Review" className="btn btn-primary px-3"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   {/* Shop Detail End*/} 


    {/* Products Start*/} 
    <div className="container-fluid">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                <span className="bg-secondary pr-3">You May Also Like</span>
            </h2>
            <div className="row px-xl-5">
                <div className="col-12">
                    <div className="row justify-content-center">
                        {productsPopulate.slice(0, 4).map((item, index) => (
                            <div key={index} className="col-lg-3 col-md-4 col-sm-6 pb-1">
                                <div className="product-item bg-light">
                                <a href={`/detail/${item._id}`} className="text-decoration-none " onClick={() => incrementPopular(p._id)}>
                                    <div className="product-img position-relative overflow-hidden">
                                        <img className="img-fluid w-100 product-img" src={item.image} alt={item.libelle}/>
                                        <div className="product-action">
                                            <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-shopping-cart"></i></a>
                                            <a className="btn btn-outline-dark btn-square" href="#"><i className="far fa-heart"></i></a>
                                            <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-sync-alt"></i></a>
                                            <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                    <div className="text-center py-4">
                                        <a className="h6 text-decoration-none text-truncate" href="#">{item.libelle}</a>
                                        <div className="d-flex align-items-center justify-content-center mt-2">
                                            <h5>${item.prix}</h5><h6 className="text-muted ml-2"><del>${item.prix}</del></h6>
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
            </div>
        </div>
    {/* Products End*/} 
    <Footer/>
      </>
    )
  }


export default DetailPage
