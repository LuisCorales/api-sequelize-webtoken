const {ROLE} = require('../roles');

// TODO: Relacionar el doctor con el usuario, y que ese usuario si es doctor, solo 
// pueda ver su perfil del doctor, las citas que tenga ese doctor (de ahi tambien se verán los pacientes)
exports.canManageDoctors = (userRole) => {
    return (
        userRole === ROLE.ADMIN ||
        userRole === ROLE.DOCTOR
    )
};