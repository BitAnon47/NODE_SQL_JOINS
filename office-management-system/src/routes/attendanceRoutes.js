const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// CRUD operations
router.post('/', attendanceController.createAttendance);
router.get('/', attendanceController.getAttendance);
router.put('/:id', attendanceController.updateAttendance);
router.delete('/:id', attendanceController.deleteAttendance);

// JOIN-based APIs
router.get('/with-employee-names', attendanceController.getAttendanceWithEmployeeNames);

module.exports = router;