
// `createEmployeeRecord`
    // Arguments
        // 4 element array of [ string, string, string, and number]
            // first name, family name, title, and pay rate per hour
let createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
    // Returns
        // JavaScript `Object` with keys :
            // `firstName`
            // `familyName`
            // `title`
            // `payPerHour`
            // `timeInEvents`
            // `timeOutEvents`
    
    // Behavior
        // Loads `Array` elements into corresponding `Object` properties. Additionally, initialize empty `Array`s on the properties `timeInEvents` and `timeOutEvents`


// `createEmployeeRecords`
    // Arguments
        // `Array` of `Arrays`
let createEmployeeRecords = function(arrayOfEmployees) {
    return arrayOfEmployees.map(function(array) {
        return createEmployeeRecord(array)
    })
}
    // Returns
        // `Array` of `Object`s

    // Behavior
        // Converts each nested `Array` into an employee record using `createEmployeeRecord` and accumulates it to a new `Array`


// `createTimeInEvent`
    // Arguments
        // An employee record `Object`
        // A data stamp (`YYYY-MM-DD HHMM`)
let createTimeInEvent = function(employee, dateStamp) {
    let [date, time] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(time, 10),
        date, 
    })
    // Returns
        // The employee record
        return employee 
}

    // Behavior
        // Add an `Object` with keys to the `timeInEvents` `Array` on the record `Object` :
        // `type` : Set to `'TimeIn'`
        // `hour` : Derived from the argument
        // `date` : Derived from the argument


// `createTimeOutEvent`
    // Arguments
        // An employee record `Object`
        // A date stamp (`YYYY-MM-DD HHMM`)
let createTimeOutEvent = function(employee, dateStamp) {
    let [date, time] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(time, 10),
        date,
    })
    // Returns
    // The employee record
    return employee 
}

    // Behavior
        // Add an `Object` with keys to the `timeOutEvents` `Array` on the record `Object` :
        // `type` : Set to `'TimeOut'`
        // `hour` : Derived from the argument
        // 1date` : Derived from the argument


// `hoursWorkedOnDate`
    // Arguments
        // An employee record `Object`
        // A date of the form `'YYYY-MM-DD'`
let hoursWorkedOnDate = function(employee, dateStamp) {
    let startTime = employee.timeInEvents.find(function(e) {
        return e.date === dateStamp
    })
    let endTime = employee.timeOutEvents.find(function(e) {
        return e.date === dateStamp 
    })
    // Returns
    // Hours worked, an `Integer`
    return (endTime.hour - startTime.hour) / 100
}

    // Behavior
        // Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent


// 'wagesEarnedOnDate`
    // Arguments
        // An employee record `Object`
        // A date of the form `YYYY-MM-DD`
let wagesEarnedOnDate = function(employee, dateStamp) {
    let hoursWorked = hoursWorkedOnDate(employee, dateStamp)
    let moneyMade = hoursWorked * employee.payPerHour
    return moneyMade 
}
    // Returns
        // Pay owed

    // Behavior
        // Using `hoursWorkedOnDate` multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number


// `allWagesFor`
    // Arguments
        // An employee record `Object`
let allWagesFor = function(employee) {
    let availableDates = employee.timeInEvents.map(function(e) {
        return e.date 
    })
    let pay = availableDates.reduce(function(memo, days) {
        return memo + wagesEarnedOnDate(employee, days)
    }, 0)
    // Returns
    // Pay owed for all dates
    return pay 
}

    // Behavior
        // Using `wagesEarnedOnDate` accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
        //HINT - you will need to find the available dates somehow


// findEmployeeByFirstName`
    // Arguments
        // `srcArray` : Array of employee records
        // `firstName` : String representing a first name held in an employee record
let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(employee) {
        return employee.firstName === firstName 
    })
}
    // Returns
        // Matching record or `undefined`

    // Behavior
        // Test the `firstName` field for a match with the `firstName` argument


// `calculatePayroll`
    // Arguments
        // `Array` of employee records
let calculatePayroll = function(array) {
    return array.reduce(function(memo, employee) {
        return memo + allWagesFor(employee)
    }, 0)
}
    // Returns
        // Sum of pay owed to all employees for all dates, as a number

    // Behavior
        // Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number
