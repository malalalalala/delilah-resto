const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:Cielitolindo1.@localhost:3306/delilahdb');
// USERS validations, Authentication
const validateUserPass = async (req, res, next) => {

    if ((req.body.email || req.body.user) && req.body.password) {
        const result = await sequelize.query(`SELECT * FROM users WHERE user = '${req.body.user}' or email='${req.body.email}'`, {
            type: sequelize.QueryTypes.SELECT
        })

        if (result.length > 0) {

            next();
        }
    } else {


        return res.status(409).json({ error: 'Please verify username or password' })
    }



}

// Token validation

// const verifyToken = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const verifyToken = jwt.verify(token, 'MyS3cr3t');
//         if (verifyToken) {
//             req.query.email = verifyToken.email;
//             return next();
//         }
//     } catch (e) {
//         return res.status(409).json({ error: 'Session expired or User dont have permissions to access' })
//     }
// }

const validateToken = async (req, res, next) => {
    try {
        const SAFE_KEYWORD = 'MyS3cr3t';
        const token = req.header("auth-token");

        if (!token) return res.status(401).json({ error: "Acceso denegado." });

        const verify = jwt.verify(token, SAFE_KEYWORD);
        req.body.idUser = verify.id;
        console.log(verify);
        next();
    } catch (error) {
        res.status(401).json({ error: "Acceso denegado." });
    }
};

module.exports = { validateUserPass, validateToken };


// const jwt = require('jsonwebtoken');
// let consts = require('consts');

// function validateIdPath(req, res, next) {
//     if (req.params.id >= 1) {
//         next();
//     } else {
//         res.status(404).json("Incorrect path");
//     }
// }

// function userAuthentication(req, res, next) {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const tokenVerification = jwt.verify(token, consts.SAFE_KEYWORD);
//         req.usuario = tokenVerification;
//         next();
//     } catch (err) {
//         res.status(404).json({ error: 'Error validating user, token error' });
//     }
// }

// module.exports = { validateIdPath, userAuthentication };