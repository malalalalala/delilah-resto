const router = require("express").Router();


const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:Cielitolindo1.@localhost:3306/delilahdb');



router.post("/", async (req, res) => {
    console.log(req.body);
    const query = `INSERT INTO users (user,full_name,email,phone,delivery_address,password) 
        VALUES ('${req.body.user}','${req.body.fullName}','${req.body.email}','${req.body.phone}','${req.body.deliveryAddress}','${req.body.password}')`;
    try {
        const results = await sequelize.query(query);
        console.log(results);
        res.json({ Mensaje: 'user successfully added' });
    }
    catch (e) {
        console.error(e);
        res.status(404).json({ error: 'user or email already exists' });
    }
});


router.post("/create", async (req, res) => {
    try {
        console.log(req.body);
        const userDB = await createUser(req, res).then(((value) => {
            const roleUser = registerUserRole(value, 2); //2 regular user role
            res.json({ user: value, rol: roleUser });
        })); //

    }
    catch (e) {
        console.error(e);
        res.status(404).json({ error: 'user or email already exists' });
    }
});



async function createUser(req, res) {
    console.log(req.body);
    const query = `INSERT INTO users (user,full_name,email,phone,delivery_address,password) 
        VALUES ('${req.body.user}','${req.body.fullName}','${req.body.email}','${req.body.phone}','${req.body.deliveryAddress}','${req.body.password}')`;
    try {
        const result = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
        console.log(result);
        //res.json({ Mensaje: 'user successfully added' });
        return result;
    }
    catch (e) {
        // console.error(e);
        //res.status(404).json({ error: 'user or email already exists' });
        throw e;
    }
};
async function registerUserRole(idUser, idRol) {

    const query = `INSERT INTO USER_ROLES (user_id,role_id) 
        VALUES ('${idUser[0]}','${idRol}')`;
    try {
        const result = await sequelize.query(query).catch(console.log("paila"));
        console.log(result);
        //res.json({ Mensaje: 'user successfully added' });
        return result;
    }
    catch (e) {
        console.error(e);
        //res.status(404).json({ error: 'user or email already exists' });
        throw e;
    }
};

router.get("/", async (req, res) => {
    try {
        const query = 'SELECT id,user,full_name fullName,email,phone,delivery_address deliveryAddress,password FROM users';
        const results = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        //console.log(results);
        res.json(results);
    } catch (e) {
        return res.status(404).json(`something went wrong: ${e}`);
    }
});

router.put("/", async (req, res) => {
    const query = `UPDATE users set full_name='${req.body.fullName}',phone='${req.body.phone}',delivery_address='${req.body.deliveryAddress}',password='${req.body.password}' 
        where email = '${req.body.id} `;
    console.log(query);
    try {
        const results = await sequelize.query(query, { type: sequelize.QueryTypes.BULKUPDATE });
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
        const results = await sequelize.query(query, { type: sequelize.QueryTypes.DELETE });
        res.json({ status: 'deleted' });

    }
    catch (e) {
        console.error(e);
        res.status(404).json({ error: 'something went wrong' });
    }
});

module.exports = router;

