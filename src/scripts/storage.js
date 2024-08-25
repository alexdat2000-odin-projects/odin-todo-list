import {get_current_day} from "./utils";

export function StorageSet(todos, projects) {
    localStorage.todos = JSON.stringify(todos);
    localStorage.projects = JSON.stringify(projects);
}

export function StorageGet() {
    if (localStorage.todos === undefined) {
        StorageSetDefault();
    }
    return {
        todos: JSON.parse(localStorage.todos),
        projects: JSON.parse(localStorage.projects),
    };
}

export function StorageClear() {
    localStorage.projects = JSON.stringify([]);
    localStorage.todos = JSON.stringify([]);
}

export function StorageSetDefault() {
    localStorage.projects = JSON.stringify(["Complete TOP", "Touch grass", "New project"]);
    localStorage.todos = JSON.stringify([{
        "title": "JavaScript course",
        "description": "Complete all content of JavaScript course from TheOdinProject",
        "priority": 1,
        "deadline": get_current_day(),
        "project": "Complete TOP",
        "status": 0,
        "id": "62597696"
    }, {
        "title": "JavaScript course",
        "description": "Complete all content of JavaScript course from TheOdinProject",
        "priority": 0,
        "deadline": get_current_day() + 1,
        "project": "Complete TOP",
        "status": 1,
        "id": "964691f4"
    }, {
        "title": "JavaScript course",
        "description": "Complete all content of JavaScript course from TheOdinProject",
        "priority": 2,
        "deadline": get_current_day() + 5,
        "project": "Complete TOP",
        "status": 0,
        "id": "a3e2fa27"
    }, {
        "title": "JavaScript course",
        "description": "Complete all content of JavaScript course from TheOdinProject",
        "priority": 1,
        "deadline": get_current_day() + 10,
        "project": "Touch grass",
        "status": 0,
        "id": "62597696"
    }, {
        "title": "JavaScript course",
        "description": "Complete all content of JavaScript course from TheOdinProject",
        "priority": 1,
        "deadline": get_current_day() - 2,
        "project": "",
        "status": 0,
        "id": "62597696"
    }, {
        "title": "JavaScript course",
        "description": "Complete all content of JavaScript course from TheOdinProject",
        "priority": 2,
        "deadline": -1,
        "project": "Complete TOP",
        "status": 0,
        "id": "62597696"
    },
    ]);
}
