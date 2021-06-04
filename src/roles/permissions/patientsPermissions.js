const {ROLE} = require('../roles');

// TODO: Relacionar el patient con el usuario, y que ese usuario si es paciente, solo 
// pueda ver su perfil de patient
exports.canManagePatients = (userRole) => {
    return (
        userRole === ROLE.ADMIN ||
        userRole === ROLE.PATIENT
    )
};