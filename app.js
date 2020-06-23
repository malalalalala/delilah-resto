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

app.listen(3000, '0.0.0.0', () => {
    console.log(`Server iniciado en http://127.0.0.1:3000`);
});


// const sequelize = new Sequelize('mysql://root:Cielitolindo1.@localhost:3306/delilahdb');
// sequelize.authenticate().then(async () => {
//     // const query = 'SELECT * FROM users';
//     const query = `INSERT INTO users (user,fullName,email,phone,deliveryAdress,password) 
//     VALUES ('Lauralo','Laura Ramos','lauramos@h.com','3256','jajaja','jajajalo')`;
//     const results = await sequelize.query(query, { raw: true });

//     console.log(results);
// });



