import close_icon from "../../assets/icons/close.svg"


export function newProjectPopup() {
    const dialog = document.createElement("dialog");

    const header = document.createElement("div");
    const headerTitle = document.createElement("div");
    headerTitle.textContent = "New Project";
    header.classList.add("modal-header");
    header.appendChild(headerTitle);
    const headerClose = document.createElement("img");
    headerClose.src = close_icon;
    headerClose.alt = "close";
    header.appendChild(headerClose);
    dialog.appendChild(header);

    const form = document.createElement("form");
    form.method = "dialog";
    form.id = "new-project-form";

    const nameLabel = document.createElement("label");
    nameLabel.innerHTML = "<p>Name:</p>";
    const nameInput = document.createElement("input");
    nameInput.classList.add("form-input");
    nameInput.id = "new-project-name";
    nameLabel.appendChild(nameInput);
    form.appendChild(nameLabel);

    dialog.appendChild(form);
    return dialog;
}
