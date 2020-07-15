const router = require("express").Router();

const SAFE_KEYWORD = 'MyS3cr3t';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:Cielitolindo1.@localhost:3306/delilahdb');

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

const validations = require('../middlewares/middlewares');


async function registerUserRole(idUser, idRol) {

    const query = `INSERT INTO USER_ROLES (user_id,role_id) 
         VALUES ('${idUser[0]}','${idRol}')`;
    try {
        const result = await sequelize.query(query);
        console.log(result);

        return "user successfully added ";
    }
    catch (e) {
        return `Something went wrong: ${e}`;
    }
};

router.post('/register', async (req, res) => {
    try {
        //console.log("I'm in")
        if ((req.body.email && req.body.user) && req.body.password && req.body.full_name && req.body.phone && req.body.delivery_address && req.body.password) {
            const result = await sequelize.query(`SELECT * FROM users WHERE user = '${req.body.user}' or email='${req.body.email}'`, {
                type: sequelize.QueryTypes.SELECT
            })
            console.log("result");
            if (result.length > 0) {
                res.status(400).json({ error: `user or email already exists ` });
            } else {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
                sequelize.query(`INSERT INTO users (user,full_name,email,phone,delivery_address,password)  VALUES ('${req.body.user}','${req.body.full_name}','${req.body.email}','${req.body.phone}','${req.body.delivery_address}','${req.body.password}')`, { type: sequelize.QueryTypes.INSERT })
                    .then((value) => {
                        //console.log(value);
                        const roleUser = registerUserRole(value, 2).then(((value) => {
                            res.status(200).json({ user: value, rol: roleUser });

                            //res.status(200).json("user successfully added");
                        }));
                    });
            }
        } else {
            return res.status(400).json({ error: `missing data` });
        }
    } catch (err) {
        return res.status(404).json({ error: `user or email already exists ${err}` });
    }
});

router.post('/login', async (req, res) => {
    try {
        if ((req.body.user || req.body.email) && req.body.password) {
            const { email, user } = req.body;
            let resultUser = await sequelize.query(`select r.name role, user.user_id , user.password pass from roles r , (SELECT  ur.role_id, u.id user_id, u.password password   
                FROM users u INNER JOIN user_roles ur
                on u.id=ur.user_id and ( u.email = '${email}' OR u.user = '${user}') ) user
                              where id = user.role_id`,
                { type: sequelize.QueryTypes.SELECT });
            if (resultUser[0]) {
                const { user_id, pass, role } = resultUser[0];
                let hpass = await bcrypt.compare(req.body.password, pass)
                    .then(result => result)
                    .catch(() => res.status(400).json("authentication error"));
                if (hpass) {
                    const token = jwt.sign({ user: user_id, role: role }, SAFE_KEYWORD);
                    res.json({ token });
                } else {
                    res.status(400).json({ error: "wrong credentials" });
                }
            } else
                res.status(401).json({ error: "user not registered" });
        } else {
            return res.status(400).json({ error: "wrong credentials" });
        }
    } catch (err) {
        return res.status(500).json({ error: `something went wrong: ${err}` });
    }
});

router.get('/', validations.validateTokenRole(['admin']), (req, res) => {
    try {
        sequelize.query('SELECT * FROM users', {
            type: sequelize.QueryTypes.SELECT
        })
            .then(result => res.status(200).json(result))
            .catch(() => {
                if (!result) { res.status(400).json("No users") }
            })
    } catch (err) {
        return res.status(404).json({ error: `Something went wrong: ${err}` });
    }
});


module.exports = router;



