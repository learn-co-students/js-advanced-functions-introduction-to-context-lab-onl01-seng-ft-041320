// Your code here
function createEmployeeRecord(employeeInfo){
  let employeeRecord = {
    firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
  }
  return employeeRecord
}

function createEmployeeRecords(arrayOfEmployees){
  let employeeRecords = arrayOfEmployees.map(createEmployeeRecord)
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
  let timeIn = employeeRecord.timeInEvents.find(time => time.date === date)
  let timeOut = employeeRecord.timeOutEvents.find(time => time.date === date)

  return ((timeOut.hour - timeIn.hour)/100)
}

function wagesEarnedOnDate(employeeRecord, date){
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
  let dates = employeeRecord.timeInEvents.map(i => i.date)
  return dates.reduce(function(employeeEarnings, date){
    return employeeEarnings += wagesEarnedOnDate(employeeRecord, date)
  }, 0)
}

function calculatePayroll(employeeRecords){
  return employeeRecords.reduce(function(payroll, employeeRecord){
    return payroll += allWagesFor(employeeRecord)
}, 0)
}

function findEmployeeByFirstName(employees, firstName){
  return employees.find(employee => employee.firstName === firstName)
}