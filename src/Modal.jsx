import React from 'react'


import { createPortal } from 'react-dom'

import './Modal.css';

export default function Modal({ children, onClose }) {
    return (

        <>
            {createPortal(
                <>
                    <div id='os' />
                    <div id='ms'>
                        <button className='btn bg-danger text-white fs-6' style={{ padding: "10", marginLeft: "97.5%", marginTop: "-35px" }} onClick={onClose}> X </button>
                        {children}
                    </div>
                </>,
                document.getElementById('cart-root')
            )}
        </>
    );
}
