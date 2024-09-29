import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});

    const getLoggedInUser = () => {
        const items = JSON.parse(localStorage.getItem('items'));
        return items?.find(item => item.isLogin === true);
    };

    const saveCartToLocalStorage = (updatedCart) => {
        const user = getLoggedInUser();
        if (user) {
            const items = JSON.parse(localStorage.getItem('items')) || [];
            const updatedItems = items.map(item =>
                item.email === user.email ? { ...item, cart: updatedCart } : item
            );
            localStorage.setItem('items', JSON.stringify(updatedItems));
        }
    };

    const loadCartFromLocalStorage = () => {
        const user = getLoggedInUser();
        if (user && user.cart) {
            setCart(user.cart);
        }
    };

    useEffect(() => {
        loadCartFromLocalStorage();
    }, []);

    const addToCart = (product) => {
        const updatedCart = {
            ...cart,
            [product.id]: {
                ...product,
                quantity: (cart[product.id]?.quantity || 0) + 1
            }
        };
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
    };

    const removeFromCart = (product) => {
        const updatedCart = {
            ...cart,
            [product.id]: {
                ...product,
                quantity: (cart[product.id]?.quantity || 0) - 1
            }
        };
        if (updatedCart[product.id].quantity <= 0) {
            delete updatedCart[product.id];
        }
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
    };

    const deleteFromCart = (product) => {
        const updatedCart = { ...cart };
        delete updatedCart[product.id];
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
