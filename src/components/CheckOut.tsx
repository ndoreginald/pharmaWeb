import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function CheckOut () {
    const location = useLocation();
    const { cartItems, subtotal, shipping, total } = location.state;

    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address1: '',
        address2: '',
        country: '',
        city: '',
        state: '',
        zipCode: ''
    });

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            ...formData,
            cartItems,
            subtotal,
            shipping,
            total,
            paymentMethod
        };

        try {
            const response = await axios.post(`http://localhost:3001/e-Ectro/command/`, orderData);
            console.log('Order placed successfully', response.data);
            alert(`commande de ${orderData.firstName} validée avec succès`);
            // Handle successful order placement (e.g., redirect to a confirmation page)
        } catch (error) {
            console.error('Error placing order', error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
      <>
      <Navbar/>
     {/*-- Breadcrumb Start --*/}
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <a className="breadcrumb-item text-dark" href="/">Home</a>
                    <a className="breadcrumb-item text-dark" href="/shop">Shop</a>
                    <span className="breadcrumb-item active">Checkout</span>
                </nav>
            </div>
        </div>
    </div>
    {/*-- Breadcrumb Start --*/}

    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-lg-8">
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
                <div className="bg-light p-30 mb-5">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>First Name</label>
                                <input className="form-control" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="JOJO" required/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Last Name</label>
                                <input className="form-control" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>E-mail</label>
                                <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="kengnejordan2035@gmail.com" required/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Mobile No</label>
                                <input className="form-control" type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="+237 95 41 24 90" required/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 1</label>
                                <input className="form-control" type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="123 Street" required/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 2</label>
                                <input className="form-control" type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="123 Street"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Country</label>
                                <select className="custom-select" name="country" value={formData.country} onChange={handleChange} required>
                                    <option value="Cameroun">Cameroun</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Tunisie">Tunisie</option>
                                    <option value="Algeria">Algeria</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>City</label>
                                <input className="form-control" type="text" name="city" value={formData.city} onChange={handleChange} placeholder="New York" required/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>State</label>
                                <input className="form-control" type="text" name="state" value={formData.state} onChange={handleChange} placeholder="New York" required/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>ZIP Code</label>
                                <input className="form-control" type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="123" required/>
                            </div>
                            <div className="col-md-12 form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="newaccount"/>
                                    <label className="custom-control-label" htmlFor="newaccount">Create an account</label>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="shipto"/>
                                    <label className="custom-control-label" htmlFor="shipto"  data-toggle="collapse" data-target="#shipping-address">Ship to different address</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-block btn-primary font-weight-bold py-3">Place Order</button>
                    </form>
                </div>
                <div className="collapse mb-5" id="shipping-address">
                    <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Shipping Address</span></h5>
                    <div className="bg-light p-30">
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>First Name</label>
                                <input className="form-control" type="text" placeholder="John"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Last Name</label>
                                <input className="form-control" type="text" placeholder="Doe"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>E-mail</label>
                                <input className="form-control" type="text" placeholder="example@email.com"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Mobile No</label>
                                <input className="form-control" type="text" placeholder="+123 456 789"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 1</label>
                                <input className="form-control" type="text" placeholder="123 Street"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 2</label>
                                <input className="form-control" type="text" placeholder="123 Street"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Country</label>
                                <select className="custom-select">
                                    <option selected>Congo</option>
                                    <option>Tunisie</option>
                                    <option>Algeria</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>City</label>
                                <input className="form-control" type="text" placeholder="cameroun"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>State</label>
                                <input className="form-control" type="text" placeholder="Douala"/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>ZIP Code</label>
                                <input className="form-control" type="text" placeholder="2525"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            <div className="col-lg-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Order Total</span>
            </h5>
            <div className="bg-light p-30 mb-5">
                <div className="border-bottom">
                    <h6 className="mb-3">Products : Qte</h6>
                    {cartItems.map(item => (
                        <div className="d-flex justify-content-between" key={item._id}>
                            <p>{item.libelle} : x({item.quantite})</p>
                            <p>${item.prix}</p>
                        </div>
                    ))}
                </div>
                <div className="border-bottom pt-3 pb-2">
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
                </div>
            </div>
            <div className="mb-5">
                <h5 className="section-title position-relative text-uppercase mb-3">
                    <span className="bg-secondary pr-3">Payment</span>
                </h5>
                <div className="bg-light p-30">
                    <div className="form-group">
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                name="payment"
                                id="paypal"
                                checked={paymentMethod === 'paypal'}
                                onChange={() => handlePaymentMethodChange('paypal')}
                            />
                            <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                name="payment"
                                id="directcheck"
                                checked={paymentMethod === 'directcheck'}
                                onChange={() => handlePaymentMethodChange('directcheck')}
                            />
                            <label className="custom-control-label" htmlFor="directcheck">Direct Check</label>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                name="payment"
                                id="banktransfer"
                                checked={paymentMethod === 'banktransfer'}
                                onChange={() => handlePaymentMethodChange('banktransfer')}
                            />
                            <label className="custom-control-label" htmlFor="banktransfer">Bank Transfer</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
    </div>
   
    <Footer/>
      </>
    )
}

export default CheckOut;
