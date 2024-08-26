import {StorageClear, StorageSetDefault} from "../storage";
import {todo_list} from "../todo-logic";
import {show_tab} from "../dom-rendering";

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
