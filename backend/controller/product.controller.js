import Product from "../model/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.log("Error while fetching products: ", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const createProducts = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all fileds" });
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProducts = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ success: false, message: "Invalid product id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {
            new: true,
        });
        res.status(201).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const deleteProducts = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ success: false, message: "Invalid product id" });
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "product deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" });
    }
};
