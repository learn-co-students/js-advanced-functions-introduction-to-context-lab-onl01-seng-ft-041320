// Your code here
function createEmployeeRecord(array) {
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(arrayOfArrays){
    const employeeRecords = arrayOfArrays.map(createEmployeeRecord)
    return employeeRecords
}

function createTimeInEvent(employeeRecord, dateTime){
    let splitDate = dateTime.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(splitDate[1]),
        date: splitDate[0]
    })

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTime){
    let splitDate = dateTime.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(splitDate[1]),
        date: splitDate[0]
    })

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let timeIn = employeeRecord.timeInEvents.find(timeIn => timeIn.date === date)
    let timeOut = employeeRecord.timeOutEvents.find(timeIn => timeIn.date === date)

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date){
    let hours = hoursWorkedOnDate(employeeRecord, date)
    return hours * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    let dates = employeeRecord.timeInEvents.map(timeInEvent => timeInEvent.date)
    return dates.reduce(function(memo, date){
        return memo += wagesEarnedOnDate(employeeRecord, date)
    }, 0)
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce(function(memo, employeeRecord){
        return memo += allWagesFor(employeeRecord)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => employee.firstName === firstName)
}