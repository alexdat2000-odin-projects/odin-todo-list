// eslint-disable-next-line no-undef
const uuidv4 = require("uuid/v4")
import {StorageGet, StorageSet} from "./storage";


const PRIORITIES = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
}

const STATUSES = {
    NOT_COMPLETED: 0,
    COMPLETED: 1,
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

    isExpired() {
        return this.deadline + (60 * 60 * 24 * 1000) < Date.now();
    }

    expiresIn() {
        return Math.floor((this.deadline + (60 * 60 * 24 * 1000) - Date.now()) / (60 * 60 * 24 * 1000));
    }
}


class TodoList {
    todos = [];
    projects = [];

    constructor() {
        const saved_info = StorageGet();
        this.todos = saved_info.todos;
        this.projects = saved_info.projects;
    }

    #UpdateStorage() {
        StorageSet(this.todos, this.projects);
    }

    AddEntry(title, description, priority, deadline, project, status) {
        this.todos.push(new TodoEntry(title, description, priority, deadline, project, status));
        this.todos.sort(TodoEntry.comp);
        if (project !== null && !this.projects.includes(project)) {
            this.projects.push(project);
            this.projects.sort();
        }
        this.#UpdateStorage();
    }

    AddProject(project) {
        if (project !== null && !this.projects.includes(project)) {
            this.projects.push(project);
            this.projects.sort();
            this.#UpdateStorage();
        }
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
        if (project !== null && !this.projects.includes(project)) {
            this.projects.push(project);
            this.projects.sort();
        }
        this.#UpdateStorage();
    }

    DeleteEntry(id) {
        const index = this.#GetIndexById(id);
        if (index === -1) {
            console.error(`ID ${id} not found!`);
            return;
        }
        this.todos.splice(index, 1);
        this.#UpdateStorage();
    }

    DeleteProject(project) {
        const index = this.projects.indexOf(project);
        if (index === -1) {
            console.error(`Project ${project} not found!`);
            return;
        }
        this.projects.splice(index, 1);
        this.todos = this.todos.filter((element) => element.project !== project);
        this.#UpdateStorage();
    }

    GetAllProjects() {
        return this.todos;
    }

    FilterInProgress() {
        return this.todos.filter((entry) => !entry.isExpired() && entry.status === STATUSES.NOT_COMPLETED);
    }

    FilterIncomingDeadlines(days) {
        return this.todos.filter((entry) => !entry.isExpired() && entry.expiresIn() <= days);
    }

    FilterByProject(project) {
        return this.todos.filter((entry) => (project === null || entry.project === project) && !entry.isExpired());
    }

    FilterByStatus(required_statuses) {
        return this.todos.filter((entry) => required_statuses.includes(entry.status) && !entry.isExpired()
            && entry.status === STATUSES.NOT_COMPLETED);
    }

    GetCountsByPriorities() {
        let ans = {
            low: 0,
            normal: 0,
            high: 0,
        }
        for (const entry of this.todos) {
            if (entry.priority === PRIORITIES.LOW) {
                ans.low++;
            } else if (entry.priority === PRIORITIES.NORMAL) {
                ans.normal++;
            } else if (entry.priority === PRIORITIES.HIGH) {
                ans.high++;
            }
        }
        return ans;
    }

    GetCountsByProjects() {
        let projects = {};
        for (const project of this.projects) {
            projects[project] = 0;
        }
        for (const entry of this.todos) {
            if (entry.project !== null) {
                projects[entry.project]++;
            }
        }
        return projects;
    }
}

export {PRIORITIES, STATUSES, TodoEntry, TodoList};
