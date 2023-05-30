import React from 'react';
import {  Link } from 'react-router-dom'

export default function App() {
  return (


      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright: {""}
            <Link to='/'>CHEF'S FOOD Good Food Good Life</Link>
      </div>

  );
}