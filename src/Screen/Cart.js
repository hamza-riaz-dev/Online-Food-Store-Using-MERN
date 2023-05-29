import React from 'react';
import { useCart, useDispatchCart } from '../Components/ContextReducer';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function Cart() {
  let data = useCart();

  let dispatch = useDispatchCart();
  
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-primary'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => { 
    let userEmail = localStorage.getItem('userEmail');
    let response = await fetch('http://localhost:3100/api/orderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log('JSON RESPONSE:::::', response.status);
    if (response.status === 200) {
      dispatch({ type: 'DROP' });
    }
  };

  let totalPrice = data.reduce((total, food) => total + parseFloat(food.price), 0);

  return (
    <div className='text-white'>
      {console.log(data)}
      <div className='container m-auto mt-5 text-info table-responsive table-responsive-sm table-responsive-md'>
        <table className='table'>
          <thead className='text-success fs-4 text-center'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody className='text-white text-center'>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type='button' className='btn p-0' onClick={() => { dispatch({ type: 'REMOVE', index: index }) }}>
                    <div className='text-white'><DeleteOutlineIcon /></div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>

    <div>
      <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
    </div>
  </div>



</div>
  )
}