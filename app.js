const express = require('express');
const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const Sequelize = require('sequelize');



var productosRouter = require("./routes/products");
var usuariosRouter = require("./routes/users");
var pedidosRouter = require("./routes/orders");

app.use("/products", productosRouter);
app.use("/users", usuariosRouter);
app.use("/orders", pedidosRouter);


app.listen(3000, () => {
    console.log(`Server iniciado en http://127.0.0.1:3000`);
});






