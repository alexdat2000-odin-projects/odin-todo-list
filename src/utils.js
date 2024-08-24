import {format} from "date-fns";

const MS_IN_DAY = 24 * 60 * 60 * 1000;

export function format_date(date) {
    const date_now = get_current_day();
    if (date === date_now) {
        return "Today";
    } else if (date_now + 1 === date) {
        return "Tomorrow";
    } else {
        return format(date * MS_IN_DAY, "dd LLL yyyy");
    }
}

export function get_current_day() {
    return Math.floor(Date.now() / MS_IN_DAY);
}
