import "./styles.css"
import {TodoList} from "./todo-logic.js";
import {generate_sidebar} from "./sidebar-generating.js";
import {generate_main} from "./main-generating.js";


let todo_list = new TodoList();
let current_tab = 0;

function render() {
    const sidebar = document.getElementById("sidebar");
    const body = document.querySelector("body");
    body.insertBefore(generate_sidebar(todo_list, current_tab), sidebar);
    body.removeChild(sidebar);

    const main = document.getElementById("main");

    body.insertBefore(generate_main("Test", todo_list.GetAllEntries()), main);
    body.removeChild(main);
}

export function show_tab(tab) {
    console.log(tab);
    current_tab = tab;
    render();
}

window.onload = () => {
    render();
}
