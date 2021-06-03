const {Patient} = require('../db/models/index');

/** Verify if patient already exists */
exports.verifyIfPatientExists = async (req, res, next) => {
    try{
        const patients = await Patient.findAll({
            where: {
                id_document: req.body.id_document
            }
        });

        if(patients == 0) {
            req.patientExists = false;
        } else {
            req.patientExists = true;
        }

        next();
    } catch(e) {
        return res.sendStatus(401);
    }
};