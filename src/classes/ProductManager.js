import fs from "fs"

class ProductManager {
    constructor() {
        this.products = [],
        this.file = "productos.json";
    }

    createFile() {
        if (!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file, JSON.stringify([]));
        }
    }

    getId() {
        return this.products.length ? Math.max(...this.products.map(prod => prod.id)) + 1 : 1;
    }

    getProducts() {
        this.products = JSON.parse(fs.readFileSync(this.file, "utf-8"));
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(prod => prod.id === Number(id));

        return product ? product : {"error" : "No se encontro el Producto!"};
    }

    addProduct(product) {
        let newProduct = {id:this.getId(), ...product};
        this.products.push(newProduct);
        this.saveProducts();
    }

    editProduct(id, product) {
        this.getProducts();
        
        let actualProduct = this.products.find(item => item.id == id);
        actualProduct.title = product.title;
        actualProduct.description = product.description;
        actualProduct.code = product.code;
        actualProduct.price = product.price;
        actualProduct.quantity = product.quantity;
        actualProduct.status = product.status;
        actualProduct.category = product.category;
        actualProduct.thumbnails = product.thumbnails;
        this.saveProducts();
    }

    deleteProduct(id) {
        const quantityProd = this.products.length + 1;
        if (this.products.length === quantityProd) {
            console.error("Error: Producto no encontrado.");
            console.log(this.products.length);
            
            return;
        }
        this.products = this.products.filter(item => item.id != id);
        this.saveProducts();
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.file, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error("Error al guardar productos:", error);
        }
    }
}

export default ProductManager