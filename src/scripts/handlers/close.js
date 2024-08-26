import {addTaskButtonHandlers} from "./task";

export function closeButtonsHandlers() {
    const modal_buttons = [
        {
            modal: document.querySelector("#new-project-dialog"),
            form: document.querySelector("#new-project-form"),
            closeImg: document.querySelector("#add-project-reset-img"),
            closeBtn: document.querySelector("#add-project-reset"),
        },
        {
            modal: document.querySelector("#rename-project-dialog"),
            form: document.querySelector("#rename-project-form"),
            closeImg: document.querySelector("#rename-project-reset-img"),
            closeBtn: document.querySelector("#rename-project-reset"),
        },
        {
            modal: document.querySelector("#add-task-dialog"),
            form: document.querySelector("#add-task-form"),
            closeImg: document.querySelector("#add-task-reset-img"),
            closeBtn: document.querySelector("#add-task-reset"),
        },
    ];

    for (const entry of modal_buttons) {
        entry.closeImg.addEventListener("click", () => {
            addTaskButtonHandlers();
            entry.modal.close();
            entry.form.reset();
        });
        entry.closeBtn.addEventListener("click", () => {
            addTaskButtonHandlers();
            entry.modal.close();
            entry.form.reset();
        });
        entry.modal.addEventListener('cancel', (event) => {
            event.preventDefault();
            addTaskButtonHandlers();
            entry.modal.close();
            entry.form.reset();
        });
    }
}
