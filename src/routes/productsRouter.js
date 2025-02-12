import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const productsRouter = Router();
const PM = new ProductManager();

productsRouter.get("/", (req, res) => {
    let products = PM.getProducts();
    
    res.send(products)
})

productsRouter.get("/:pid", (req, res) => {
    let pid = req.params.pid;
    let product = PM.getProductById(pid);
    console.log(pid);
    
    
    res.send(product)
})

productsRouter.post("/", (req, res) => {
    const {title, description, code, price, status, category, thumbnails} = req.body;

    if (!title) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'title' está vacío!"});
        return false;
    }

    if (!description) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'description' está vacío!"});
        return false;
    }

    if (!code) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'code' está vacío!"});
        return false;
    }

    if (!price) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'price' está vacío!"});
        return false;
    }

    if (!status) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'status' está vacío!"});
        return false;
    }

    if (!category) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'category' está vacío!"});
        return false;
    }

    let product = {title, description, code, price, status, category, thumbnails};
    PM.addProduct(product);
    res.send({"estado":"OK", "mensaje":"El producto se agregó correctamente!"})
})

productsRouter.put("/:pid", (req, res) => {
    const pid = req.params.pid;
    const {title, description, code, price, status, category, thumbnails} = req.body;

    if (!title) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'title' está vacío!"});
        return false;
    }

    if (!description) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'description' está vacío!"});
        return false;
    }

    if (!code) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'code' está vacío!"});
        return false;
    }

    if (!price) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'price' está vacío!"});
        return false;
    }

    if (!status) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'status' está vacío!"});
        return false;
    }

    if (!category) {
        res.status(400).send({"estado":"ERROR", "mensaje":"El campo 'category' está vacío!"});
        return false;
    }

    let product = {title, description, code, price, status, category, thumbnails};
    PM.editProduct(pid, product);
    res.send({"estado":"OK", "mensaje":"El producto se actualizó correctamente!"})
})

productsRouter.delete("/:pid", (req, res) => {
    const pid = Number(req.params.pid); // Convertimos pid a número

    const product = PM.getProductById(pid); // Verificamos si el producto existe

    if (product.error) {
        return res.status(404).send({ estado: "ERROR", mensaje: "Producto no encontrado" });
    }

    PM.deleteProduct(pid);
    res.send({ estado: "OK", mensaje: "El producto se eliminó correctamente!" });
});

export default productsRouter