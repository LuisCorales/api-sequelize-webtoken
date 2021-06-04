const {canManageHospitals} = require("../roles/permissions/hospitalsPermissions");

exports.authManageHospitals = (req, res, next) => {
    if(!canManageHospitals(req.userRole)) {
        return res.sendStatus(401);
    }

    next();
}; 