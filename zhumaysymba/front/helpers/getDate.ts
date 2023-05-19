export function convertDate(date: Date) {
    const currentDate = new Date(date);
    let day = currentDate.getDate().toString();
    let month = currentDate.getMonth().toString();
    const year = currentDate.getFullYear().toString();

    if (+day < 10) {
        day = "0" + day;
    }

    if (+month < 10) {
        month = "0" + month;
    }

    return day + "." + month + "." + year;
}
