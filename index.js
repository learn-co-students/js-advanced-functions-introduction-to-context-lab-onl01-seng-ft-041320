// Your code here

function createEmployeeRecord(employeeInfo) {
  return {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employeesProfiles) {
  return employeesProfiles.map(createEmployeeRecord)
}

function createTimeInEvent(employee, timeIn) {
  const date = timeIn.split(" ")[0]
  const hour = parseInt(timeIn.split(" ")[1])
  const event = {type: "TimeIn", date: date, hour: hour}
  employee.timeInEvents.push(event)
  return employee
}

function createTimeOutEvent(employee, timeOut) {
  const date = timeOut.split(" ")[0]
  const hour = parseInt(timeOut.split(" ")[1])
  const event = {type: "TimeOut", date: date, hour: hour}
  employee.timeOutEvents.push(event)
  return employee
}

function hoursWorkedOnDate(employee, workDay) {
  const startShift = employee.timeInEvents.find(e => e.date === workDay)
  const endShift = employee.timeOutEvents.find(e => e.date === workDay)
  return (endShift.hour - startShift.hour)/100
}

function wagesEarnedOnDate(employee, workDay) {
  return hoursWorkedOnDate(employee, workDay) * employee.payPerHour
}

function allWagesFor(employee) {
  let datesWorked = employee.timeInEvents.map(e => {
    return e.date})
  let allWages = datesWorked.reduce(function(memo, workDay) {
          return memo + wagesEarnedOnDate(employee, workDay)
      }, 0)
  return allWages
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(e => e.firstName === firstName) || undefined
}

function calculatePayroll(srcArray,) {
  return srcArray.reduce(function(memo, employee) {
        return memo + allWagesFor(employee)
    }, 0)
  }
