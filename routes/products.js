const router = require("express").Router();

module.exports = router;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:Cielitolindo1.@localhost:3306/delilahdb');

const validations = require("../middlewares/middlewares");


router.get('/', validations.validateTokenRole(['admin', 'user']), (req, res) => {
    try {
        sequelize.query('SELECT * FROM products', {
            type: sequelize.QueryTypes.SELECT
        })
            .then(result => res.status(200).json(result))
            .catch(() => {
                if (!result) { res.status(400).json("Products list empty") }
            })
    } catch (err) {
        return res.status(404).json({ error: `Something went wrong: ${err}` });
    }
});


router.post('/', validations.validateTokenRole(['admin']), async (req, res) => {

    const query = `INSERT INTO products (name,url_image,price) VALUES ('${req.body.name}','${req.body.url_image}',${req.body.price})`
    try {
        if (req.body.name && req.body.url_image && req.body.price) {

            const results = await sequelize.query(query);
            //console.log(results);
            res.status(200).json({ status: `${req.body.name} successfully added ` })
        }
        else {
            res.status(400).json({ status: `Missing information, please verify` });

        }
    }
    catch (error) {
        return res.status(404).json({ error: `Something went wrong: ${error}` });
    }
});


router.put('/:id', validations.validateTokenRole(['admin']), async (req, res) => {

    try {
        const result = await sequelize.query(`SELECT * FROM products WHERE id=${req.params.id}`, {
            type: sequelize.QueryTypes.SELECT
        })
        if (result.length > 0) {
            const query = `UPDATE products set name='${req.body.name}',url_image='${req.body.url_image}',price='${req.body.price}' where id=${req.params.id}`;
            //console.log(query);
            const results = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
            res.status(200).json({ status: `${req.body.name} successfully modified ` });

        } else {
            return res.status(400).json({ error: `Invalid id:${req.params.id}` })
        }
    }
    catch (e) {
        console.error(e);
        return res.status(404).json({ error: `Invalid update: ${error}` });
    }
});


router.delete("/:id", validations.validateTokenRole(['admin']), async (req, res) => {

    try {
        const result = await sequelize.query(`SELECT * FROM products WHERE id=${req.params.id}`, {
            type: sequelize.QueryTypes.SELECT
        })
        if (result.length > 0) {
            const query = `DELETE from products where id=${req.params.id}`;
            console.log(query);
            const results = await sequelize.query(query, { type: sequelize.QueryTypes.DELETE });
            res.status(200).json("product successfully deleted");
        } else {
            return res.status(400).json({ error: `Invalid id:${req.params.id}` })
        }

    }
    catch (error) {

        return res.status(404).json({ error: `Invalid update: ${error}` });

    }
});





