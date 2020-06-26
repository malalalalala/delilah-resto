class UserController {

    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async getUsers(req, res) {
        const sequelize = sequelize;
        try {
            const query = 'SELECT * FROM users';
            const results = await sequelize.query(query, { raw: true });
            //console.log(results);
            res.json(results);
        } catch (e) {
            return res.status(404).json(`something went wrong: ${e}`);
        }
    }

}

module.exports = UserController;