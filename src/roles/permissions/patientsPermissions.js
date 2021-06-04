const ROLE = require('../roles');

exports.canViewPatient = (user, patient) => {
    return (
        user.dataValues.role === ROLE.ADMIN ||
        patient.dataValues.id === user.dataValues.id
    )
}