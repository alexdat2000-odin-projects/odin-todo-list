import "./styles.css"
import "./style_header.css"
import "./style_sidebar.css"
import "./style_main.css"
import "./style_footer.css"
import {PRIORITIES, TodoList} from "./todo-logic.js";
import {generate_sidebar} from "./sidebar-generating.js";
import {generate_main} from "./main-generating.js";
import {StorageClear, StorageSetDefault} from "./storage";


export let todo_list = new TodoList();
let current_tab = 0;

export function render() {
    const sidebar = document.getElementById("sidebar");
    const body = document.querySelector("body");
    body.insertBefore(generate_sidebar(todo_list, current_tab), sidebar);
    body.removeChild(sidebar);
    const main = document.getElementById("main");

    const projects = todo_list.GetProjects();
    let current_todos, new_main;
    switch (current_tab) {
        case 0:
            current_todos = todo_list.GetAllEntries();
            new_main = generate_main("All", current_todos)
            break;
        case 1:
            current_todos = todo_list.FilterInProgress();
            new_main = generate_main("In progress", current_todos)
            break;
        case 2:
            current_todos = todo_list.FilterIncomingDeadlines(1);
            new_main = generate_main("Due today", current_todos)
            break;
        case 3:
            current_todos = todo_list.FilterIncomingDeadlines(7);
            new_main = generate_main("7 days", current_todos)
            break;
        case 4:
            current_todos = todo_list.FilterByPriority([PRIORITIES.HIGH]);
            new_main = generate_main("High priority", current_todos)
            break;
        case 5:
            current_todos = todo_list.FilterByPriority([PRIORITIES.HIGH, PRIORITIES.NORMAL]);
            new_main = generate_main("Normal+ priority", current_todos)
            break;
        case 6:
            current_todos = todo_list.FilterByPriority([PRIORITIES.HIGH, PRIORITIES.NORMAL, PRIORITIES.LOW]);
            new_main = generate_main("Low+ priority", current_todos);
            break;
        default:
            current_todos = todo_list.FilterByProject(projects[current_tab - 7]);
            new_main = generate_main(`Project "${projects[current_tab - 7]}"`, current_todos, projects[current_tab - 7]);
            break;
    }

    body.insertBefore(new_main, main);
    body.removeChild(main);
}

export function show_tab(tab) {
    current_tab = tab;
    render();
}

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
