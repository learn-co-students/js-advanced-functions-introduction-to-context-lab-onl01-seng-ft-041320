// Your code here
function createEmployeeRecord(employeeInfoArr) {
    let employeeRecordObj = {
        firstName: employeeInfoArr[0],
        familyName: employeeInfoArr[1],
        title: employeeInfoArr[2],
        payPerHour: employeeInfoArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecordObj
}

function createEmployeeRecords(arrOfEmployeeInfoArr) {
    let result = arrOfEmployeeInfoArr.map(createEmployeeRecord)
    return result
}

function createTimeInEvent(employeeRecordObj, dateStamp) {
    let splitDate = dateStamp.split(' ')

    employeeRecordObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(splitDate[1]),
        date: splitDate[0]
    })

    return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, dateStamp) {
    let splitDate = dateStamp.split(' ')

    employeeRecordObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(splitDate[1]),
        date: splitDate[0]
    })

    return employeeRecordObj
}

function hoursWorkedOnDate(employeeRecordObj, date) {
    let timeIn = employeeRecordObj.timeInEvents.find(time => time.date === date)
    let timeOut = employeeRecordObj.timeOutEvents.find(time => time.date === date)

    return ((timeOut.hour - timeIn.hour) / 100)
}

function wagesEarnedOnDate(employeeRecordObj, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecordObj, date)
    return hoursWorked * parseInt(employeeRecordObj.payPerHour)
}

function allWagesFor(employeeRecordObj) {
    let dates = employeeRecordObj.timeInEvents.map(ele => ele.date)
    return dates.reduce(function (employeeEarnings, date) {
        return employeeEarnings += wagesEarnedOnDate(employeeRecordObj, date)
    }, 0)
} 

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(ele => ele.firstName === firstName)
}

function calculatePayroll(srcArray) {
    return srcArray.reduce(function(payRoll, employeeRecordObj){
        return payRoll += allWagesFor(employeeRecordObj)
    }, 0)
}