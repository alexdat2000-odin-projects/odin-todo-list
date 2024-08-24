import "./styles.css"
import {PRIORITIES, STATUSES, TodoList} from "./todo-logic.js";
import {generate_sidebar} from "./sidebar-generating.js";
import {generate_main, MS_IN_DAY} from "./main-generating.js";


let todo_list = new TodoList();
let current_tab = 1;

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
    current_tab = tab;
    render();
}

window.onload = () => {
    todo_list.AddEntry("JavaScript course", "Complete all content of JavaScript course from TheOdinProject",
        PRIORITIES.NORMAL, Math.floor(Date.now() / MS_IN_DAY), "Complete TOP", STATUSES.NOT_COMPLETED);
    todo_list.AddEntry("JavaScript course", "Complete all content of JavaScript course from TheOdinProject",
        PRIORITIES.LOW, Math.floor(Date.now() / MS_IN_DAY) + 1, "Complete TOP", STATUSES.NOT_COMPLETED);
    todo_list.AddEntry("JavaScript course", "Complete all content of JavaScript course from TheOdinProject",
        PRIORITIES.HIGH, Math.floor(Date.now() / MS_IN_DAY) + 4, "Complete TOP", STATUSES.NOT_COMPLETED);
    render();
}
