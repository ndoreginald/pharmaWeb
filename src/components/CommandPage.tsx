import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar"
import axios from "axios";


function CommandPage () {
  
    const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/e-Ectro/command/');
      setOrders(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes :', error);
    }
  };

  const cancelOrder = async (orderId: any) => {
    try {
      await axios.post(`http://localhost:3001/e-Ectro/command/cancel/${orderId}`);
      fetchOrders(); // Recharger la liste des commandes après l'annulation
    } catch (error) {
      console.error('Erreur lors de l\'annulation de la commande :', error);
    }
  };

    return (
      <>
       <Navbar />
             {/*-- Breadcrumb Start --*/}
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12">
                            <nav className="breadcrumb bg-light mb-30">
                                <a className="breadcrumb-item text-dark" href="/">Home</a>
                                <a className="breadcrumb-item text-dark" href="/carte">Carte</a>
                                <span className="breadcrumb-item active">Commandes</span>
                            </nav>
                        </div>
                    </div>
                </div>
             {/*-- Breadcrumb Start --*/}
        
             <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-12 table-responsive mb-5">
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                            <tr>
                               
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>State</th>
                                <th>ZIP Code</th>
                                <th>Payment Method</th>
                                <th>Order Items</th>
                                <th>Subtotal</th>
                                <th>Shipping</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody className="align-middle">
                                {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="align-middle">{order.firstName} {order.lastName}</td>
                                    <td className="align-middle">{order.email}</td>
                                    <td className="align-middle">{order.mobile}</td>
                                    <td className="align-middle">{order.address1} {order.address2}</td>
                                    <td className="align-middle">{order.country}</td>
                                    <td className="align-middle">{order.city}</td>
                                    <td className="align-middle">{order.state}</td>
                                    <td className="align-middle">{order.zipCode}</td>
                                    <td className="align-middle">{order.paymentMethod}</td>
                                    <td>
                                    <ul>
                                        {order.cartItems.map(item => (
                                        <li key={item._id}>{item.libelle}</li>
                                        ))}
                                    </ul>
                                    </td>
                                    <td className="align-middle">${order.subtotal}</td>
                                    <td className="align-middle">${order.shipping}</td>
                                    <td className="align-middle">${order.total}</td>
                                    <td className={order.status === 'cancelled' ? 'text-danger' : 'text-success'}>{order.status}</td>
                                    <td>
                                    {order.status !== 'cancelled' && (
                                        <button className="btn btn-sm btn-danger" onClick={() => cancelOrder(order._id)}>
                                            <i className="fa fa-times"></i></button>
                                    )}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div> 
            </div>
            
            

      </>
    )
  }


export default CommandPage
