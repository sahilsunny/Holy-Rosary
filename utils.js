// utils.js
export function getTodaysMystery() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = new Date().getDay();
    switch (days[dayOfWeek]) {
        case "Monday":
        case "Saturday":
            return "joyful";
        case "Tuesday":
        case "Friday":
            return "sorrowful";
        case "Wednesday":
        case "Sunday":
            return "glorious";
        case "Thursday":
            return "luminous";
        default:
            return "joyful"; // Default case to avoid potential issues
    }
}