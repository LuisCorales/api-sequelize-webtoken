const { Appointment } = require('../db/models/index');

/** To GET appointments route */
module.exports.getAll = async (req, res) => {
    try{
        const result = await Appointment.findAll({
            include: [
                {
                    association: "doctor",
                    include: {
                        association: "hospital",
                    },
                },
                {
                    association: "patient"
                }
            ]
        });

        return res.sendStatus(200);
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To POST appointments route */
module.exports.post = async (req, res) => {
    try{
        const result = await Appointment.create({
            start_time: req.body.start_time,
            end_time: req.end_time,
            doctor_id: req.doctor_id,
            patient_id: req.body.patient_id
        });

        return res.sendStatus(200);
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To GET one appointment by id route */
module.exports.getAppointment = async (req, res) => {
    try{
        const result = await Appointment.findByPk(req.params.appointmentId, {
            include: [
                {
                    association: "doctor",
                    include: {
                        association: "hospital",
                    },
                },
                {
                    association: "patient"
                }
            ]
        });

        return res.sendStatus(200);
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To GET appointments of a doctor by id route */
module.exports.getOneDoctorAppointments = async (req, res) => {
    try{
        const result = await Appointment.findAll({
            include: [
                {
                    association: "doctor",
                    include: {
                        association: "hospital",
                    },
                },
                {
                    association: "patient"
                }
            ],
            where: {
                doctor_id: req.params.doctor_id
            }
        });

        return res.sendStatus(200);
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To PUT appointments route */
module.exports.put = async (req, res) => {
    try{
        const result = await Appointment.update({
            start_time: req.body.start_time,
            end_time: req.end_time,
            doctor_id: req.doctor_id,
            patient_id: req.body.patient_id
        }, {
            where: {
                id: req.params.appointmentId
            }
        });

        return res.sendStatus(200);
    } catch(e) {
        return res.sendStatus(500);
    }
}

/** To DELETE appointments route */
module.exports.delete = async (req, res) => {
    try{
        const result = await Appointment.destroy({
            where: {
                id: req.params.appointmentId
            }
        });

        return res.sendStatus(200);
    } catch(e) {
        return res.sendStatus(500);
    }
}