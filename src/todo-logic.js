import {v4 as uuidv4} from 'uuid';
import {StorageGet, StorageSet} from "./storage.js";
import {MS_IN_DAY} from "./main-generating";


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
        const date_now = Math.floor(Date.now() / MS_IN_DAY);
        return this.deadline < date_now;
    }

    expiresIn() {
        const date_now = Math.floor(Date.now() / MS_IN_DAY);
        return this.deadline - date_now;
    }
}


class TodoList {
    todos = [];
    projects = [];

    constructor() {
        const saved_info = StorageGet();
        for (const entry of saved_info.todos) {
            this.AddEntry(entry.title, entry.description, entry.priority, entry.deadline, entry.project, entry.status);
        }
        for (const proj of saved_info.projects) {
            this.AddProject(proj);
        }
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

    GetAllEntries() {
        return this.todos;
    }

    FilterInProgress() {
        return this.todos.filter((entry) => !entry.isExpired() && entry.status === STATUSES.NOT_COMPLETED);
    }

    FilterIncomingDeadlines(days) {
        return this.todos.filter((entry) => !entry.isExpired() && entry.expiresIn() < days);
    }

    FilterByProject(project) {
        return this.todos.filter((entry) => entry.project === project && !entry.isExpired());
    }

    FilterByPriority(required_statuses) {
        return this.todos.filter((entry) => required_statuses.includes(entry.priority) && !entry.isExpired()
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

    GetProjects() {
        return this.projects;
    }
}

export {PRIORITIES, STATUSES, TodoEntry, TodoList};
