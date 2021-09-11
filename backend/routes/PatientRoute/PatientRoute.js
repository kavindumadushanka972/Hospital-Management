const express = require('express');
const router = express.Router();
const { protectedPatient} = require("../../middlewares/route-authorization");

const {
    updatePatientDetails,
    getPatientDetails,
    deletePatientDetails,
    upload,
    getmyapointment,
    getpdf,
    orderMedicine
    
} = require("../../controllers/PatientController");

router.route('/getPatientDetails/:id').get(protectedPatient, getPatientDetails);
router.route('/updatePatientDetails').put(updatePatientDetails,protectedPatient);
router.route('/deletePatientProfile/:id').delete(deletePatientDetails,protectedPatient);
router.route('/upload').post(upload);
router.route('/download_pdf/:id').post(getmyapointment);
router.route('/download').get(getpdf)
router.route('/medicineOrder/:Id').post(orderMedicine)

module.exports=router;




