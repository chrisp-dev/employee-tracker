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

module.exports = Role;