import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions } from 'antd';
import Product from '../products.json';

function ProductTab1() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = Product.find(product => product.id === id);
        setProduct(foundProduct);
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const items = [
        { key: '1', label: 'Name', children: product.title },
        { key: '2', label: 'type', children: product.type },
        { key: '3', label: 'capacity', children: product.capacity },
        { key: '4', label: 'description', children: product.description },
    
    ];
    return (
        <div>
            <Descriptions title="Product Details" bordered items={items} />
        </div>
    );
}

export default ProductTab1;
