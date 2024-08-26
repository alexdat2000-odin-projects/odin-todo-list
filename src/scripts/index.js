import "../styles/styles.css"
import "../styles/header.css"
import "../styles/sidebar.css"
import "../styles/main.css"
import "../styles/footer.css"
import "../styles/modal.css"

import {show_tab} from "./dom-rendering";
import {headerButtonHandlers} from "./handlers/header";
import {addProjectButtonHandlers, renameProjectButtonHandlers} from "./handlers/project";
import {addTaskButtonHandlers} from "./handlers/task";
import {setInputValidators} from "./handlers/inputs";
import {closeButtonsHandlers} from "./handlers/close";

window.onload = () => {
    headerButtonHandlers();
    addProjectButtonHandlers();
    renameProjectButtonHandlers();
    addTaskButtonHandlers();
    setInputValidators();
    closeButtonsHandlers();

    show_tab(0);
}
