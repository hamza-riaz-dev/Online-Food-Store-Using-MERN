import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge } from 'react-bootstrap';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Modal from '../Model';
import Cart from '../Screen/Cart';
import { useCart } from '../Components/ContextReducer';


function NavScroll() {

  const [cartView, setCartView] = useState()
  
  let navigate = useNavigate()

  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem('token')

    navigate("/login");
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>

        <Link  className='navbar-brand fs-1 text-white ' to="/">
        <img src="logo.jpg" class="attachment-full " alt="" loading="lazy" width="150" height="100"/>{""}
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse>

          <Nav className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }} navbarScroll>

            <Link className='btn bg-white text-success mx-1 active' aria-current="page" to="/">Home</Link>


          </Nav>

          {(localStorage.getItem("token")) ?
            <li className="nav-item">
              <Link className="btn bg-white text-success mx-3" aria-current="page" to="/MyOrders">My Orders</Link> 
            </li> : ""}

          {(!localStorage.getItem("token")) ?
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
            </div>
            : <div>
              <div className="btn bg-white text-success mx-1" onClick={() =>{setCartView(true)}}>
                My Cart {""}
                <Badge pill bg="danger"> {data.length} </Badge>
                </div>
                {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
              <div className="btn bg-white text-success mx-1" onClick={handleLogout}>Logout</div>

            </div>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;