import "../styles/styles.css"
import "../styles/header.css"
import "../styles/sidebar.css"
import "../styles/main.css"
import "../styles/footer.css"
import "../styles/modal.css"

import {show_tab} from "./dom-rendering";
import {
    addProjectButtonHandlers,
    addTaskButtonHandlers,
    headerButtonHandlers,
    renameProjectButtonHandlers
} from "./set-handlers";

window.onload = () => {
    headerButtonHandlers();
    addProjectButtonHandlers();
    renameProjectButtonHandlers();
    addTaskButtonHandlers();

    show_tab(0);
}
