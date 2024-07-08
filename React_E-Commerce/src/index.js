import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './auth/AuthenProvider';
import store from './redux/store';


import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound } from "./pages"
import PriveRouter from './admin/PrivateRouter';
import LayoutAdmin from './admin/layouts';
import Dashboard from './admin/pages/Dashboard';
import ManageUsers from './admin/pages/Manager/Users';
import CreateUser from './admin/pages/Manager/Users/CreateUser';
import CreateProduct from './admin/pages/Manager/Products/CreateProduct';
import ManagerProduct from './admin/pages/Manager/Products';
import ManagerOrder from './admin/pages/Manager/Oders';
import Profile from './pages/Profile';
import ManagerContact from './admin/pages/Manager/Contacts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PriveRouter />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route element={<LayoutAdmin />} >
              <Route path='/admin/dashboard' element={<Dashboard />}/>
              <Route path='/admin/manager-oders' element={<ManagerOrder />}/>
              <Route path='/admin/manager-users' element={<ManageUsers />}/>
              <Route path='/admin/manager-contacts' element={<ManagerContact />}/>
              <Route path='/admin/manager-users/create-user' element={<CreateUser />}/>
              <Route path='/admin/manager-products' element={<ManagerProduct />}/>
              <Route path='/admin/manager-products/create-product' element={<CreateProduct />}/>
              
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product/*" element={<PageNotFound />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/checkout/" element={<Checkout />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </AuthProvider>
);