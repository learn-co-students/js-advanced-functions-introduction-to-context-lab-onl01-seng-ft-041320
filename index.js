
// Stretch:
// Raise an error if a timeIn is found without a matching timeOut
// Figure out how to turn a time stamp into a construct that allows for you to handle across day and non-o'clock times
// Raise errors if the time stamp is in an invalid format


function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],  
        title: array[2],  
        payPerHour: array[3],  
        timeInEvents: [],  
        timeOutEvents: []  
    }
}

function createEmployeeRecords(arrays) {
   let employeeRecord = arrays.map(createEmployeeRecord)
   return employeeRecord
}

function createTimeInEvent(employeeRecord, dateStamp){
  let dateTimeSplit = dateStamp.split(' ')

  employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(dateTimeSplit[1]),
      date: dateTimeSplit[0]
  })
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let dateTimeSplit = dateStamp.split(' ')
  
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTimeSplit[1]),
        date: dateTimeSplit[0]
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    // let findInDate = employeeRecord.timeInEvents.find(inDate => inDate.date === date)
    // let findOutDate = employeeRecord.timeOutEvents.find(outDate => outDate.date === date)
    let i1 = employeeRecord.timeInEvents.findIndex(inDate => inDate.date === date)
    let i2 = employeeRecord.timeOutEvents.findIndex(outDate => outDate.date === date)
    let inTime = employeeRecord.timeInEvents[i1]["hour"]
    let outTime = employeeRecord.timeOutEvents[i2]["hour"]
    // let hoursWorked = (findOutDate.hour - findInDate.hour)
    // return hoursWorked/100

    let hoursWorked = (outTime - inTime)
    return hoursWorked/100
}

 function wagesEarnedOnDate(employeeRecord, date) {
    let pay = employeeRecord.payPerHour
    let wage = pay * hoursWorkedOnDate(employeeRecord, date)
    return wage
}

function allWagesFor(employeeRecord, init=0) {
    let allWorkedDates = employeeRecord.timeInEvents.map(event => { 
        return event.date 
    })
    let payableTotal = allWorkedDates.reduce(function(accumulator, currentValue) {
        return accumulator + wagesEarnedOnDate(employeeRecord, currentValue)
    }, init)
    return payableTotal
}

function findEmployeeByFirstName(srcArray, firstName) {
    let findFirstName = srcArray.find(employeeRecord => {
        return employeeRecord.firstName === firstName
    })
    return findFirstName
}

function calculatePayroll(array) {
    let eachEmployeeWages = array.map(employeeRecord => allWagesFor(employeeRecord, 0))
    let total = eachEmployeeWages.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue
    }, + 0)
    return total
}





