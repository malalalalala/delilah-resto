const router = require("express").Router();

module.exports = router;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:Cielitolindo1.@localhost:3306/delilahdb');

router.get("/", (req, res) => {
    res.json({ Mensaje: "hola productos" });
});

router.post("/", (req, res) => {
    res.json({ Mensaje: "hola productos" });
    console.log(req.body);
    sequelize.authenticate().then(async () => {
        // const query = 'SELECT * FROM users';
        const query = `INSERT INTO users (user,full_name,email,phone,delivery_address,password) 
        VALUES ('${req.body.user}','${req.body.fullName}','${req.body.email}','${req.body.phone}','${req.body.deliveryAddress}','${req.body.password}')`;
        const results = await sequelize.query(query, { raw: true });
        console.log(results);
    });
});

router.get("/", (req, res) => {
    res.json({ Mensaje: "hola productos" });
    sequelize.authenticate().then(async () => {
        const query = 'SELECT * FROM users';
        const results = await sequelize.query(query, { raw: true });
        const resultsjson = res.json(results);
        console.log(resultsjson);
    });
});



