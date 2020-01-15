const inq = require('inquirer');
const mysql = require('mysql');
const log = require('console.table');
let DEPARTMENTS = [];
let ROLES = [];
let MANAGERS = [];
let EMPLOYEES = [];
let connected = false;
let connection;

/**
 * connect
 * @description async function to create a connection to our database
 */
async function connect() {
    if (!connected) {
        connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "employee_tracker_db"
        }, function (err) {
            if (err) throw err;
            connected = true;
        });
    }
}
class Department {
    constructor(name) {
        this.name = name;
    }

    async save() {
        await connection.query('INSERT INTO departments (name) VALUES (?)',
            [this.name], function (err, data) {
                if (err) throw err;
            });
    }
}
class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    async save() {
        await connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
            [this.first_name, this.last_name, this.role_id, this.manager_id], function (err) {
                if (err) throw err;
            });
    }
}
class Role {
    constructor(title, salary, department_id) {
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    async save() {
        await connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)',
            [this.title, this.salary, this.department_id], function (err) {
                if (err) throw err;
            });
    }
}
/**
 * ask
 * @description Initial question prompt for the user
 * This gives the user the option to add, update, delete
 * Departments, Roles, Employees and Managers.
 */
function ask() {
    inq.prompt({
        type: 'list',
        message: 'What do you want?',
        choices: [
            "Exit",
            new inq.Separator(),
            "View Departments",
            "View Roles",
            "View Employees",
            new inq.Separator(),
            "Add department, role, employee",
            "Update Employee Roles",
            "Update Managers",
            new inq.Separator()
        ],
        name: 'task'
    }).then(choice => {
        doTask(choice.task).then((exit) => {
            // if doTask returns true, exit
            if (!exit) return ask();
            connected = false;
            connection.end();
        });
    });
}

/**
 * askWhatToAdd
 * @description Inquirer Prompt for Adding data
 */
async function askWhatToAdd() {
    await inq.prompt({
        type: 'list',
        choices: [
            'Add Department',
            'Add Role',
            'Add Employee'
        ],
        message: 'What would you like to do?',
        name: 'addChoice'
    }).then(choice => {
        switch (choice.addChoice) {
            case 'Add Department':
                return askNewDepartment();
            case 'Add Role':
                return askNewRole();
            case 'Add Employee':
                return askNewEmployee();
            default:
                return;
        }
    })
}

/**
 * askNewDepartment
 * Prompts CLI User for Department Name
 * Saves New Department
 * Prints the Department list
 */
async function askNewDepartment() {
    await inq.prompt({
        type: 'input',
        name: 'dept_name',
        message: 'Name of New Department?'
    }).then(dept => {
        const newDept = new Department(dept.dept_name);
        newDept.save().then(() => {
            getDepts(console.table);
        });
    });
}

/**
 * askNewRole
 * Prompts CLI User for Role information
 * Saves new Role to database
 * Prints the Roles list
 */
async function askNewRole() {
    await inq.prompt([{
        type: 'input',
        name: 'title',
        message: 'Title of New Role?'
    }, {
        type: 'list',
        choices: [540000.00, 440000.00, 140000.00, 100000.00, 85000.00, 45000.00, 15000.00],
        name: 'salary',
        message: 'What is this Role Salary?'
    }, {
        type: 'list',
        choices: DEPARTMENTS,
        name: 'department',
        message: 'Which Department does this Role belong to?'
    }]).then(answers => {
        const department_id = DEPARTMENTS.filter(dept => dept.name === answers.department)[0].id;
        const newRole = new Role(answers.title, answers.salary, department_id);
        newRole.save().then(() => {
            getRoles(console.table);
        });
    });
}

async function askNewEmployee() {
    console.log(ROLES)

    await inq.prompt([{
        type: 'input',
        name: 'first_name',
        message: 'Employee First Name?'
    }, {
        type: 'input',
        name: 'last_name',
        message: 'Employee Last Name?'
    }, {
        type: 'list',
        choices: ROLES.map(role => role.title),
        name: 'role',
        message: 'What Role shall we give the new Employee?'
    }, {
        type: 'list',
        choices: ["None", ...MANAGERS.map((man, i) => `${man.first_name} ${man.last_name}`)],
        name: 'manager',
        message: 'Which Manager does this Employee report to?'
    }]).then(answers => {
        let manager_id;
        let managerArr = MANAGERS.filter(manager => `${manager.first_name} ${manager.last_name}` === answers.manager);
        if (managerArr.length) manager_id = managerArr[0].id;
        const role_id = ROLES.filter(role => role.title === answers.role)[0].id;
        const newEmployee = new Employee(answers.first_name, answers.last_name, role_id, manager_id);
        newEmployee.save().then(() => {
            getEmployees(console.table);
        });
    });
}
/**
 * askWhatToUpdate
 * @description Inquirer Prompt for Updating data
 */
async function askWhatToUpdate() {
    await inq.prompt({
        type: 'list',
        choices: [
            'Update Department',
            'Update Role',
            'Update Employee'
        ],
        message: 'What would you like to do?',
        name: 'addChoice'
    }).then(choice => {
        switch (choice.addChoice) {
            case 'Update Department':
                return askUpdateDepartment();
            case 'Update Role':
                return askUpdateRole();
            case 'Update Employee':
                return updateEmployee();
            default:
                return;
        }
    })
}


/**
 * askNewDepartment
 * Prompts CLI User for Department Name
 * Saves New Department
 * Prints the Department list
 */
async function askUpdateDepartment() {
    await inq.prompt({
        type: 'list',
        name: 'name',
        choices: DEPARTMENTS,
        message: 'What would you like to update?'
    }, {
        type: 'input',
        name: 'new_name',
        message: 'What would you like to rename the department to?'
    }).then(dept => {
        const dep_id = DEPARTMENTS.filter(dep => dept.name === dep.name)[0].id;
        connection.query('UPDATE departments SET name = ? WHERE id = ?', [dept.new_name, dep_id], function (err, data) {
            if (err) throw err;
            console.table(data);
        });
    });
}

/**
 * askUpdateRole
 * Prompts CLI User for Role Name
 * Saves New Role
 * Prints the Role list
 */
async function askUpdateRole() {
    await inq.prompt([{
        type: 'list',
        name: 'name',
        choices: ROLES.map(role => role.title),
        message: 'What would you like to update?'
    }, {
        type: 'input',
        name: 'new_title',
        message: 'What would you like to rename the role to?'
    }]).then(selection => {
        const role_id = ROLES.filter(role => role.title === selection.name)[0].id;
        connection.query('UPDATE roles SET title = ? WHERE id = ?', [selection.new_title, role_id], function (err, data) {
            if (err) throw err;
            getRoles(console.table);
        });
    });
}

function getDepts(done) {
    connection.query('SELECT * FROM departments', function (err, data) {
        if (err) throw err;
        DEPARTMENTS = data;
        done(data);
    });
}
function getEmployees(done) {
    connection.query('SELECT * FROM employees', function (err, data) {
        if (err) throw err;
        EMPLOYEES = data;
        done(data);
    });
}

async function getRoles(done) {
    connection.query('SELECT * FROM roles', function (err, data) {
        if (err) throw err;
        ROLES = data;
        done(data);
    });
}

async function getManagers(done) {
    connection.query('SELECT * FROM employees WHERE manager_id IS NULL', function (err, data) {
        if (err) throw err;
        MANAGERS = data;
        done(data);
    });
}



async function doTask(task) {
    switch (task) {

        case "Add department, role, employee":
            return askWhatToAdd();
        case "View Employees":
            return getEmployees(console.table);
        case "View Departments":
            return getDepts(console.table);
        case "View Roles":
            getRoles(console.table);
            break;
        case "Update Employee Roles":
            return askUpdateRole();
        case "List Managers":
            console.table(MANAGERS);
            break;
        case "List Employees by Manager":
            console.log("List Employees by Manager");
            break;
        default:
            // Default case is "Exit"
            return true;
    }
}


// create connection with mysql db
connect().then(() => {
    getRoles(data1 => {
        ROLES = data1;
        getManagers(data2 => {
            MANAGERS = data2;

            ask();
        });
    });
});