
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import './index.css'
import './style.scss'
import './style.min.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './components/Contact.tsx';
import ShopPage from './components/ShopPage.tsx';
import DetailPage from './components/DetailPage.tsx';
import Cart from './components/Cart.tsx';
import CheckOut from './components/CheckOut.tsx';
import HomePage from './components/HomePage.tsx';
import Test from './components/Test.tsx';
import LoginPage from './components/LoginPage.tsx';
import NewsPage from './components/NewsPage.tsx';
import Faq from './components/Faq.tsx';
import FirstPage from './components/FirstPage.tsx';
import SignUpPage from './components/SignUpPage.tsx';
import AboutPage from './components/AboutPage.tsx';
import ErrorPage from './components/ErrorPage.tsx';
import ChatPage from './components/ChatPage.tsx';
import PromoPage from './components/PromoPage.tsx';
import CategorieShopPage from './components/CategorieShopPage.tsx';
import CategorieForm from './component_admin/CategorieForm.tsx';
import CategorieList from './component_admin/CategorieList.tsx';
import ListProduct from './component_admin/ListProduct.tsx';
import AddProduct from './component_admin/AddProduct.tsx';
import Users from './component_admin/Users.tsx';
import Admin from './component_admin/Admin.tsx';
import EditProduit from './component_admin/EditProduit.tsx';
import EditCategorie from './component_admin/EditCategorie.tsx';
import EditProduit1 from './component_admin/EditProduit1.tsx';
import CommandList from './component_admin/CommandList.tsx';
import CommandPage from './components/CommandPage.tsx';
import ContactAdmin from './component_admin/ContactAdmin.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/carte" element={<Cart />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/test" element={<Test />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/firstpage" element={<FirstPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/chatbox" element={<ChatPage />} />
      <Route path="/promo" element={<PromoPage />} />
      <Route path="/command" element={<CommandPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/categorie/:id" element={<CategorieShopPage/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/admin/categories" element={<CategorieList/>} />
      <Route path="/admin/products" element={<ListProduct/>} />
      <Route path='/admin/AddProduct' element={<AddProduct/>}/>
      <Route path='/admin/categorieForm' element={<CategorieForm/>}/>
      <Route path='/admin/userList' element={<Users/>}/>
      <Route path='/admin/editProduct/:id' element={<EditProduit/>}/>
      <Route path='/admin/editProduct1/:id' element={<EditProduit1/>}/>
      <Route path='/admin/editCategorie/:id' element={<EditCategorie/>}/>
      <Route path='/admin/command' element={<CommandList/>}/>
      <Route path='/admin/contact' element={<ContactAdmin/>}/>
      
    </Routes>
  </Router>

  </>
);
//<Navbar />
