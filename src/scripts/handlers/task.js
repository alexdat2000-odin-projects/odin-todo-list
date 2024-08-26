import {STATUSES, todo_list} from "../todo-logic";
import {MS_IN_DAY} from "../utils";
import {render} from "../dom-rendering";


export function addTaskButtonHandlers() {
    const modal = document.querySelector("#add-task-dialog");
    const form = document.querySelector("#add-task-form");

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
}
