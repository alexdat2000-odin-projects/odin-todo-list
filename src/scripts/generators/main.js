import {PRIORITIES, STATUSES} from "../todo-logic.js";
import {show_tab, render} from '../dom-rendering'
import {todo_list} from "../todo-logic.js";
import {format_date_to_render} from "../utils";

import edit_icon from '../../assets/icons/edit-icon.svg';
import delete_icon from '../../assets/icons/trash-icon.png';
import complete_icon from '../../assets/icons/complete-icon.svg';
import cross_icon from '../../assets/icons/cross-icon.png';
import plus_icon from "../../assets/icons/plus-icon.svg";
import {addTaskButtonHandlers, editTaskButtonHandlers} from "../handlers/task";


export function generate_main(title, todos, project_name = "") {
    const elem = document.createElement("div");
    elem.id = "main";

    const header = document.createElement("div");
    header.id = "main-header";
    const headerText = document.createElement("h1");
    headerText.textContent = title;
    header.appendChild(headerText);

    if (project_name !== "") {
        const addIcon = document.createElement("img");
        addIcon.src = plus_icon;
        addIcon.alt = "plus icon";
        addIcon.addEventListener("click", () => {
            addTaskButtonHandlers(project_name);
            const addTaskDialog = document.querySelector("#add-task-dialog");
            addTaskDialog.showModal();
        });
        header.appendChild(addIcon);

        const editIcon = document.createElement("img");
        editIcon.src = edit_icon;
        editIcon.alt = "edit icon";
        editIcon.addEventListener("click", () => {
            const renameProjectPopUp = document.querySelector("#rename-project-dialog");
            const renameInput = document.querySelector("#rename-project-name");
            renameInput.value = project_name;
            renameProjectPopUp.showModal();
        });
        header.appendChild(editIcon);

        const deleteIcon = document.createElement("img");
        deleteIcon.src = delete_icon;
        deleteIcon.alt = "delete icon";
        deleteIcon.addEventListener("click", () => {
            if (window.confirm(`Are you sure you want to delete project ${project_name}?`)) {
                todo_list.DeleteProject(project_name);
                show_tab(0);
            }
        });
        header.appendChild(deleteIcon);
    } else {
        header.appendChild(document.createElement("div"));
        header.appendChild(document.createElement("div"));
        const addIcon = document.createElement("img");
        addIcon.src = plus_icon;
        addIcon.alt = "plus icon";
        addIcon.addEventListener("click", () => {
            addTaskButtonHandlers("");
            const addTaskDialog = document.querySelector("#add-task-dialog");
            addTaskDialog.showModal();
        });
        header.appendChild(addIcon);
    }
    elem.appendChild(header);

    for (const todo of todos) {
        const card = document.createElement("div");
        card.classList.add("task-card");

        const stripe = document.createElement("div");
        stripe.classList.add("stripe");
        switch (todo.priority) {
            case PRIORITIES.LOW:
                stripe.classList.add("priority-low");
                break;
            case PRIORITIES.NORMAL:
                stripe.classList.add("priority-normal");
                break;
            case PRIORITIES.HIGH:
                stripe.classList.add("priority-high");
                break;
        }
        card.appendChild(stripe);

        const title = document.createElement("div");
        title.classList.add("task-name");
        if (todo.status === STATUSES.COMPLETED) {
            title.classList.add("task-completed");
        }
        title.textContent = todo.title;
        card.appendChild(title);

        const deadline = document.createElement("div");
        deadline.classList.add("task-deadline");
        deadline.textContent = format_date_to_render(todo.deadline);
        if (todo.isExpired() && todo.status === STATUSES.NOT_COMPLETED) {
            deadline.classList.add("expired");
        }
        card.appendChild(deadline);

        const description = document.createElement("div");
        description.classList.add("task-description");
        description.textContent = todo.description;
        card.appendChild(description);

        const editIcon = document.createElement("img");
        editIcon.src = edit_icon;
        editIcon.alt = "edit icon";
        editIcon.classList.add("task-btn1");
        editIcon.addEventListener("click", () => {
            editTaskButtonHandlers(todo.id);
            const editTaskDialog = document.querySelector("#add-task-dialog");
            editTaskDialog.showModal();
        });
        card.appendChild(editIcon);

        const statusIcon = document.createElement("img");
        if (todo.status === STATUSES.COMPLETED) {
            statusIcon.src = cross_icon;
            statusIcon.alt = "cross icon";
        } else {
            statusIcon.src = complete_icon;
            statusIcon.alt = "complete icon";
        }
        statusIcon.addEventListener("click", () => {
            todo_list.ToggleEntryStatus(todo.id);
            render();
        });
        statusIcon.classList.add("task-btn2");
        card.appendChild(statusIcon);

        const deleteIcon = document.createElement("img");
        deleteIcon.src = delete_icon;
        deleteIcon.alt = "delete icon";
        deleteIcon.classList.add("task-btn3");
        deleteIcon.addEventListener("click", () => {
            if (window.confirm(`Are you sure you want to delete this task?`)) {
                todo_list.DeleteEntry(todo.id);
                render();
            }
        })
        card.appendChild(deleteIcon);

        elem.appendChild(card);
    }
    return elem;
}
