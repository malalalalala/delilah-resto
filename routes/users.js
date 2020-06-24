const router = require("express").Router();


module.exports = router;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:Cielitolindo1.@localhost:3306/delilahdb');



router.post("/", async (req, res) => {
    console.log(req.body);
    const query = `INSERT INTO users (user,full_name,email,phone,delivery_address,password) 
        VALUES ('${req.body.user}','${req.body.fullName}','${req.body.email}','${req.body.phone}','${req.body.deliveryAddress}','${req.body.password}')`;
    try {
        const results = await sequelize.query(query, { raw: true });
        console.log(results);
        res.json({ Mensaje: 'user successfully added' });
    }
    catch (e) {
        console.error(e);
        res.status(404).json({ error: 'user or email already exists' });
    }
});

router.get("/", async (req, res) => {
    try {
        const query = 'SELECT * FROM users';
        const results = await sequelize.query(query, { raw: true });
        //console.log(results);
        res.json(results[0]);
    } catch (e) {
        return res.status(404).json(`something went wrong: ${e}`);
    }
});

router.put("/", async (req, res) => {
    const query = `UPDATE users set full_name='${req.body.fullName}',phone='${req.body.phone}',delivery_address='${req.body.deliveryAddress}',password='${req.body.password}' 
        where email = '${req.body.email}' AND user = '${req.body.user}' `;
    console.log(query);
    try {
        const results = await sequelize.query(query, { raw: true });
        res.json(results);
    }
    catch (e) {
        console.error(e);
        return res.status(404).json(`invalid update: ${e}`);

    }
});


router.delete("/", async (req, res) => {
    const query = `DELETE  users
        where email = '${req.body.email}' AND user = '${req.body.user}' `;
    console.log(query);
    try {
        const results = await sequelize.query(query, { raw: true });
        res.json({ status: 'deleted' });

    }
    catch (e) {
        console.error(e);
        res.status(404).json({ error: 'something went wrong' });
    }
});

