function StorageSet(todos) {
    localStorage.todos = JSON.stringify(todos);
}

function StorageGet() {
    if (localStorage.todos === undefined) {
        return [];
    }
    return JSON.parse(localStorage.todos);
}

export {StorageSet, StorageGet};
