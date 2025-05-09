const db = require('../config/db');

// Create a new project
exports.createProject = async (req, res) => {
    const { name, department_id } = req.body;
    try {
        const [result] = await db.query('INSERT INTO projects (name, department_id) VALUES (?, ?)', [name, department_id]);
        res.status(201).json({ id: result.insertId, name, department_id });
    } catch (error) {
        res.status(500).json({ error: 'Error creating project' });
    }
};

// Get a project by ID
exports.getProject = async (req, res) => {
    const { id } = req.params;
    try {
        const [project] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
        if (project.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching project' });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, department_id } = req.body;
    try {
        const [result] = await db.query('UPDATE projects SET name = ?, department_id = ? WHERE id = ?', [name, department_id, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ id, name, department_id });
    } catch (error) {
        res.status(500).json({ error: 'Error updating project' });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM projects WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting project' });
    }
};

// Get projects with department names
exports.getProjectsWithDepartmentNames = async (req, res) => {
    try {
        const [projects] = await db.query(`
            SELECT p.id, p.name AS project_name, d.name AS department_name 
            FROM projects p 
            JOIN departments d ON p.department_id = d.id
        `);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching projects with department names' });
    }
};