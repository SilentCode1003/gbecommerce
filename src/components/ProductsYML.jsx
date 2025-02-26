import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { VITE_API_KEY } from '../config';

const ProductsYML = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const apiUrl = "http://localhost:5000/api/items/active"; // Adjust this URL
                const res = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ APK: VITE_API_KEY }),
                });

                if (!res.ok) {
                    const errorMessage = await res.text();
                    console.error("Error response:", {
                        status: res.status,
                        statusText: res.statusText,
                        body: errorMessage,
                    });
                    throw new Error(`HTTP status ${res.status}: ${errorMessage}`);
                }

                const data = await res.json();
                setItems(data.data || []);
            } catch (error) {
                setError("Error fetching items: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return <p className="text-center">Loading items...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <section className="bg-gray-200 ml-[20px] mr-[20px] md:px-8 lg:px-18 py-5 mt-2 border border-gray-300">
            <h1 className="text-3xl font-bold text-black mb-10 mt-20 text-center">
                Items you might like
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:p-2 md:grid-cols-4 md:px-15 lg:grid-cols-6 lg:px-20 gap-4">
                {items.slice(0, 6).map((item, index) => (
                    <NavLink
                        to={`/products/${item.id}`}
                        state={{ product: item }}
                        key={index}
                        className="card"
                    >
                        <img
                            src={item.image || '/default-image.jpg'} // Add a fallback image
                            alt={item.name || 'Product Image'}
                            className="w-full h-auto rounded mb-1"
                        />
                        <h3 className="sm:text-[10px] text-xs text-gray-600">{item.category || 'Unknown Category'}</h3>
                        <h4 className="sm:text-[10px] text-md font-semibold">{item.name || 'Unnamed Product'}</h4>
                    </NavLink>
                ))}
            </div>
        </section>
    );
};

export default ProductsYML;
