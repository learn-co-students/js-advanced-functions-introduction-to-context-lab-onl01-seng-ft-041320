// Your code here
function createEmployeeRecord(info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees){
    return employees.map(createEmployeeRecord)
}

function createTimeInEvent(eRecord, dateTime){
    const dtArr = dateTime.split(" ")
    const timeIn = {date: dtArr[0], hour: parseInt(dtArr[1], 10)}
    timeIn.type = "TimeIn"
    eRecord["timeInEvents"].push(timeIn)
    return eRecord
}

function createTimeOutEvent(eRecord, dateTime){
    const dtArr = dateTime.split(" ")
    const timeOut = {date: dtArr[0], hour: parseInt(dtArr[1], 10)}
    timeOut.type = "TimeOut"
    eRecord["timeOutEvents"].push(timeOut)
    return eRecord
}

function hoursWorkedOnDate(eRecord, date){
    const punchIn = eRecord["timeInEvents"].find(timeIn => timeIn["date"] === date)["hour"]
    const punchOut = eRecord["timeOutEvents"].find(timeOut => timeOut["date"] === date)["hour"]
    return (punchOut - punchIn)/100
}

function wagesEarnedOnDate(eRecord, date){
    return (hoursWorkedOnDate(eRecord, date) * eRecord["payPerHour"])
}

function datesWorked(eRecord){
    return eRecord["timeInEvents"].map(timeIn => timeIn["date"])
}

function allWagesFor(eRecord){
    const dates = datesWorked(eRecord)
    return dates.reduce((total, date) => total += wagesEarnedOnDate(eRecord, date), 0)
}

function calculatePayroll(employees){
    return employees.reduce((total, eRecord) => total += allWagesFor(eRecord), 0)
}

function findEmployeeByFirstName(employees, name){
    return employees.find(employee => employee["firstName"] === name)
}