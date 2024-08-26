import {STATUSES, todo_list} from "../todo-logic";
import {format_date_to_set_value, MS_IN_DAY} from "../utils";
import {render} from "../dom-rendering";


export function addTaskButtonHandlers() {
    const header = document.querySelector("#add-task-form>.modal-header>div");
    header.textContent = "Add task";
    const oldAddBtn = document.querySelector("#add-task-add");
    oldAddBtn.textContent = "Add";

    const modal = document.querySelector("#add-task-dialog");
    const form = document.querySelector("#add-task-form");

    const nameInpt = document.querySelector("#add-task-name");
    const descInpt = document.querySelector("#add-task-description");
    const deadlineInpt = document.querySelector("#add-task-deadline");
    const projectInpt = document.querySelector("#add-task-project");

    oldAddBtn.replaceWith(oldAddBtn.cloneNode(true));
    const addBtn = document.querySelector("#add-task-add");
    addBtn.addEventListener("click", (e) => {
        if (!deadlineInpt.checkValidity() || !nameInpt.checkValidity()) {
            return false;
        }
        e.preventDefault();

        const priorityInpt = document.querySelector('input[name="priority"]:checked');
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

export function editTaskButtonHandlers(task_id) {
    const header = document.querySelector("#add-task-form>.modal-header>div");
    header.textContent = "Edit task";
    const oldAddBtn = document.querySelector("#add-task-add");
    oldAddBtn.textContent = "Edit";

    const oldTask = todo_list.GetTaskById(task_id);
    const nameInpt = document.querySelector("#add-task-name");
    nameInpt.value = oldTask.title;
    const descInpt = document.querySelector("#add-task-description");
    descInpt.value = oldTask.description;
    const deadlineInpt = document.querySelector("#add-task-deadline");
    deadlineInpt.value = format_date_to_set_value(oldTask.deadline);
    for (let i = 0; i <= 2; i++) {
        document.querySelector(`#priority-option-${i}`).checked = false;
    }
    document.querySelector(`#priority-option-${oldTask.priority}`).checked = true;
    const projectInpt = document.querySelector("#add-task-project");
    projectInpt.value = oldTask.project;

    const modal = document.querySelector("#add-task-dialog");
    const form = document.querySelector("#add-task-form");
    oldAddBtn.replaceWith(oldAddBtn.cloneNode(true));

    const addBtn = document.querySelector("#add-task-add");
    addBtn.addEventListener("click", (e) => {
        if (!deadlineInpt.checkValidity() || !nameInpt.checkValidity()) {
            return false;
        }

        const priorityInpt = document.querySelector('input[name="priority"]:checked');
        e.preventDefault();
        todo_list.UpdateEntry(
            task_id,
            nameInpt.value,
            descInpt.value,
            Number(priorityInpt.value),
            deadlineInpt.value === "" ? -1 : Math.floor((new Date(`${deadlineInpt.value}T00:00:00.000Z`)) / MS_IN_DAY),
            projectInpt.value,
            oldTask.status,
        );

        render();
        modal.close();
        form.reset();
    });
}
