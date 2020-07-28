// Your code here

let createEmployeeRecord = function(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees) {
    return employees.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}

let createTimeInEvent = function(employee, date) {
    let dateTimeSplitter = date.split(' ')
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateTimeSplitter[1]),
        date: dateTimeSplitter[0]
    })
    return employee
}

let createTimeOutEvent = function (employee, date) {
    let dateTimeSplitter = date.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateTimeSplitter[1]),
        date: dateTimeSplitter[0]
    })
    return employee
}

let hoursWorkedOnDate = function(employee, date) {
    let inD = employee.timeInEvents.find(function(e){
        return e.date === date
    })
    let outD = employee.timeOutEvents.find(function(e) {
        return e.date === date
    })
    return (outD.hour - inD.hour) / 100
}

// skipping the rest for now