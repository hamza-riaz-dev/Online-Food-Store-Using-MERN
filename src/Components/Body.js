import React, { useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatchCart, useCart } from './ContextReducer';
;

export default function Body(props) {
    let options = props.options;
    let priceOptions = Object.keys(options);

    let dispatch = useDispatchCart();

    let data = useCart();

    const priceRef = useRef();


    const [qty, setQty] = useState(1);     // Define Qty state
    const [size, setSize] = useState("");  // Define Size state
    const [price, setPrice] = useState(0); // Define price state

    const handleAddToCart = async () => {
        const existingProduct = data.find(
          (item) => item.id === props.foodItem._id && item.size === size
        );
         

        if (existingProduct) {
            
              await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty ,size: size });
        
        }
            else {
                await dispatch({type: "ADD",id: props.foodItem._id,name: props.foodItem.name,price: finalPrice,qty: qty,size: size,});
            }
          } 
   
    let finalPrice = qty * parseInt(price);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);


    useEffect(() => {
        setSize((prevSize) => {
          if (prevSize !== priceRef.current.value) {
            return priceRef.current.value;
          }
          return prevSize;
        });
      }, []);

      useEffect(() => {
        setPrice(options[size]);
      }, [size, options]);

    return (
        <>
            <div>
                <Card className='mt-3' style={{ width: '18rem', maxHeight: '500px' }}>
                    <Card.Img
                        src={props.foodItem.img}
                        className='card-img-top'
                        alt='img'
                        style={{ height: '150px', objectFit: 'fill' }}
                    />
                    <Card.Body>
                        <Card.Title>{props.foodItem.CategoryName}</Card.Title>
                        <Card.Title>{props.foodItem.name}</Card.Title>
                        <Card.Text>{props.foodItem.description}</Card.Text>

                        <div className='container'>
                            <select onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(10), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    );
                                })}
                            </select>

                            <select className='rounded m-2' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            <div className='d-inline fs-5'>
                                Rs.{finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <button className={'btn btn-success justify-center ms-2 w-100'} onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
