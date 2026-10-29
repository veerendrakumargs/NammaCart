import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddProduct.css";

const AddProduct = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        category: "",
        image: "",
        description: "",
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:4000/products", {
                ...product,
                price: Number(product.price),
                rating: { rate: 0, count: 0 },
            });

            toast.success("Product added successfully!");
            navigate("/adminportal/Products");
        } catch (error) {
            toast.error("Failed to add product");
            console.error(error);
        }
    };

    return (
        <div className="add-product">
            <h1>Add Product</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Product Name"
                    value={product.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />

                <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewellery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="footwear">Footwear</option>
                    <option value="home & kitchen">Home & Kitchen</option>
                    <option value="beauty">Beauty</option>
                </select>

                <input
                    type="url"
                    name="image"
                    placeholder="Product Image URL"
                    value={product.image}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="rating"
                    placeholder="Enter Rating"
                    value={product.rating}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="count"
                    placeholder="Enter rating Count"
                    value={product.count}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;