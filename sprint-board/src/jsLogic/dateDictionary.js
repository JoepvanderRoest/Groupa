function getWeekNumber(date){
    const startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date - startDate) /
        (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(days / 7);
    return weekNumber
}

function getSprintNumber(date){
    const startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date - startDate) /
        (24 * 60 * 60 * 1000));
    var sprintnumber = Math.ceil(Math.ceil(days / 7) / 2);
    return sprintnumber
}


export function dateDictionary(years){
    const dateBook = {}
    const date = new Date()
    const range = years * 365
    let CurrentSprint = 0
    for (var i = 0; i < range; i++) {
        if(date == new Date()){
            CurrentSprint = 1
        }else{CurrentSprint = 0}
    let key = date.getFullYear() + "-" + date.getMonth() + "-" +  date.getDate()
    let dateDic = {
    "day" : date.getDate(),
    "weeknumber" : getWeekNumber(date),
    "month" : date.getMonth(),
    "year" : date.getFullYear(),
    "sprintNo" : getSprintNumber(date),
    "sprintNumber" : date.getFullYear() + "-" + getSprintNumber(date),
    "currentSprint" : CurrentSprint,
    "date" : date.getFullYear() + "-" + date.getMonth() + "-" +  date.getDate()
    }

    dateBook[key] = dateDic

    date.setDate(date.getDate() + 1)
    };

    return dateBook
}
