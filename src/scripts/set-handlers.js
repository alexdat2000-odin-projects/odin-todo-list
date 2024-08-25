import {StorageClear, StorageSetDefault} from "./storage";
import {todo_list} from "./todo-logic";
import {show_tab} from "./dom-rendering";

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
