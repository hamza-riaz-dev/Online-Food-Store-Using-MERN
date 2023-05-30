import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const unit = [props.prodItem.unitS, props.prodItem.unitL];
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  const addToCart = async () => {
    const existingProduct = data.find(
      (item) => item.id === props.prodItem._id && item.size === size
    );

    if (existingProduct) {
      await dispatch({
        type: 'UPDATE',
        id: props.prodItem._id,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    } else {
      await dispatch({
        type: 'ADD',
        id: props.prodItem._id,
        name: props.prodItem.name,
        img: props.prodItem.img,
        qty: qty,
        size: size,
        price: finalPrice,
      });
    }
  };

  const priceCalculation = () => {
    if (size === props.prodItem.unitS) {
      return qty * parseInt(props.prodItem.priceS);
    } else if (size === props.prodItem.unitL) {
      return qty * parseInt(props.prodItem.priceL);
    } else {
      return 0;
    }
  };

  let finalPrice = priceCalculation();

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <>
      <div className="card m-3" style={{ width: '19rem', maxHeight: '500px' }}>
        <img
          src={props.prodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: '200px', objectFit: 'fill' }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.prodItem.name}</h5>
          <p className="card-text">{props.prodItem.description}</p>
          <div className="container w-100">
            <div className="d-inline fs-6">Quantity</div>
            <select className="m-2 p-1 h-100 bg-dark text-white rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(10), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="p-1 h-100 bg-dark text-white rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {unit.map((data) => {
                return <option key={data} value={data}>{data}</option>;
              })}
            </select>
            <hr />
            <div className="fs-6">
              Total Price: <span className="float-end">Rs. {finalPrice}</span>
            </div>
            <hr />
            <button className="btn btn-dark justify-center ms-2" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
