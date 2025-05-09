const db = require('../config/db');

// Create a new department
exports.createDepartment = async (req, res) => {
    const { name } = req.body;
    try {
        const [result] = await db.query('INSERT INTO departments (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Get a department by ID
exports.getDepartment = async (req, res) => {
    console.log("starting..");
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM departments WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Update a department
exports.updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const [result] = await db.query('UPDATE departments SET name = ? WHERE id = ?', [name, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.json({ id, name });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM departments WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Get all departments with their employees
exports.getDepartmentsWithEmployees = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT d.id AS department_id, d.name AS department_name, e.name AS employee_name
            FROM departments d
            LEFT JOIN employees e ON d.id = e.department_id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};