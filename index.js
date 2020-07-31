// Your code here
function createEmployeeRecord(arr) {
    return {
        "firstName": arr[0],
        "familyName": arr[1],
        "title": arr[2],
        "payPerHour": arr[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(function(e) {
        return createEmployeeRecord(e)
    })
}

function createTimeInEvent(obj, time) {
    let timeStamp = {
        "type": "TimeIn",
        "hour": parseInt(time.split(" ")[1]),
        "date": time.split(" ")[0]
    }
    obj.timeInEvents.push(timeStamp)
    return obj
}

function createTimeOutEvent(obj, time) {
    let timeStamp = {
        "type": "TimeOut",
        "hour": parseInt(time.split(" ")[1]),
        "date": time.split(" ")[0]
    }
    obj.timeOutEvents.push(timeStamp)
    return obj
}

function hoursWorkedOnDate(obj, day) {
    let timeIn = obj.timeInEvents.find(function(e){
        return e.date === day
    }).hour
    let timeOut = obj.timeOutEvents.find(function(e){
        return e.date === day
    }).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(obj, day) {
    return hoursWorkedOnDate(obj, day) * obj.payPerHour
}

function allWagesFor(obj) {
    let workDays = obj.timeInEvents.map(function(e) {
        return e.date
    })
    let hours = workDays.map(function(e) {
        return hoursWorkedOnDate(obj, e)
    })
    let totalHours = hours.reduce(function(total, e) {
        return total + e
    })
    return totalHours * obj.payPerHour
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(function(obj) {
        return obj.firstName === name
    })
}

function calculatePayroll(arr) {
    let allWages = arr.map(allWagesFor)
    return allWages.reduce(function(total, e) {
        return total + e
    })
}