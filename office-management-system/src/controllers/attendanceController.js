const db = require('../config/db');

// Create Attendance
exports.createAttendance = async (req, res) => {
    const { employee_id, date, status } = req.body;
    try {
        const [result] = await db.query('INSERT INTO attendances (employee_id, date, status) VALUES (?, ?, ?)', [employee_id, date, status]);
        res.status(201).json({ id: result.insertId, employee_id, date, status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Attendance
exports.getAttendance = async (req, res) => {
    try {
        const [attendances] = await db.query('SELECT * FROM attendances');
        res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Attendance
exports.updateAttendance = async (req, res) => {
    const { id } = req.params;
    const { employee_id, date, status } = req.body;
    try {
        await db.query('UPDATE attendances SET employee_id = ?, date = ?, status = ? WHERE id = ?', [employee_id, date, status, id]);
        res.status(200).json({ id, employee_id, date, status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Attendance
exports.deleteAttendance = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM attendances WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Attendance with Employee Names
exports.getAttendanceWithEmployeeNames = async (req, res) => {
    try {
        const [attendanceDetails] = await db.query(`
            SELECT a.id, e.name AS employee_name, a.date, a.status 
            FROM attendances a 
            JOIN employees e ON a.employee_id = e.id
        `);
        res.status(200).json(attendanceDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};