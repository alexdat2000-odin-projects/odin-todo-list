import {todo_list} from "../todo-logic";
import {current_tab, show_tab} from "../dom-rendering";

export function addProjectButtonHandlers() {
    const modal = document.querySelector("#new-project-dialog");
    const form = document.querySelector("#new-project-form");

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
}

export function renameProjectButtonHandlers() {
    const modal = document.querySelector("#rename-project-dialog");
    const form = document.querySelector("#rename-project-form");

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
}
