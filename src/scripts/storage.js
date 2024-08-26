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
    localStorage.projects = JSON.stringify(["Fullstack Roadmap", "Minecraft Speedrun", "New project"]);
    localStorage.todos = JSON.stringify([{
        "title": "Go for a walk",
        "description": "",
        "priority": 2,
        "deadline": get_current_day() - 3,
        "project": "",
        "status": 0,
        "id": "1134bf73"
    }, {
        "title": "Make a to-do list",
        "description": "Remember to include \"Make a to-do list\" entry",
        "priority": 1,
        "deadline": get_current_day() - 1,
        "project": "Fullstack Roadmap",
        "status": 1,
        "id": "d8ea2c87"
    }, {
        "title": "Learn 1-cycle",
        "description": "URGENT!!!!",
        "priority": 2,
        "deadline": get_current_day(),
        "project": "Minecraft Speedrun",
        "status": 0,
        "id": "55e231e8"
    }, {
        "title": "Finish Javascript course",
        "description": "",
        "priority": 1,
        "deadline": get_current_day() + 3,
        "project": "Fullstack Roadmap",
        "status": 0,
        "id": "f4e00beb"
    }, {
        "title": "Make a personal website",
        "description": "Get a domain",
        "priority": 0,
        "deadline": get_current_day() + 5,
        "project": "Fullstack Roadmap",
        "status": 0,
        "id": "8bbd68da"
    }, {
        "title": "Kill the Ender Dragon",
        "description": "",
        "priority": 2,
        "deadline": -1,
        "project": "Minecraft Speedrun",
        "status": 1,
        "id": "e7fe8e59"
    }, {
        "title": "Get good",
        "description": "",
        "priority": 1,
        "deadline": -1,
        "project": "Minecraft Speedrun",
        "status": 0,
        "id": "7a017fd4"
    }, {
        "title": "Set up multiple instances",
        "description": "Resetting 9 world at a simultaniously",
        "priority": 0,
        "deadline": -1,
        "project": "Minecraft Speedrun",
        "status": 0,
        "id": "2c35f647"
    }]);
}
