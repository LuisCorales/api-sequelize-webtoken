const { Hospital } = require('../db/models/index');

/** To GET hospitals route */
module.exports.getAll = async (req, res) => {
    try{
        const result = await Hospital.findAll();

        return res.status(200).send("");
    } catch(e) {
        return res.status(500).send("");
    }
}

/** To POST hospitals route */
module.exports.post = async (req, res) => {
    try{    
        const result = await Hospital.create({
            name: req.body.name
        });

        return res.status(200).send("");
    } catch(e) {
        return res.status(500).send("");
    }
}

/** To GET hospitals by id route */
module.exports.getOne = async (req, res) => {
    try{
        const result = await Hospital.findByPk(req.params.id);

        return res.status(200).send("");
    } catch(e) {
        return res.status(500).send("");
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

        return res.status(200).send("");
    } catch(e) {
        return res.status(500).send("");
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

        return res.status(200).send("");
    } catch(e) {
        return res.status(500).send("");
    }
}