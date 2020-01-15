const inq = require('inquirer');

function ask() {
    inq.prompt({
        type: 'list',
        message: 'What do you want?',
        choices: [
            "Exit",
            "Onboard New Employee",
            "List All Employees",
            "List Employee by Department",
            "List Roles by Department",
            "List Employees by Role",
            "List Managers",
            "List Employees by Manager"
        ],
        name: 'task'
    }).then(choice => {
        doTask(choice.task).then((exit) => {
            // if doTask returns true, exit
            if (!exit) ask();
            console.log("Complete");
        });
    });
}

async function doTask(task) {
    switch (task) {

        case "Onboard New Employee":
            console.log("Onboard New Employee");
            break;
        case "List All Employees":
            console.log("List All Employees");
            break;
        case "List Employee by Department":
            console.log("List Employee by Department");
            break;
        case "List Roles by Department":
            console.log("List Roles by Department");
            break;
        case "List Employees by Role":
            console.log("List Employees by Role");
            break;
        case "List Managers":
            console.log("List Managers");
            break;
        case "List Employees by Manager":
            console.log("List Employees by Manager");
            break;
        default:
            // Default case is "Exit"
            return true;

    }
}

ask();