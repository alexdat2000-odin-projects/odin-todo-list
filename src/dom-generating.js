import all_icon from './static/icons/all-icon.png';
import day_icon from './static/icons/day-icon.png';
import in_progress_icon from './static/icons/in-progress-icon.png';
import priority_icon_low from './static/icons/priority-icon-low.png';
import priority_icon_normal from './static/icons/priority-icon-normal.png';
import priority_icon_high from './static/icons/priority-icon-high.png';
import project_icon from './static/icons/project-icon.png';
import week_icon from './static/icons/week-icon.png';


export function generate_sidebar(todo_list) {
    let counts_by_priorities = todo_list.GetCountsByPriorities();

    const content = [{
        header: null,
        content: [
            {
                src: all_icon,
                alt: "all icon",
                text: `All (${
                    counts_by_priorities.low +
                    counts_by_priorities.normal +
                    counts_by_priorities.high
                })`
            },
            {
                src: in_progress_icon,
                alt: "in progress icon",
                text: `In progress (${todo_list.FilterInProgress().length})`
            },
            {
                src: day_icon,
                alt: "day icon",
                text: `Due today (${todo_list.FilterIncomingDeadlines(1).length})`
            },
            {
                src: week_icon,
                alt: "week icon",
                text: `7 days (${todo_list.FilterIncomingDeadlines(7).length})`
            },
        ]
    }, {
        header: "By importance",
        content: [
            {
                src: priority_icon_high,
                alt: "high priority icon",
                text: `High (${counts_by_priorities.high})`
            },
            {
                src: priority_icon_normal,
                alt: "normal priority icon",
                text: `Normal+ (${counts_by_priorities.normal + counts_by_priorities.high})`
            },
            {
                src: priority_icon_low,
                alt: "low priority icon",
                text: `Low+ (${counts_by_priorities.low + counts_by_priorities.normal + counts_by_priorities.high})`
            },
        ]
    }, {
        header: 'Projects',
        content: [
            {
                src: project_icon, alt: "project icon", text: `Complete Odin Project`
            },
        ]
    }]

    const element = document.createElement("div");
    element.id = "sidebar";
    for (const block of content) {
        const blockElem = document.createElement("div");
        if (block.header != null) {
            const header = document.createElement("h1");
            header.innerText = block.header;
            blockElem.appendChild(header);
        }

        for (const tab of block.content) {
            const tabElem = document.createElement("div");
            tabElem.classList.add("tab");

            const icon = document.createElement("img");
            icon.src = tab.src;
            icon.alt = tab.alt;
            tabElem.appendChild(icon);
            const text = document.createElement("span");
            text.innerText = tab.text;
            tabElem.appendChild(text);

            blockElem.appendChild(tabElem);
        }
        element.appendChild(blockElem);
    }
    return element;
}
