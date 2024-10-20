import React, { useEffect, useState } from 'react'
import Nav from './Nav'; 


function Home() {
    
    const [cartCount, setCartCount] = useState(0); 
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [cartItems, setCartItems] = useState([]); 

    const API_URL = 'https://fakestoreapi.com/products'; 

    
    useEffect(() => {
        async function fetchData() {
            
            const response = await fetch(API_URL);
            const data = await response.json();
            setProducts(data); 
        }
        fetchData(); 
    }, []); 

    
    const handleAddToCart = (product) => {
        
        const isProductInCart = cartItems.some((item) => item.id === product.id);

        if (!isProductInCart) {
            
            setCartCount(cartCount + 1);
            setCartItems([...cartItems, product]);
        } else {
            
            alert("Product is already in the cart!");
        }
    };

    
    const handleModalToggle = () => {
        setShowModal(!showModal); 
    };

    
    const handleModalClose = () => {
        setShowModal(false); 
    };

    
    const handleDeleteItem = (index) => {
    
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart); 
        setCartCount(cartCount - 1); 
    };

    return (
        <div className='relative'>
            
            <Nav cartCount={cartCount} handleModalToggle={handleModalToggle}/>

            
            <div className='container grid grid-rows-1 grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto px-10'>
                
                {products.map(product => (
                    <div key={product.id} className='container p-5'>
                        <div className='border shadow-md rounded p-3 h-full border-blue-500'>
                            
                            <img className='h-52 mx-auto' src={product.image} alt={product.title} />

                            
                            <div className='flex flex-wrap justify-between items-center font-semibold my-5 xl:px-5'>
                                <p>&#8377;&nbsp;{product.price}</p>
                                <button className='border-2 border-blue-500 rounded p-2 cursor-pointer hover:bg-yellow-700 
                                focus:bg-red-600 hover:scale-105' onClick={() => handleAddToCart(product)}>
                                
                                    Add cart
                                </button>
                            </div>

                            
                            <p className='flex text-wrap justify-center text-center'>{product.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    
                    <div className="bg-white p-5 rounded-lg shadow-lg w-full md:w-3/6 mx-2 sm:mx-5 md:mx-0 max-h-[500px] overflow-y-auto">
                        
                        <button className='border bg-red-500 rounded p-.5 px-2 text-white text-2xl flex ml-auto' onClick={handleModalClose}>
                            X
                        </button>
                        <h2 className="text-2xl mb-4 text-center">Your Cart</h2>

                        
                        <div className="flex justify-center shadow flex-col">
                            {cartItems.length > 0 ? (
                                
                                cartItems.map((item, index) => (
                                    <div key={index} className='flex flex-wrap flex-row items-center justify-between gap-5 md:gap-10 shadow p-2 mb-4 w-full'>
                                        
                                        <img src={item.image} alt={item.title} className="h-20" />

                                        
                                        <p className='flex flex-wrap w-1/4'>{item.title}</p>

                                        
                                        <p>&#8377;&nbsp;{item.price}</p>

                                        
                                        <button
                                            className='border py-2 px-4 rounded-md bg-red-400 hover:bg-red-500 focus:bg-red-500 text-white hover:scale-105'
                                            onClick={() => handleDeleteItem(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            ) : (
                            
                                <p className='text-center py-3'>Your cart is empty</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;