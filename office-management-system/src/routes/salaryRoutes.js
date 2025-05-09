const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');

// CRUD operations
router.post('/', salaryController.createSalary);
router.get('/:id', salaryController.getSalary);
router.put('/:id', salaryController.updateSalary);
router.delete('/:id', salaryController.deleteSalary);

// JOIN-based APIs
router.get('/total-by-department', salaryController.getTotalSalaryGroupedByDepartment);
router.get('/employees', salaryController.getEmployeesWithSalaries);

module.exports = router;