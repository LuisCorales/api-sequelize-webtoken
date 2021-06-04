const express = require('express');
const router = express.Router();

const patientsRoutes = require("./patientsRoute");
const hospitalsRoutes = require("./hospitalsRoute");
const doctorsRoutes = require("./doctorsRoute");
const appointmentsRoutes = require("./appointmentsRoute");

const { authManagePatients } = require('../../middlewares/patientsMiddlewares');
const { authManageHospitals } = require('../../middlewares/hospitalsMiddlewares');
const { authManageDoctors } = require('../../middlewares/doctorsMiddlewares');

router.use("/patients", authManagePatients, patientsRoutes);
router.use("/hospitals", authManageHospitals, hospitalsRoutes);
router.use("/doctors", authManageDoctors, doctorsRoutes);
router.use("/appointments", appointmentsRoutes);

module.exports = router;