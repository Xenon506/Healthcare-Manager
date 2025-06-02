const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, patientController.createPatient);
router.get('/', authenticate, patientController.getPatients);
router.get('/search', authenticate, patientController.searchPatients);
router.get('/:id', authenticate, patientController.getPatient);
router.put('/:id', authenticate, patientController.updatePatient);
router.delete('/:id', authenticate, patientController.deletePatient);

module.exports = router;
