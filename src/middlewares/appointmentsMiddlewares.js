const { Appointment, Doctor, Patient } = require('../db/models/index');

const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

/** 
 * Asign doctor speciality and appointment duration by patient's pathology 
 * @param pathology The pathology of the patient 
 * */
const asingDoctorAndDuration = (pathology) => {
    if(pathology == null) {
        return ["general", 15]
    }

    var speciality;
    var duration;
    var str = pathology.toLowerCase();

    switch (str) {
        case "cancer":
            speciality = "oncology";
            duration = 60;
            break;

        case "leukemia": 
        case "anemia":
        case "hemophilia":
            speciality = "hematology";
            duration = 60;
            break;
        
        case "hypertension": 
        case "heart attack":
            speciality = "cardiology";
            duration = 60;
            break;
    
        default:
            speciality = "general";
            duration = 15;
            break;
    }

    return [speciality, duration];
};

/** 
 * Check if date overlaps another date from the same doctor. 
 * Returns true or false if overlaps or not, and a respective message.
 * @param startTimeNew Date 1 start.
 * @param endTimeNew Date 1 end.
 * @param id Date 1 id. Use when trying to update.
 * @param otherDates Array of JSON with other dates to compare. The JSON should include startTime, endTime, id.
 * */
const checkIfDatesOverlap = (startTimeNew, endTimeNew, id, otherDates) => {
    if(otherDates.length == 0) {   
        return [false, "There are no appointments yet!"];
    }

    // For each appointment with the same doctor, check dates
    for (let i = 0; i < otherDates.length; i++) {
        const dateStart = otherDates[i].start_time;
        const dateEnd = otherDates[i].end_time;
        const dateId = otherDates[i].id;

        const range1 = moment().range(dateStart, dateEnd);
        const range2 = moment().range(startTimeNew, endTimeNew);

        // Only check dates where the id is different
        if(dateId != id){
            // If at least one is overlapping, then return true
            if((range1.contains(startTimeNew) && range1.contains(endTimeNew)) 
            || (range2.contains(dateStart) || range2.contains(dateEnd))) {
                // Overlap
                return [true, "There are dates overlapping..."];
            }
        }
    }

    return [false, "There are no overlapping dates!"];
};

/** Verify if dates from the same doctor don't conflict */
exports.verifyIfDatesDontConflict = async (req, res, next) => {
    try{
        const patient = await Patient.findByPk(req.body.patient_id);
        const speciality_duration = asingDoctorAndDuration(patient.dataValues.pathology);
        const doctor = await Doctor.findOne({
            where: {
                speciality: speciality_duration[0]
            }
        });

        const doctor_id = doctor.id;

        const end_time = moment(moment(req.body.start_time), "hh:mm:ss").add(speciality_duration[1], 'minutes');
        
        const otherDates = await Appointment.findAll({
            attributes: ['start_time', 'end_time', 'id'],
            where: {
                doctor_id: doctor_id
            }
        });

        let appointmentId = 0;
        // If there is an ID in the params
        if(req.params.appointmentId != null) {
            appointmentId = req.params.appointmentId;
        }

        const overlaps = checkIfDatesOverlap(moment(req.body.start_time), moment(end_time), appointmentId, otherDates);
        if(overlaps[0]) {
            // If dates overlap, throw error
            throw new Error(overlaps[1]);
        }

        req.end_time = end_time;
        req.doctor_id = doctor_id;

        next();
    } catch(e) {
        console.log(e)
        return res.sendStatus(500);
    }
};