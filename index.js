//Loads Array elements into corresponding 
//Object properties. Additionally, initialize 
//empty Arrays on the properties timeInEvents 
//and timeOutEvents
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

//Converts each nested Array into an employee 
//record using createEmployeeRecord and 
//accumulates it to a new Array
let createEmployeeRecords = function(arr){
    return arr.map(function(row){
        return createEmployeeRecord(row)
    })
}

//Add an Object with keys to the timeInEvents 
//Array on the record Object:
//type: Set to "TimeIn"
//hour: Derived from the argument
//date: Derived from the argument
let createTimeInEvent = function(record,dateStamp){
    let [date, hour] = dateStamp.split(' ')
    record.timeInEvents.push({
       type: "TimeIn",
       hour: parseInt(hour),
       date,
   })
   return record
}

let createTimeOutEvent = function(record,dateStamp){
    let [date, hour] = dateStamp.split(' ')
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date,
    })
    return record
 }

 //Returns Hours worked, an Integer
 //Given a date, find the number of hours elapsed 
 //between that date's timeInEvent and timeOutEvent
 let hoursWorkedOnDate = function(record,dateStamp){
     let inWork = record.timeInEvents.find(function(e){
        return  e.date === dateStamp
     })
     let outWork = record.timeOutEvents.find(function(e){
        return e.date === dateStamp
     })
     return (outWork.hour - inWork.hour)/100
 }
//or
//const inWork = record.timeInEvents.find(time => time.date === date);
//const outWork = record.timeOutEvents.find(time => time.date === date);

 //Using hoursWorkedOnDate, multiply the hours by the 
 //record's payRate to determine amount owed. 
 //Amount should be returned as a number.
 let wagesEarnedOnDate = function(record,dateStamp){
    const hoursWorked = hoursWorkedOnDate(record, dateStamp);
    return hoursWorked * record.payPerHour;
 }

 //Using wagesEarnedOnDate, 
 //accumulate the value of all dates worked 
 //by the employee in the record used as context. 
 //Amount should be returned as a number
 let allWagesFor = function(record){
    let dateWorked = record.timeInEvents.map(function(e){
        return e.date
    })
    let salaryforDates = dateWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(record, d)
    }, 0)
    return salaryforDates
 }

 //or
 //const dateWorked = record.timeOutEvents.map(event => event.date);
 //const salaryforDates = datesWorked.map(date => wagesEarnedOnDate(record, date));
 //return salaryforDates.reduce((memo, value) => value + memo);


//Returns Matching record or undefined
//Test the firstName field for a match with the firstName argument
 let findEmployeeByFirstName = function(srcArray,firstName){
    return srcArray.find(function(record){
        return record.firstName === firstName
      })
 }

 //Returns Sum of pay owed to all employees for all dates, as a number
 //Using wagesEarnedOnDate, accumulate the value of all dates worked 
 //by the employee in the record used as context. 
 //Amount should be returned as a number.
let calculatePayroll = function(employeeRecords){
    return employeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
//or
//const allSalaries = employeeRecords.map(allWagesFor);
//return allSalaries.reduce((memo, value) => value + memo);

