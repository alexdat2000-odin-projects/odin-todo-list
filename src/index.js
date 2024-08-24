import "./styles.css"
import {generate_sidebar} from "./dom-generating";
import {TodoList} from "./todo-logic";

let todo_list = new TodoList();


function update_sidebar(selected) {
    const sidebar = document.getElementById("sidebar");
    const body = document.querySelector("body");

    body.insertBefore(generate_sidebar(todo_list, selected), sidebar);
    body.removeChild(sidebar);
}

export function show_filter(filter) {
    console.log(filter);
    update_sidebar(filter);
}

window.onload = () => {
    update_sidebar(null);
}
