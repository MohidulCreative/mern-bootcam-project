import express from "express";
import {
    createProducts,
    deleteProducts,
    getProducts,
    updateProducts,
} from "../controller/product.controller.js";

const router = express.Router();

//  products routing
router.get("/", getProducts);
router.post("/", createProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

export default router;
