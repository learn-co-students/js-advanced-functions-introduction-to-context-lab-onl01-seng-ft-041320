function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord)
}

function createTimeInEvent(employee, time) {
    let splitTime = time.split(' ')
    employee.timeInEvents.push({
        type: 'TimeIn',
        date: splitTime[0], 
        hour: parseInt(splitTime[1])
    });
    return employee;
}

function createTimeOutEvent(employee, time) {
    let splitTime = time.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        date: splitTime[0], 
        hour: parseInt(splitTime[1])
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(obj => obj.date === date).hour 
    const timeOut = employee.timeOutEvents.find(obj => obj.date === date).hour 
    return (timeOut - timeIn)/100;
}

function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce(function(total, obj) {
        return total + wagesEarnedOnDate(employee, obj.date)
    }, 0)
}

function calculatePayroll(arr) {
    return arr.reduce(function(total, employee) {
        return total + allWagesFor(employee);
    }, 0)
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName === name)
}