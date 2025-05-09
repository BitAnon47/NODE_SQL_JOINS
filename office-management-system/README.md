# Office Management System API

This project is a RESTful API for managing an office database, built using Node.js, Express, and MySQL (or MariaDB). It provides endpoints for managing employees, departments, projects, salaries, and attendance.

## Features

- CRUD operations for:
  - Employees
  - Departments
  - Projects
  - Salaries
  - Attendance

- JOIN-based APIs for:
  - Employee details with department name
  - Listing all employees with their salary
  - Project list with department names
  - Attendance records with employee names
  - Total salary grouped by department
  - Employees without departments (LEFT JOIN)
  - Departments with no employees (RIGHT JOIN)

## Getting Started

### Prerequisites

- Node.js
- MySQL or MariaDB
- npm

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd office-management-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your database credentials:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

### Running the Application

1. Start the server:
   ```
   npm start
   ```

2. The API will be running on `http://localhost:3000`.

## API Endpoints

### Employees
- `POST /employees` - Create a new employee
- `GET /employees` - Get all employees
- `GET /employees/:id` - Get an employee by ID
- `PUT /employees/:id` - Update an employee by ID
- `DELETE /employees/:id` - Delete an employee by ID
- `GET /employees/salaries` - Get all employees with their salary

### Departments
- `POST /departments` - Create a new department
- `GET /departments` - Get all departments
- `GET /departments/:id` - Get a department by ID
- `PUT /departments/:id` - Update a department by ID
- `DELETE /departments/:id` - Delete a department by ID
- `GET /departments/employees` - Get departments with employees

### Projects
- `POST /projects` - Create a new project
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get a project by ID
- `PUT /projects/:id` - Update a project by ID
- `DELETE /projects/:id` - Delete a project by ID
- `GET /projects/departments` - Get project list with department names

### Salaries
- `POST /salaries` - Create a new salary record
- `GET /salaries` - Get all salary records
- `GET /salaries/:id` - Get a salary record by ID
- `PUT /salaries/:id` - Update a salary record by ID
- `DELETE /salaries/:id` - Delete a salary record by ID
- `GET /salaries/total` - Get total salary grouped by department

### Attendance
- `POST /attendances` - Create a new attendance record
- `GET /attendances` - Get all attendance records
- `GET /attendances/:id` - Get an attendance record by ID
- `PUT /attendances/:id` - Update an attendance record by ID
- `DELETE /attendances/:id` - Delete an attendance record by ID
- `GET /attendances/employees` - Get attendance with employee names

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.