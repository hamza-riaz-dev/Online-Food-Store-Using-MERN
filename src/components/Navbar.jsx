import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../views/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {

  const [cartView, setCartView] = useState(false);

  const navigate = useNavigate();

  let data = useCart();

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/userlogin");
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic" to="/">MHD Food Store</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active fs-5 ms-3" aria-current="page" to="/">Home</Link>
            </div>
            {(localStorage.getItem("authToken")) ?
              <div className="navbar-nav">
                <Link className="nav-link ms-3" aria-current="page" to="/orderhistory">Order History</Link>
              </div> : ""}
            {(!localStorage.getItem("authToken")) ?

              <div className='navbar-nav ms-auto'>
                <Link className="btn btn-outline-light mx-2" to="/userlogin">Login</Link>
                <Link className="btn btn-outline-light mx-2" to="/createuser">Sign up</Link>
              </div>
              :
              <div className='navbar-nav ms-auto'>
                <button className='btn btn-outline-light position-relative mx-3' onClick={() => { setCartView(true) }}>
                  My Cart
                  {data.length === 0 ? "" :
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {data.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>}
                </button>

                {cartView ? <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal> : null}

                <button className='btn btn-outline-light text-danger mx-2' onClick={logout}>Logout</button>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}