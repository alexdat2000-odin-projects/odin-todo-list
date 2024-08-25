import "../styles/styles.css"
import "../styles/header.css"
import "../styles/sidebar.css"
import "../styles/main.css"
import "../styles/footer.css"
import "../styles/modal.css"

import {todo_list} from "./todo-logic.js";
import {StorageClear, StorageSetDefault} from "./storage";
import {show_tab} from "./dom-rendering";

window.onload = () => {
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

    show_tab(0);
}
