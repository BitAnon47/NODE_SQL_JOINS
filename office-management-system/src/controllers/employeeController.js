const db = require('../config/db'); // Assuming you have a DB connection file

exports.createEmployee = async (req, res) => {
    try {
        const { name, department_id } = req.body;
        const [result] = await db.execute(
            'INSERT INTO employees (name, department_id) VALUES (?, ?)',
            [name, department_id]
        );
        res.status(201).json({ id: result.insertId, name, department_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM employees');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Update an employee
exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, department_id } = req.body;
    try {
        const [result] = await db.query('UPDATE employees SET name = ?, department_id = ? WHERE id = ?', [name, department_id, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found here is updatin controllers' });
        }
        res.json({ id, name, department_id });
    } catch (error) {
        res.status(500).json({ error: 'Error updating employee' });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM employees WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found here is the dlete cont' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting employee' });
    }
};

// Get all employees with their salaries
exports.getEmployeesWithSalaries = async (req, res) => {
    console.log("starting...");
    try {
        const query = `
            SELECT e.id, e.name, s.amount 
            FROM employees e 
            LEFT JOIN salaries s ON e.id = s.employee_id
        `;
        console.log('Executing query:', query);

        const [rows] = await db.query(query);
        console.log('Query result:', rows);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No employees found with salaries' });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching employees with salaries:', error.message);
        res.status(500).json({ error: 'Error fetching employees with salaries', details: error.message });
    }
};

exports.getEmployeebyid = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found here is the getEmploye' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching employee' });
    }
};


exports.getEmployeesWithoutDepartment = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT e.id, e.name 
            FROM employees e 
            LEFT JOIN departments d ON e.department_id = d.id
            WHERE e.department_id IS NULL
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching employees without department' });
    }
};