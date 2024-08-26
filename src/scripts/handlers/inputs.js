import {todo_list} from "../todo-logic";
import {MS_IN_DAY} from "../utils";


function project_name_validator(inpt) {
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
}


export function setInputValidators() {
    const newProjectName = document.querySelector("#new-project-name");
    newProjectName.addEventListener("input", () => {
        project_name_validator(newProjectName);
    });
    const renamedProjectName = document.querySelector("#rename-project-name");
    renamedProjectName.addEventListener("input", () => {
        project_name_validator(newProjectName);
    });

    const deadlineInpt = document.querySelector("#add-task-deadline");
    deadlineInpt.addEventListener("input", () => {
        const val = deadlineInpt.value;
        if (val === "") {
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
