const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const atob = require('atob');
const bodyParser = require('body-parser');

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
        var base64 = token.split('.')[1];
        var decodedValue = JSON.parse(atob(base64));
        console.log('role');
        console.log(decodedValue);

        if (!token) return res.status(401).json({ error: "Access denied" });

        const verify = jwt.verify(token, SAFE_KEYWORD);

        console.log(verify);
        req.body.idUser = verify.id;
        console.log(verify.role)
        console.log(verify);
        next();
    } catch (error) {

        console.log(error);
        res.status(401).json({ error: "access denied" });
    }
};



const validateTokenRole = function (role) {
    return async (req, res, next) => {
        try {
            const SAFE_KEYWORD = 'MyS3cr3t';
            const token = req.header("auth-token");
            var base64 = token.split('.')[1];
            var decodedValue = JSON.parse(atob(base64));
            console.log('role');
            console.log(decodedValue);


            if (!token) return res.status(401).json({ error: "Access Denied" });


            if (Array.isArray(role)) {
                //console.log("es un arreglo")
                let hasRole = false;
                for (let val of role) {
                    if (val == decodedValue.role) {
                        hasRole = true;
                    }
                }
                if (!hasRole) return res.status(401).json({ error: "Access Denied" });

            } else {
                //console.log("no es un arreglo")
                console.log(role);
                console.log(decodedValue.role);

                if (decodedValue.role != role) return res.status(401).json({ error: "Acceso denegado." });
            };



            const verify = jwt.verify(token, SAFE_KEYWORD);

            req.body.idUser = verify.id;

            console.log('holaaaaaa');
            console.log(verify);
            next();
        } catch (error) {
            res.status(401).json({ error: "Acceso denegado." });
        }
    }
};


function validarAdmin(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json("Primero debes iniciar sesión");
    } else {
        const verificado = jwt.verify(token, passwordJwt);
        let usuario = verificado.usuario_token;
        if (usuario.admin == 1) {
            return next();
        } else {
            res.status(403).json("Acceso denegado. Sólo administradores");
        }
    }
}

module.exports = { validateUserPass, validateToken, validateTokenRole };


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

