function StorageSet(todos, projects) {
    localStorage.todos = JSON.stringify(todos);
    localStorage.projects = JSON.stringify(projects);
}

function StorageGet() {
    if (localStorage.todos === undefined) {
        return {
            todos: [],
            projects: [],
        };
    }
    return {
        todos: JSON.parse(localStorage.todos),
        projects: JSON.parse(localStorage.storage),
    };
}

export {StorageSet, StorageGet};
