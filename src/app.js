import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewsRouter from "./routes/viewsRouter.js";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import ProductManager from "./classes/ProductManager.js";

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
    console.log("Servidor activo: http://localhost:" + port);
})

const ioServer = new Server(httpServer);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


ioServer.on("connection", socket => {
    
    const PM = new ProductManager();
    
    const products = PM.getProducts();
    socket.emit("realtimeproducts", products);


    socket.on("nuevoProducto", data => {

        const product = {
            title: data.title, 
            description: data.description, 
            code: data.code, 
            price: data.price, 
            status: true,
            category: data.category, 
            thumbnails: [data.image], 
            quantity: data.quantity
        }
        
        PM.addProduct(product);

        console.log("Se agrego un producto");

        const products = PM.getProducts();
        socket.emit("realtimeproducts", products);
    })

    socket.on("eliminarProducto", data => {
        
        PM.deleteProduct(data);

        console.log("Se elimino un producto");
        
        const products = PM.getProducts();
        socket.emit("realtimeproducts", products);
    })

})