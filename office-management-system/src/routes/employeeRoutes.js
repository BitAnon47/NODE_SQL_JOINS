const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');


//Test APIs
// router.get('/test', async (req, res) => {
//     try {
//         const [rows] = await db.query('SELECT * FROM employees');
//         res.status(200).json(rows);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching employees' });
//     }
// });

// CRUD operations
router.post('/', employeeController.createEmployee);
// here was the conflict
router.get('/', employeeController.getEmployees);
router.get('/by/:id', employeeController.getEmployeebyid);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

// JOIN-based APIs
router.get('/with-salary', employeeController.getEmployeesWithSalaries)
//router.get('/withSalary', employeeController.getEmpSalary);
router.get('/without-department', employeeController.getEmployeesWithoutDepartment);

module.exports = router;