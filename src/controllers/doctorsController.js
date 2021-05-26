const { Doctor } = require('../db/models/index');

/** To GET doctors route */
module.exports.getAll = async (req, res) => {
    try{
        const result = await Doctor.findAll({
            include: {
                association: "hospital",
                attributes: ['name']
            }
        });

        return res.status(200).send("");
    } catch(e) {
        return res.status(500).send("");
    }
}

/** To POST doctors route */
module.exports.post = async (req, res) => {
    try{    
        const result = await Doctor.create({
            firstname: req.body.firstname,
            surname: req.body.surname,
            speciality: req.body.speciality,
            hospital_id: req.body.hospital_id
        });

        return res.status(200).send("");
    } catch(e) {
        return res.status(500).send("");
    }
}

/** To GET doctor by id route */
module.exports.getOne = async (req, res) => {
    try{
        const result = await Doctor.findByPk(req.params.id, {
            include: {
                association: "hospital",
                attributes: ['name']
            }
        });

        return res.status(200).send("");
    } catch(e) {
        return res.status(500).send("");
    }
}

/** To PUT doctors route */
module.exports.put = async (req, res) => {
    try{
        const result = await Doctor.update({
            firstname: req.body.firstname,
            surname: req.body.surname,
            speciality: req.body.speciality,
            hospital_id: req.body.hospital_id
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

/** To DELETE doctors route */
module.exports.delete = async (req, res) => {
    try{
        const result = await Doctor.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).send("");
    } catch(e) {
        return res.status(500).send("");
    }
}