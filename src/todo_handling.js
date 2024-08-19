const uuidv4 = require("uuid/v4")


const PRIORITIES = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
}

const STATUSES = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    COMPLETED: 2,
    CANCELLED: 3,
}

class TodoEntry {
    constructor(title, description, priority, deadline, project, status) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.deadline = deadline;
        this.project = project;
        this.status = status;
        this.id = uuidv4().slice(0, 8);
    }

    Update(title, description, priority, deadline, project, status) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.deadline = deadline;
        this.project = project;
        this.status = status;
    }

    static comp(lhs, rhs) {  // Sort by date asc, priority desc
        if (lhs.deadline !== rhs.deadline) {
            return lhs.deadline - rhs.deadline;
        }
        return rhs.priority - lhs.priority;
    }
}


class TodoList {
    todos = [];

    AddEnrty(title, description, priority, deadline, project, status) {
        this.todos.push(new TodoEntry(title, description, priority, deadline, project, status));
        this.todos.sort(TodoEntry.comp);
    }

    #GetIndexById(id) {
        return this.todos.findIndex((element) => element.id === id);
    }

    UpdateEntry(id, title, description, priority, deadline, project, status) {
        const index = this.#GetIndexById(id);
        if (index === -1) {
            console.error(`ID ${id} not found!`);
            return;
        }
        this.todos[index].update(title, description, priority, deadline, project, status);
    }

    DeleteEntry(id) {
        const index = this.#GetIndexById(id);
        if (index === -1) {
            console.error(`ID ${id} not found!`);
            return;
        }
        this.todos.splice(index, 1);
    }

    FilterByProject(project) {
        return this.todos.filter((element) => project === null || element.project === project);
    }

    GetProjectList() {
        let projects = [];
        for (let entry of this.todos) {
            projects.push(entry.project);
        }
        return [...new Set(projects)].toSorted();
    }
}

export {PRIORITIES, TodoEntry, TodoList};
