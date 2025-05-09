const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// CRUD operations for departments
router.post('/', departmentController.createDepartment);
router.get('/', departmentController.getDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

// JOIN-based APIs
router.get('/employees', departmentController.getDepartmentsWithEmployees);

module.exports = router;