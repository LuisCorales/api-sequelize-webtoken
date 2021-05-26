const { Patient } = require('../db/models/index');

/** To GET patients route */
module.exports.getAll = async (req, res) => {
    try{
        const result = await Patient.findAll();

        return res.status(200);
    } catch(e) {
        return res.status(500);
    }
}

/** To POST patients route */
module.exports.post = async (req, res) => {
    try{
        const patients = await Patient.findAll({
            where: {
                id_document: req.body.id_document
            }
        });

        if(patients == 0) {
            const result = await Patient.create({
                firstname: req.body.firstname,
                surname: req.body.surname,
                id_document: req.body.id_document,
                pathology: req.body.pathology
            });
        } else {
            const result = await Patient.update({
                pathology: req.body.pathology
            }, {
                where: {
                    id_document: req.body.id_document
                }
            });
        }
        
        return res.status(200);
    } catch(e) {
        return res.status(500);
    }
}

/** To GET patients by id route */
module.exports.getOne = async (req, res) => {
    try{
        const result = await Patient.findByPk(req.params.id);

        return res.status(200);
    } catch(e) {
        return res.status(500);
    }
}

/** To PUT patients route */
module.exports.put = async (req, res) => {
    try{
        const result = await Patient.update({
            pathology: req.body.pathology
        }, {
            where: {
                id: req.params.id
            }
        });
        
        return res.status(200);
    } catch(e) {
        return res.status(500);
    }
}

/** To DELETE patients route */
module.exports.delete = async (req, res) => {
    try{
        const result = await Patient.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200);
    } catch(e) {
        return res.status(500);
    }
}