const router = require("express").Router();

module.exports = router;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:Cielitolindo1.@localhost:3306/delilahdb');

const validations = require("../middlewares/middlewares");




router.get("/", validations.validateTokenRole(['admin']), (req, res) => {
    try {
        sequelize.query(`SELECT o.id, total_amount,payment_id,date_order,status_id,user_id,os.name AS status_name,user,full_name,email,phone,delivery_address,pm.name AS payment_name
        FROM orders AS o
        JOIN order_status AS os
            ON o.status_id=os.id
        JOIN users AS u
            ON o.user_id=u.id
        JOIN payment_methods AS pm
            ON o.payment_id=pm.id`, {
            type: sequelize.QueryTypes.SELECT
        })
            .then((result) => {
                let upperIndex;
                //console.log(result);
                result.forEach((element, index) => {
                    //console.log(index);
                    upperIndex = index;
                    sequelize.query(`SELECT order_id,product_id,quantity FROM product_order WHERE order_id=${result[index].id}`, {
                        type: sequelize.QueryTypes.SELECT
                    }).then((result2) => {
                        //console.log(result2);
                        console.log(result[index]);
                        result[index].products = result2;
                    });
                });
                setTimeout(() => { res.status(200).json(result) }, 1000);
            })
            .catch(() => {
                if (!result) { res.status(400).json({ error: `Order list empty` }) }
            })
    } catch (err) {
        return res.status(404).json({ error: `Something went wrong: ${err}` });
    }
});

router.get("/user/:id", validations.checkIfUser, (req, res) => {
    try {
        const userId = req.params.id;
        sequelize.query(`SELECT o.id, total_amount,payment_id,date_order,status_id,user_id,os.name AS status_name,user,full_name,email,phone,delivery_address,pm.name AS payment_name
                 FROM orders AS o
                 JOIN order_status AS os
                     ON o.status_id=os.id
                JOIN users AS u
                    ON o.user_id=u.id
                JOIN payment_methods AS pm
                  ON o.payment_id=pm.id
               WHERE user_id=${userId}`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        ).then((result) => {
            let upperIndex;
            //console.log(result);
            result.forEach((element, index) => {
                //console.log(index);
                upperIndex = index;
                console.log(result[index].id)

                sequelize.query(`SELECT order_id,product_id,quantity FROM product_order WHERE order_id=${result[index].id}`, {
                    type: sequelize.QueryTypes.SELECT
                }).then((result2) => {
                    //console.log(result2);
                    console.log(result[index]);
                    result[index].products = result2;
                    console.log(result[index].product)
                });
            });
            setTimeout(() => { res.status(200).json(result) }, 1000);
        }).catch(() => {
            if (!result) { res.status(400).json({ error: `Order list empty` }) }
        });
    } catch (err) {
        return res.status(404).json({ error: `Something went wrong: ${err}` });
    }


})


// router.get("/user/:id", validations.checkIfUser, async (res, req) => {
//     console.log("llegué aquí2")
//     try {
//         console.log("por aquí3")
//         const result = await sequelize.query(`SELECT * FROM orders WHERE id=${req.params.id}`, {
//             type: sequelize.QueryTypes.SELECT
//         })
//         if (result.length > 0) {
//             console.log("por aquí4")
//             await sequelize.query(`SELECT o.id, total_amount,payment_id,date_order,status_id,user_id,os.name AS status_name,user,full_name,email,phone,delivery_address,password,pm.name AS payment_name
//              FROM orders AS o
//              JOIN order_status AS os
//                  ON o.status_id=os.id
//              JOIN users AS u
//                  ON o.user_id=u.id
//              JOIN payment_methods AS pm
//                  ON o.payment_id=pm.id
//              WHERE user_id=${req.params.id}`).then((result) => {

//                 let upperIndex;
//                 console.log(result);
//                 result.forEach((element, index) => {
//                     console.log(index);
//                     upperIndex = index;
//                     sequelize.query(`SELECT order_id,product_id,quantity FROM product_order WHERE order_id=${result[index].id}`, {
//                         type: sequelize.QueryTypes.SELECT
//                     }).then((result2) => {
//                         console.log(result2);
//                         console.log(result[index]);
//                         result[index].products = result2;
//                     });
//                 });
//                 return res.status(200).json(result)
//             })


//         } else {
//             return res.status(404).json({ error: `Access Denied: ${err}` });
//         }
//     } catch (err) {
//         return `Something went wrong: ${err}`

//     }
// });




router.put("/:id/status", validations.validateTokenRole(['admin']), (req, res) => {
    try {
        sequelize.query(`SELECT * FROM orders WHERE id=${req.params.id}`, {
            type: sequelize.QueryTypes.SELECT
        }).then((result) => {
            if (result.length > 0) {
                if (req.body.status_id) {
                    sequelize.query(`SELECT * FROM order_status WHERE id=${req.body.status_id}`, {
                        type: sequelize.QueryTypes.SELECT
                    }).then((resultStatus) => {
                        console.log(resultStatus);
                        if (resultStatus.length > 0) {
                            sequelize.query(`UPDATE orders set status_id='${req.body.status_id}'where id=${req.params.id}`)
                            res.status(200).json({ status: "order successfully modified" });
                        } else { return res.status(400).json({ error: `Status Id ${req.body.status_id} doesn't exists` }) }
                    });

                } else {
                    return res.status(400).json({ error: `Status Id cannot be empty` })
                }

            } else {
                return res.status(400).json({ error: `Invalid id:${req.params.id}` })
            }
        });
    }
    catch (err) {
        return res.status(404).json({ error: `Something went wrong: ${err}` });
    }
});

// router.post("/", validations.validateTokenRole(['admin', 'user']), (req, res) => {
//     try {
//         if (req.body) {
//             const { product_id, paidType_order, address_order, id_user } = req.body

//         } else {

//         }

//     } catch (err) {

//         return res.status(404).json({ error: `Something went wrong: ${err}` });

//     }
// })