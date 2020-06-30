const router = require("express").Router();

const SAFE_KEYWORD = 'MyS3cr3t';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:Cielitolindo1.@localhost:3306/delilahdb');

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

// Middlewares
const validations = require('../middlewares/middlewares');

router.post('/register', async (req, res) => {
    try {
        console.log("I'm in")
        if ((req.body.email || req.body.user) && req.body.password) {
            const result = await sequelize.query(`SELECT * FROM users WHERE user = '${req.body.user}' or email='${req.body.email}'`, {
                type: sequelize.QueryTypes.SELECT
            })
            console.log("result");
            if (result.length > 0) {
                res.status(400).json("user already exists");
            } else {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
                sequelize.query(`INSERT INTO users (user,full_name,email,phone,delivery_address,password)  VALUES ('${req.body.user}','${req.body.full_name}','${req.body.email}','${req.body.phone}','${req.body.delivery_address}','${req.body.password}')`, { type: sequelize.QueryTypes.INSERT })
                    .then(() => res.status(200).json("user successfully added"))
            }
        } else {
            return res.status(400).json("Missing data");
        }
    } catch (err) {
        return res.status(404).json(`Something went wrong: ${err}`);
    }
});

router.post('/login', validations.validateUserPass, async (req, res) => {
    try {
        if ((req.body.user || req.body.email) && req.body.password) {
            const { email, user } = req.body;
            let resultUser = await sequelize.query(`SELECT id,password FROM users WHERE email = '${email}' OR user = '${user}'`,
                { type: sequelize.QueryTypes.SELECT })
            if (resultUser[0]) {
                const { id, password } = resultUser[0];
                let hpass = await bcrypt.compare(req.body.password, password)
                    .then(result => result)
                    .catch(() => res.status(400).json("authentication error"));
                if (hpass) {
                    const token = jwt.sign({ id }, SAFE_KEYWORD);// 
                    res.json({ token })
                } else {
                    res.status(400).json({ error: "La contraseña es incorrecta" });
                }
            } else
                res.status(400).json({ error: "El usuario no existe" });
        } else {
            return res.status(400).json("Datos érroneos para hacer el login");
        }
    } catch (err) {
        return res.status(404).json(`Ocurrió un error: ${err}`);
    }
});

// router.get('/', userAuthentication, (req, res) => {
//     try {
//         if (req.usuario.is_admin) {
//             sequelize.query('SELECT * FROM users', {
//                 type: sequelize.QueryTypes.SELECT
//             })
//                 .then(result => res.status(200).json(result))
//                 .catch(() => res.status(400).json("Aún no existen usuarios registrados"))
//         } else {
//             res.status(403).json("Usuario no autorizado");
//         }
//     } catch (err) {
//         return res.status(404).json(`Ocurrió un error: ${err}`);
//     }
// });

// router.post("/", async (req, res) => {
//     console.log(req.body);
//     const query = `INSERT INTO users (user,full_name,email,phone,delivery_address,password) 
//         VALUES ('${req.body.user}','${req.body.fullName}','${req.body.email}','${req.body.phone}','${req.body.deliveryAddress}','${req.body.password}')`;
//     try {
//         const results = await sequelize.query(query);
//         console.log(results);
//         res.json({ Mensaje: 'user successfully added' });
//     }
//     catch (e) {
//         console.error(e);
//         res.status(404).json({ error: 'user or email already exists' });
//     }
// });


// router.post("/create", async (req, res) => {
//     try {
//         console.log(req.body);
//         const userDB = await createUser(req, res).then(((value) => {
//             const roleUser = registerUserRole(value, 2); //2 regular user role
//             res.json({ user: value, rol: roleUser });
//         })); //

//     }
//     catch (e) {
//         console.error(e);
//         res.status(404).json({ error: 'user or email already exists' });
//     }
// });



// async function createUser(req, res) {
//     console.log(req.body);
//     const query = `INSERT INTO users (user,full_name,email,phone,delivery_address,password) 
//         VALUES ('${req.body.user}','${req.body.fullName}','${req.body.email}','${req.body.phone}','${req.body.deliveryAddress}','${req.body.password}')`;
//     try {
//         const result = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
//         console.log(result);
//         //res.json({ Mensaje: 'user successfully added' });
//         return result;
//     }
//     catch (e) {
//         // console.error(e);
//         //res.status(404).json({ error: 'user or email already exists' });
//         throw e;
//     }
// };
// async function registerUserRole(idUser, idRol) {

//     const query = `INSERT INTO USER_ROLES (user_id,role_id) 
//         VALUES ('${idUser[0]}','${idRol}')`;
//     try {
//         const result = await sequelize.query(query).catch(console.log("paila"));
//         console.log(result);
//         //res.json({ Mensaje: 'user successfully added' });
//         return result;
//     }
//     catch (e) {
//         console.error(e);
//         //res.status(404).json({ error: 'user or email already exists' });
//         throw e;
//     }
// };

// router.get("/", async (req, res) => {
//     try {
//         const query = 'SELECT id,user,full_name fullName,email,phone,delivery_address deliveryAddress,password FROM users';
//         const results = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
//         //console.log(results);
//         res.json(results);
//     } catch (e) {
//         return res.status(404).json(`something went wrong: ${e}`);
//     }
// });

// router.put("/", async (req, res) => {
//     const query = `UPDATE users set full_name='${req.body.fullName}',phone='${req.body.phone}',delivery_address='${req.body.deliveryAddress}',password='${req.body.password}' 
//         where email = '${req.body.email}' AND user = '${req.body.user}' `;
//     console.log(query);
//     try {
//         const results = await sequelize.query(query, { type: sequelize.QueryTypes.BULKUPDATE });
//         res.json(results);
//     }
//     catch (e) {
//         console.error(e);
//         return res.status(404).json(`invalid update: ${e}`);

//     }
// });


// router.delete("/", async (req, res) => {
//     const query = `DELETE  users
//         where email = '${req.body.email}' AND user = '${req.body.user}' `;
//     console.log(query);
//     try {
//         const results = await sequelize.query(query, { type: sequelize.QueryTypes.DELETE });
//         res.json({ status: 'deleted' });

//     }
//     catch (e) {
//         console.error(e);
//         res.status(404).json({ error: 'something went wrong' });
//     }
// });

module.exports = router;

