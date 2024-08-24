import "./styles.css"
import "./style_header.css"
import "./style_sidebar.css"
import "./style_main.css"
import "./style_footer.css"
import {todo_list} from "./todo-logic.js";
import {StorageClear, StorageSetDefault} from "./storage";
import {render} from "./dom-rendering";

window.onload = () => {
    const resetBtn = document.querySelector("#reset-btn");
    resetBtn.addEventListener("click", () => {
        StorageSetDefault();
        todo_list.Reload();
        render();
    });

    const clearBtn = document.querySelector("#clear-btn");
    clearBtn.addEventListener("click", () => {
        StorageClear();
        todo_list.Reload();
        render();
    });

    render();
}
