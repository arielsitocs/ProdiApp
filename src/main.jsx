import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './components/login/login.jsx'
import Register from './components/register/register.jsx'
import CreateProduct from './components/create-product/create-product.jsx'
import NavBar from './components/nav-bar/navBar.jsx'
import Products from './components/products/products.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<App/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/createProduct' element={<CreateProduct />}></Route>
          <Route path='/products' element={<Products />}></Route>
        </Routes>  
    </StrictMode>,
  </BrowserRouter>
)
