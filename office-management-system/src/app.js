const express = require('express');
const dotenv = require('dotenv');
const attendanceRoutes = require('./routes/attendanceRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const projectRoutes = require('./routes/projectRoutes');
const salaryRoutes = require('./routes/salaryRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/attendances', attendanceRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/salaries', salaryRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Office Management System API');
});

module.exports = app;