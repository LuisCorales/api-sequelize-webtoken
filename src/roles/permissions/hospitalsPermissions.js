const {ROLE} = require('../roles');

// TODO: Relacionar el hospital con el usuario, y que ese usuario si es hospital, solo 
// pueda ver su perfil del hospital, las citas de ese hospital (de ahi tambien se verán los pacientes)
// los doctores de ese hospital
exports.canManageHospitals = (userRole) => {
    return (
        userRole === ROLE.ADMIN ||
        userRole === ROLE.HOSPITAL
    )
};