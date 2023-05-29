import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OrderHistory() {
    const [orderData, setOrderData] = useState({});

    useEffect(() => {
        const fetchOrderHistory = async () => {
            console.log(localStorage.getItem('userEmail'));
            await fetch('http://localhost:5000/api/myOrderData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            })
                .then(async (res) => {
                    let response = await res.json();
                    console.log(response);
                    setOrderData(response.orderData);
                })
                .catch((error) => {
                    console.error('Error fetching order history:', error);
                });
        };

        fetchOrderHistory();
    }, []);

    return (
        <>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {orderData && Object.keys(orderData).length !== 0 ? (
                        Array.isArray(orderData.order_data) && orderData.order_data.length !== 0 ? (
                            orderData.order_data
                                .slice(0)
                                .reverse()
                                .map((order) => (
                                    <div key={order[0].order_date}>
                                        <div className='m-auto mt-5'>
                                            {order[0].order_date}
                                            <hr />
                                        </div>
                                        {order.slice(1).map((item) => (
                                            <div className='col-12 col-md-6 col-lg-3' key={item.id}>
                                                <div className='card m-3' style={{ "width": '18rem', "maxHeight": '500px' }}>
                                                    <img src={item.img} className='card-img-top' alt='...' style={{ height: '200px', objectFit: 'fill' }} />
                                                    <div className='card-body'>
                                                        <h5 className='card-title'>{item.name}</h5>
                                                        <div className='m-1'>Date: {order[0].order_date}</div>
                                                        <span className='m-1'>Qty: {item.qty}</span>
                                                        <span className='m-1'>size: {item.size}</span>
                                                        <div className=' m-1 fs-5'>Rs. {item.price}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))
                        ) : (
                            <div>Loading order history...</div>
                            )
                    ) : (
                        <div key='no-order-history' className='fs-5 mt-5 mx-auto'>No order history available.</div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
