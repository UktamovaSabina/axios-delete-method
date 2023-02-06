import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios('https://api.escuelajs.co/api/v1/products')
            .then(response => setProducts(response.data))
            .catch(err => console.error(err))
    }, [])

    function deleteProduct(id) {
        axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then(response => console.log(response.data))

        const filteredProducts = products.filter(product => product.id !== id)
        return setProducts(filteredProducts);
    }

    return (
        <ul className='products-list'>
            {
                products.map(product => {
                    return <li key={product.id} className='product-item'>
                        <div className='product-item__info'>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                        </div>
                        <div className='images-wrapper'>
                            <img className='product-img' src={product.images[0]} alt="product img" />
                            <img className='product-img' src={product.images[1]} alt="product img" />
                            <img className='product-img' src={product.images[2]} alt="product img" />
                        </div>
                        <div className='btn-wrapper'>
                            <button data-id={product.id} className='delete-btn' onClick={() => { deleteProduct(product.id) }}>Delete</button>
                        </div>
                    </li>
                })
            }
        </ul>
    )
}

export default Products