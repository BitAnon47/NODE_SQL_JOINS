const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// CRUD operations for projects
router.post('/', projectController.createProject);
router.get('/get/:id', projectController.getProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// JOIN-based APIs
router.get('/with-department-names', projectController.getProjectsWithDepartmentNames);

module.exports = router;