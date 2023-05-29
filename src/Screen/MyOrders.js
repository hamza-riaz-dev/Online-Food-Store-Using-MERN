import React, { useEffect, useState } from 'react';
import NavScroll from '../Components/Navigation';

export default function MyOrders() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem('userEmail'));
    await fetch('http://localhost:3100/api/myOrderData', {
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
        setOrderData(response);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
      });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <NavScroll />
      </div>

      <div className="container">
        <div className="row">
          {orderData.length !== 0 ? (
            orderData.map((order) => {
              return order.orderData ? (
                order.orderData.order_data.slice(0).reverse().map((item, index) => {
                  return item.map((arrayData, innerIndex) => {
                    return (
                      <div key={innerIndex}>
                        {arrayData.Order_date ? (
                          <div className="m-auto mt-5">
                            {arrayData.Order_date}
                            <hr />
                          </div>
                        ) : (
                          <div className="col-12 col-md-6 col-lg-3" key={index}>
                            <div
                              className="card mt-3"
                              style={{ width: '16rem', maxHeight: '360px' }}
                            >
                              <img
                                src={arrayData.img}
                                className="card-img-top"
                                alt="..."
                                style={{ height: '120px', objectFit: 'fill' }}
                              />
                              <div className="card-body">
                                <h5 className="card-title">{arrayData.name}</h5>
                                <div
                                  className="container w-100 p-0"
                                  style={{ height: '38px' }}
                                >
                                  <span className="m-1">{arrayData.qty}</span>
                                  <span className="m-1">{arrayData.size}</span>
                                  <span className="m-1">{arrayData.Order_date}</span>
                                  <div className="d-inline ms-2 h-100 w-20 fs-5">
                                    Rs.{arrayData.price}/-
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  });
                })
              ) : null;
            })
          ) : null}
        </div>
      </div>
    </>
  );
}
