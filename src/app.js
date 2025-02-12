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

const PM = new ProductManager();
const products = PM.getProducts();

ioServer.on("connection", socket => {


    socket.emit("realtimeproducts", products);
})