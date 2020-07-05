const express = require('express');
const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const Sequelize = require('sequelize');



var productsRouter = require("./routes/products");
var usersRouter = require("./routes/users");
var ordersRouter = require("./routes/orders");

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);


app.listen(3000, () => {
    console.log(`Server started in http://127.0.0.1:3000`);
});






