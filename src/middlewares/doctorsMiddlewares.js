const {canManageDoctors} = require("../roles/permissions/doctorsPermissions");

exports.authManageDoctors = (req, res, next) => {
    if(!canManageDoctors(req.userRole)) {
        return res.sendStatus(401);
    }

    next();
}; 