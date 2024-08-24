function StorageSet(todos, projects) {
    localStorage.todos = JSON.stringify(todos);
    localStorage.projects = JSON.stringify(projects);
}

function StorageGet() {
    if (localStorage.todos === undefined) {
        return {
            todos: [{
                "title": "JavaScript course",
                "description": "Complete all content of JavaScript course from TheOdinProject",
                "priority": 1,
                "deadline": 19959,
                "project": "Complete TOP",
                "status": 0,
                "id": "62597696"
            }, {
                "title": "JavaScript course",
                "description": "Complete all content of JavaScript course from TheOdinProject",
                "priority": 0,
                "deadline": 19960,
                "project": "Complete TOP",
                "status": 0,
                "id": "964691f4"
            }, {
                "title": "JavaScript course",
                "description": "Complete all content of JavaScript course from TheOdinProject",
                "priority": 2,
                "deadline": 19963,
                "project": "Complete TOP",
                "status": 0,
                "id": "a3e2fa27"
            }],
            projects: ["Complete TOP"],
        };
    }
    return {
        todos: JSON.parse(localStorage.todos),
        projects: JSON.parse(localStorage.projects),
    };
}

export {StorageSet, StorageGet};
