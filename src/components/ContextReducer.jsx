import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, { id: action.id, name: action.name, img: action.img, qty: action.qty, size: action.size, price: action.price }];
        case 'REMOVE':
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        case 'UPDATE':
            return state.map((prod) => {
                if (prod.id === action.id && prod.size === action.size) {
                    return { ...prod, qty: parseInt(action.qty) + prod.qty, price: action.price + prod.price };
                }
                return prod;
            });
        case 'DROP':
            let emptyArray = [];
            return emptyArray;
        default:
            console.log('Error in Reducer');
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);