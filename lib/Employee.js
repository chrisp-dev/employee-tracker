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

module.exports = Employee;