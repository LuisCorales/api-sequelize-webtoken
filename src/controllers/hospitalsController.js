const { Hospital } = require('../db/models/index');

/** To GET hospitals route */
module.exports.getAll = async (req, res) => {
    try{
        const result = await Hospital.findAll();

        return res.sendStatus(200);
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To POST hospitals route */
module.exports.post = async (req, res) => {
    try{    
        const result = await Hospital.create({
            name: req.body.name
        });

        return res.status(200).send(result);
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To GET hospitals by id route */
module.exports.getOne = async (req, res) => {
    try{
        const result = await Hospital.findByPk(req.params.id);

        return res.status(200).send(result);
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To PUT hospitals route */
module.exports.put = async (req, res) => {
    try{
        const result = await Hospital.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.status(200).send(result);
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To DELETE hospitals route */
module.exports.delete = async (req, res) => {
    try{
        const result = await Hospital.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.sendStatus(200);
    } catch(e) {
        return res.sendStatus(500);
    }
}