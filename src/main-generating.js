import {PRIORITIES, STATUSES} from "./todo-logic.js";
import edit_icon from './static/icons/edit-icon.svg';
import delete_icon from './static/icons/trash-icon.png';
import complete_icon from './static/icons/complete-icon.svg';
import cross_icon from './static/icons/cross-icon.png';
import {format} from "date-fns"


export const MS_IN_DAY = 24 * 60 * 60 * 1000;

function format_date(date) {
    const date_now = Math.floor(Date.now() / MS_IN_DAY);
    if (date === date_now) {
        return "Today";
    } else if (date_now + 1 === date) {
        return "Tomorrow";
    } else {
        return format(date * MS_IN_DAY, "dd LLL yyyy");
    }
}


export function generate_main(title, todos) {
    const elem = document.createElement("div");
    elem.id = "main";

    const header = document.createElement("div");
    header.id = "main-header";

    const headerText = document.createElement("h1");
    headerText.textContent = title;
    header.appendChild(headerText);

    const editIcon = document.createElement("img");
    editIcon.src = edit_icon;
    editIcon.alt = "edit icon";
    header.appendChild(editIcon);

    const deleteIcon = document.createElement("img");
    deleteIcon.src = delete_icon;
    deleteIcon.alt = "delete icon";
    header.appendChild(deleteIcon);
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
        deadline.textContent = format_date(todo.deadline);
        card.appendChild(deadline);

        const description = document.createElement("div");
        description.classList.add("task-description");
        description.textContent = todo.description;
        card.appendChild(description);

        const editIcon = document.createElement("img");
        editIcon.src = edit_icon;
        editIcon.alt = "edit icon";
        editIcon.classList.add("task-btn1");
        card.appendChild(editIcon);

        const statusIcon = document.createElement("img");
        if (todo.status === STATUSES.COMPLETED) {
            statusIcon.src = cross_icon;
            statusIcon.alt = "cross icon";
        } else {
            statusIcon.src = complete_icon;
            statusIcon.alt = "complete icon";
        }
        statusIcon.classList.add("task-btn2");
        card.appendChild(statusIcon);

        const deleteIcon = document.createElement("img");
        deleteIcon.src = delete_icon;
        deleteIcon.alt = "delete icon";
        deleteIcon.classList.add("task-btn3");
        card.appendChild(deleteIcon);

        elem.appendChild(card);
    }
    return elem;
}
