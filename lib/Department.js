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

module.exports = Department;