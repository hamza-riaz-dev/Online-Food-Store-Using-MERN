import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-white text-center fs-3">Your Cart is Empty.</div>
            </div>
        );
    }

    const checkOut = async () => {
        let userEmail = localStorage.getItem('userEmail');
        let response = await fetch('http://localhost:5000/api/orderData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                orderDate: new Date().toDateString(),
            }),
        });
        console.log('Order Response:', response);
        if (response.status === 200) {
            dispatch({ type: 'DROP' });
            alert('Checkout successful! \nYour order has been placed successfully. The payment method is cash on delivery. Your order details will be notified to you on your email');
        }
    };

    let totalPrice = data.reduce((total, item) => total + item.price, 0);

    return (
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
            <table className="table table-dark table-hover">
                <thead className="fs-4">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Option</th>
                        <th scope="col">Amount</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.size}</td>
                            <td>Rs. {item.price}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger p-1 float-end"
                                    onClick={() => {
                                        dispatch({ type: 'REMOVE', index: index });
                                    }}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h1 className="fs-4 text-white">Total Price: Rs. {totalPrice}</h1>
            </div>
            <button className="btn btn-success mt-5" onClick={checkOut}>
                Check Out
            </button>
        </div>
    );
}
