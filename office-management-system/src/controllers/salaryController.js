const db = require('../config/db');

// Create a new salary
exports.createSalary = async (req, res) => {
    const { employee_id, amount } = req.body;
    try {
        const [result] = await db.query('INSERT INTO salaries (employee_id, amount) VALUES (?, ?)', [employee_id, amount]);
        res.status(201).json({ id: result.insertId, employee_id, amount });
    } catch (error) {
        res.status(500).json({ error: 'Error creating salary' });
    }
};

// Get a salary by ID
exports.getSalary = async (req, res) => {
    const { id } = req.params;
    try {
        const [salary] = await db.query('SELECT * FROM salaries WHERE id = ?', [id]);
        if (salary.length === 0) {
            return res.status(404).json({ error: 'Salary not found' });
        }
        res.json(salary[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching salary' });
    }
};

// Update a salary
exports.updateSalary = async (req, res) => {
    const { id } = req.params;
    const { employee_id, amount } = req.body;
    try {
        const [result] = await db.query('UPDATE salaries SET employee_id = ?, amount = ? WHERE id = ?', [employee_id, amount, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Salary not found' });
        }
        res.json({ id, employee_id, amount });
    } catch (error) {
        res.status(500).json({ error: 'Error updating salary' });
    }
};

// Delete a salary
exports.deleteSalary = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM salaries WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Salary not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting salary' });
    }
};

// Get total salary grouped by department
exports.getTotalSalaryGroupedByDepartment = async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT d.name AS department_name, SUM(s.amount) AS total_salary
            FROM salaries s
            JOIN employees e ON s.employee_id = e.id
            JOIN departments d ON e.department_id = d.id
            GROUP BY d.name
        `);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching total salary by department' });
    }
};

//Get Employees with salaries 
exports.getEmployeesWithSalaries = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT e.id AS employee_id, e.name AS employee_name, s.amount AS salary
            FROM employees e
            LEFT JOIN salaries s ON e.id = s.employee_id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching employees with salaries' });
    }
};