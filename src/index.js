import "./styles.css"
import {generate_sidebar} from "./dom-generating";
import {TodoList} from "./todo-logic";

let todo_list = new TodoList();
let current_tab = 1;

function update_sidebar() {
    const sidebar = document.getElementById("sidebar");
    const body = document.querySelector("body");

    body.insertBefore(generate_sidebar(todo_list, current_tab), sidebar);
    body.removeChild(sidebar);
}

export function show_tab(tab) {
    current_tab = tab;
    update_sidebar();
}

window.onload = () => {
    update_sidebar(null);
}
