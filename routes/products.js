const router = require("express").Router();

module.exports = router;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:Cielitolindo1.@localhost:3306/delilahdb');

const validations = require("../middlewares/middlewares");

router.get('/', validations.validateToken, (req, res) => {
    try {
        sequelize.query('SELECT * FROM products', {
            type: sequelize.QueryTypes.SELECT
        })
            .then(result => res.status(200).json(result))
            .catch(() => {
                if (!result) { res.status(400).json("Products list empty") }
            })
    } catch (err) {
        return res.status(404).json(`Something went wrong: ${err}`);
    }
});

router.post('/', validations.validateToken, async (req, res) => {

    const query = `INSERT INTO products (name,url_image,price) VALUES ('${req.body.name}','${req.body.url_image}',${req.body.price})`
    try {
        const results = await sequelize.query(query);
        console.log(results);
        res.status(200).json("product successfully added")

    }

    catch (error) {
        return res.status(404).json({ error: 'something went wrong' });
    }
});



router.put("/:id", validations.validateToken, async (req, res) => {
    const query = `UPDATE products set name='${req.body.name}',url_image='${req.body.url_image}',price='${req.body.price}' where id=${req.params.id}`;
    console.log(query);
    try {
        const results = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

        res.status(200).json("product successfully modified");

    }
    catch (e) {
        console.error(e);
        return res.status(404).json(`invalid update: ${e}`);

    }
});

router.delete("/:id", validations.validateToken, async (req, res) => {

    const query = `DELETE from products where id=${req.params.id}`;
    console.log(query);
    try {
        const results = await sequelize.query(query, { type: sequelize.QueryTypes.DELETE });

        res.status(200).json("product successfully deleted");

    }
    catch (e) {
        console.error(e);
        return res.status(404).json(`invalid deletion: ${e}`);

    }
});





