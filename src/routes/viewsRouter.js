import { Router } from "express";
import ProductManager from "../classes/ProductManager.js"

const viewsRouter = Router();
const PM = new ProductManager();
const products = PM.getProducts();

viewsRouter.get("/", (req, res) => {

    res.render("home", { title: 'Jubilus', products});
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    
    res.render("realtimeproducts");
});

export default viewsRouter