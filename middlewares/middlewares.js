const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const atob = require('atob');
const bodyParser = require('body-parser');

const sequelize = new Sequelize('mysql://root:Cielitolindo1.@localhost:3306/delilahdb');


const validateTokenRole = function (role) {
    return async (req, res, next) => {
        try {
            const SAFE_KEYWORD = 'MyS3cr3t';
            const token = req.header("auth-token");
            var base64 = token.split('.')[1];
            var decodedValue = JSON.parse(atob(base64));
            //console.log('role');
            //console.log(decodedValue);
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
                //console.log(role);
                //console.log(decodedValue.role);
                if (decodedValue.role != role) return res.status(401).json({ error: "Access Denied" });
            };
            const verify = jwt.verify(token, SAFE_KEYWORD);
            req.body.idUser = verify.id;
            //console.log(verify);
            next();
        } catch (error) {
            res.status(401).json({ error: "Access Denied" });
        }
    }
};



module.exports = { validateTokenRole };



