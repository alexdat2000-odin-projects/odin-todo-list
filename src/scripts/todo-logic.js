import {v4 as uuidv4} from 'uuid';
import {StorageGet, StorageSet} from "./storage.js";
import {get_current_day} from "./utils";


export const PRIORITIES = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
}

export const STATUSES = {
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

    ToggleStatus() {
        this.status ^= 1;
    }

    static comp(lhs, rhs) {  // Sort by date asc, priority desc
        if (lhs.deadline !== rhs.deadline) {
            return (lhs.deadline === -1 ? 10 ** 9 : lhs.deadline) - (rhs.deadline === -1 ? 10 ** 9 : rhs.deadline);
        }
        return rhs.priority - lhs.priority;
    }

    isExpired() {
        const date_now = get_current_day();
        return this.deadline !== -1 && this.deadline < date_now;
    }

    expiresIn() {
        const date_now = get_current_day();
        return this.deadline === -1 ? Infinity : this.deadline - date_now;
    }
}


class TodoList {
    todos = [];
    projects = [];

    // Storing
    constructor() {
        this.Reload();
    }

    Reload() {
        this.todos = [];
        this.projects = [];
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

    // Task setters
    AddEntry(title, description, priority, deadline, project, status) {
        this.todos.push(new TodoEntry(title, description, priority, deadline, project, status));
        this.todos.sort(TodoEntry.comp);
        if (project !== "" && !this.projects.includes(project)) {
            this.projects.push(project);
            this.projects.sort();
        }
        this.#UpdateStorage();
    }

    UpdateEntry(id, title, description, priority, deadline, project, status) {
        const index = this.#GetIndexById(id);
        if (index === -1) {
            console.error(`ID ${id} not found!`);
            return;
        }
        this.todos[index].Update(title, description, priority, deadline, project, status);
        this.todos.sort(TodoEntry.comp);
        if (project !== "" && !this.projects.includes(project)) {
            this.projects.push(project);
            this.projects.sort();
        }
        this.#UpdateStorage();
    }

    ToggleEntryStatus(id) {
        const index = this.#GetIndexById(id);
        if (index === -1) {
            console.error(`ID ${id} not found!`);
            return;
        }
        this.todos[index].ToggleStatus();
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

    // Task getters
    #GetIndexById(id) {
        return this.todos.findIndex((element) => element.id === id);
    }

    GetTaskById(id) {
        return this.todos[this.#GetIndexById(id)];
    }

    // Project setters
    AddProject(project) {
        if (project !== "" && !this.projects.includes(project)) {
            this.projects.push(project);
            this.projects.sort();
            this.#UpdateStorage();
        }
    }

    RenameProject(old_name, new_name) {
        if (!this.projects.includes(old_name)) {
            console.log(`project ${old_name} not found`);
            return;
        }
        this.projects.splice(this.projects.indexOf(old_name), 1);
        this.AddProject(new_name);
        for (let entry of this.todos) {
            if (entry.project === old_name) {
                entry.project = new_name;
            }
        }
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

    // Project getters
    ProjectExists(project) {
        return this.projects.includes(project);
    }

    GetProjectId(project) {
        return this.projects.indexOf(project);
    }

    GetProjectTasks(project) {
        return this.todos.filter((entry) => entry.project === project);
    }

    // Global getters
    GetAllEntries() {
        return this.todos;
    }

    GetProjects() {
        return this.projects;
    }

    // Filters
    FilterInProgress() {
        return this.todos.filter((entry) => entry.status === STATUSES.NOT_COMPLETED);
    }

    FilterIncomingDeadlines(days) {
        return this.todos.filter((entry) => !entry.isExpired() && entry.expiresIn() < days);
    }

    FilterByPriority(required_statuses) {
        return this.todos.filter((entry) => required_statuses.includes(entry.priority));
    }

    // Get counts
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
            if (entry.project !== "") {
                projects[entry.project]++;
            }
        }
        return projects;
    }
}


export let todo_list = new TodoList();
