import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import './index.css'
import HomePage from './components/HomePage';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import Carousel from './layout/Carousel';
import Vendor from './layout/Vendor';
import { useEffect, useState } from 'react';





function App() {

  const cartContent = [
    {
      _id:'',
      libelle: '',
      description: '',
      prix: 0,
      quantite: 0,
      idCategorie: '',
      popularity: 0,
      date_ajout:'',
      image:''
    }
  ];

  useEffect(() => {
    localStorage.setItem('cartItems', cartContent.toString());
}, [cartContent]);
 

  return (
    
    <>
    <div> <Navbar/> </div>
    
      <div><Carousel/></div> 

    <div><HomePage/> </div>

    <div><Vendor/> </div> 

    <div><Footer/> </div> 

    </>
  )
}

export default App
//<div><Header/> </div> 