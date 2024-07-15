import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import CheckOut from './CheckOut';
import { useNavigate  } from 'react-router-dom';



function Cart() {

    const navigate = useNavigate();

    const handleProceedToCheckout = () => {
        navigate('/checkout',{ state: { cartItems, subtotal, shipping, total }});
    };

    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    const [coupon, setCoupon] = useState('');

    // Sync cartItems with localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleQuantityChange = (id, delta) => {
        setCartItems(cartItems.map(item =>
            item._id === id ? { ...item, quantite: Math.max(1, item.quantite + delta) } : item
        ));
    };

    const handleRemoveProduct = (id) => {
        setCartItems(cartItems.filter(item => item._id !== id));
    };

    const subtotal = cartItems.reduce((total, item) => total + item.prix * item.quantite, 0);
    const shipping = 10;
    const total = subtotal + shipping;

    return (
        <>
            <Navbar />
             {/*-- Breadcrumb Start --*/}
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-10">
                            <nav className="breadcrumb bg-light mb-30">
                                <a className="breadcrumb-item text-dark" href="/">Home</a>
                                <a className="breadcrumb-item text-dark" href="/shop">Shop</a>
                                <span className="breadcrumb-item active">panier</span>
                            </nav>
                        </div>
                        <div className="col-2">
                        <button className="btn btn-block btn-success font-weight-bold  py-2" onClick={() => navigate(`/command/`)}
                            >check Commad List</button> 
                        </div>
                    </div>
                </div>
             {/*-- Breadcrumb Start --*/}

            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {cartItems.map(item => (
                                    <tr key={item._id}>
                                        <td className="align-middle">
                                            <img src={item.image} alt="" style={{ width: "50px" }} /> {item.libelle}
                                        </td>
                                        <td className="align-middle">${item.prix}</td>
                                        <td className="align-middle">
                                            <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-minus" onClick={() => handleQuantityChange(item._id, -1)}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" value={item.quantite} readOnly />
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-plus" onClick={() => handleQuantityChange(item._id, 1)}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">${item.prix * item.quantite}</td>
                                        <td className="align-middle">
                                            <button className="btn btn-sm btn-danger" onClick={() => handleRemoveProduct(item._id)}>
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <form className="mb-30" action="">
                            <div className="input-group">
                                <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Cart Summary</span>
                        </h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>${subtotal}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">${shipping}</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>${total}</h5>
                                </div>
                                <a href="/checkout">
                                    <button className="btn btn-block btn-primary font-weight-bold my-3 py-3" onClick={handleProceedToCheckout}>
                                        Proceed To Checkout
                                    </button>
                                </a>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>

            <Footer />

           
        </>
    );
}

export default Cart;