import "./styles.css"
import {generate_sidebar} from "./dom-generating";
import {TodoList} from "./todo-logic";

let todo_list = new TodoList();


function update_sidebar(selected) {
    const sidebar = document.getElementById("sidebar");
    const body = document.querySelector("body");

    body.insertBefore(generate_sidebar(todo_list), sidebar);
    body.removeChild(sidebar);
}


window.onload = () => {
    update_sidebar(null);
}
