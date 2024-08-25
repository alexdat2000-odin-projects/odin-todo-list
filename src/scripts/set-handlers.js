import {StorageClear, StorageSetDefault} from "./storage";
import {STATUSES, todo_list} from "./todo-logic";
import {show_tab, current_tab, render} from "./dom-rendering";
import {MS_IN_DAY} from "./utils";

export function headerButtonHandlers() {
    const resetBtn = document.querySelector("#reset-btn");
    resetBtn.addEventListener("click", () => {
        if (window.confirm("Are you sure you want to reset storage?")) {
            StorageSetDefault();
            todo_list.Reload();
            show_tab(0);
        }
    });

    const clearBtn = document.querySelector("#clear-btn");
    clearBtn.addEventListener("click", () => {
        if (window.confirm("Are you sure you want to clear storage?")) {
            StorageClear();
            todo_list.Reload();
            show_tab(0);
        }
    });
}

export function addProjectButtonHandlers() {
    const modal = document.querySelector("#new-project-dialog");
    const form = document.querySelector("#new-project-form");

    const closeImg = document.querySelector("#add-project-reset-img");
    closeImg.addEventListener("click", () => {
        modal.close();
        form.reset();
    });

    const closeBtn = document.querySelector("#add-project-reset");
    closeBtn.addEventListener("click", () => {
        modal.close();
        form.reset();
    });

    const addBtn = document.querySelector("#add-project-add");
    const inpt = document.querySelector("#new-project-name");
    addBtn.addEventListener("click", (e) => {
        const project_name = inpt.value;
        if (project_name.length < 1 || project_name.length > 30 || todo_list.ProjectExists(project_name)) {
            return false;
        }
        e.preventDefault();
        todo_list.AddProject(project_name);
        show_tab(todo_list.GetProjectId(project_name) + 7);
        modal.close();
        form.reset();
    });

    modal.addEventListener('cancel', (event) => {
        event.preventDefault();
        modal.close();
        form.reset();
    });

    inpt.addEventListener("input", () => {
        const project_name = inpt.value;
        if (todo_list.ProjectExists(project_name)) {
            inpt.setCustomValidity("Project with this name already exists");
        } else if (project_name.length < 1) {
            inpt.setCustomValidity("Project name cannot be empty");
        } else if (project_name.length > 30) {
            inpt.setCustomValidity("Project name cannot be longer than 30 characters");
        } else {
            inpt.setCustomValidity("");
        }
    });
}

export function renameProjectButtonHandlers() {
    const modal = document.querySelector("#rename-project-dialog");
    const form = document.querySelector("#rename-project-form");

    const closeImg = document.querySelector("#rename-project-reset-img");
    closeImg.addEventListener("click", () => {
        modal.close();
        form.reset();
    });

    const closeBtn = document.querySelector("#rename-project-reset");
    closeBtn.addEventListener("click", () => {
        modal.close();
        form.reset();
    });

    const addBtn = document.querySelector("#rename-project-add");
    const inpt = document.querySelector("#rename-project-name");
    addBtn.addEventListener("click", (e) => {
        const project_name = inpt.value;
        if (project_name.length < 1 || project_name.length > 30 || todo_list.ProjectExists(project_name)) {
            return false;
        }
        e.preventDefault();

        const old_name = todo_list.GetProjects()[current_tab - 7];
        todo_list.RenameProject(old_name, project_name);
        show_tab(todo_list.GetProjectId(project_name) + 7);
        modal.close();
        form.reset();
    });

    modal.addEventListener('cancel', (event) => {
        event.preventDefault();
        modal.close();
        form.reset();
    });

    inpt.addEventListener("input", () => {
        const project_name = inpt.value;
        if (todo_list.ProjectExists(project_name)) {
            inpt.setCustomValidity("Project with this name already exists");
        } else if (project_name.length < 1) {
            inpt.setCustomValidity("Project name cannot be empty");
        } else if (project_name.length > 30) {
            inpt.setCustomValidity("Project name cannot be longer than 30 characters");
        } else {
            inpt.setCustomValidity("");
        }
    });
}


export function addTaskButtonHandlers() {
    const modal = document.querySelector("#add-task-dialog");
    const form = document.querySelector("#add-task-form");

    const closeImg = document.querySelector("#add-task-reset-img");
    closeImg.addEventListener("click", () => {
        modal.close();
        form.reset();
    });

    const closeBtn = document.querySelector("#add-task-reset");
    closeBtn.addEventListener("click", () => {
        modal.close();
        form.reset();
    });

    modal.addEventListener('cancel', (event) => {
        event.preventDefault();
        modal.close();
        form.reset();
    });


    const addBtn = document.querySelector("#add-task-add");
    const nameInpt = document.querySelector("#add-task-name");
    const descInpt = document.querySelector("#add-task-description");
    const deadlineInpt = document.querySelector("#add-task-deadline");
    const priorityInpt = document.querySelector('input[name="priority"]:checked');
    const projectInpt = document.querySelector("#add-task-project");

    addBtn.addEventListener("click", (e) => {
        if (!deadlineInpt.checkValidity() || !nameInpt.checkValidity()) {
            return false;
        }
        e.preventDefault();
        console.log("a");
        todo_list.AddEntry(
            nameInpt.value,
            descInpt.value,
            Number(priorityInpt.value),
            deadlineInpt.value === "" ? -1 : Math.floor((new Date(`${deadlineInpt.value}T00:00:00.000Z`)) / MS_IN_DAY),
            projectInpt.value,
            STATUSES.NOT_COMPLETED,
        );

        render();
        modal.close();
        form.reset();
    });

    deadlineInpt.addEventListener("input", () => {
        const val = deadlineInpt.value;
        if (val === 0) {
            deadlineInpt.setCustomValidity("");
            return;
        }
        if (isNaN(new Date(`${deadlineInpt.value}T00:00:00.000Z`).getDate())) {
            deadlineInpt.setCustomValidity("Invalid Date");
            return;
        }
        const day = Math.floor((new Date(`${deadlineInpt.value}T00:00:00.000Z`)) / MS_IN_DAY);
        if (day < 0 || day > 30000) {
            deadlineInpt.setCustomValidity("Invalid Date");
            return;
        }
        deadlineInpt.setCustomValidity("");
    });
}
