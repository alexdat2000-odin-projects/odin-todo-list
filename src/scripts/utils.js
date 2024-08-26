import {format} from "date-fns";

export const MS_IN_DAY = 24 * 60 * 60 * 1000;

export function format_date_to_render(date) {
    const date_now = get_current_day();
    if (date === date_now) {
        return "Today";
    } else if (date_now + 1 === date) {
        return "Tomorrow";
    } else if (date === -1) {
        return "No due date";
    } else {
        return format(date * MS_IN_DAY, "dd LLL yyyy");
    }
}

export function format_date_to_set_value(date) {
    if (date === -1) {
        return "";
    } else {
        return format(date * MS_IN_DAY, "yyyy-MM-dd");
    }
}

export function get_current_day() {
    return Math.floor(Date.now() / MS_IN_DAY);
}
