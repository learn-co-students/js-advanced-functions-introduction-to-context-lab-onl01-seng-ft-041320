// Your code here

let srcArray= []

var today = new Date();
var dd = today.getDate();
  if(dd<10)
    {dd='0'+dd;}
var mm = today.getMonth()+1;
  if(mm<10)
      {mm='0'+mm;}
var yyyy = today.getFullYear();
var h = today.getHours();
var m = today.getMinutes();

today = yyyy+'-'+mm+'-'+dd+' '+h+m;

let arr= [firstName, familyName, title, payPerHour]
let records = [];

function createEmployeeRecord(arr){
  let timeInEvents= [];
  let timeOutEvents= [];
  const employee ={
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: timeInEvents,
    timeOutEvents: timeOutEvents};

  return employee
}

function createEmployeeRecords(arrays) {
  let records = [];
  arrays.map(x => records.push(createEmployeeRecord(x)));
  return records
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function hoursWorkedOnDate(employee, date){
  let hoursWorked = '';
  let intime = employee.timeInEvents.find(event => event.date === date);
  let outtime = employee.timeOutEvents.find(event => event.date === date);

  hoursWorked= outtime.hour-intime.hour;

  return hoursWorked/100
}

function wagesEarnedOnDate(employee, date){
  let hours = hoursWorkedOnDate(employee,date);
  let payRate= employee.payPerHour;
  return hours * payRate
}

function allWagesFor (employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

function calculatePayroll(array){
  let wageTotals = array.map(employee => allWagesFor(employee));
  let total = wageTotals.reduce(function(memo, totals){
    return memo + totals}, + 0)
    return total
}

function findEmployeeByFirstName(srcArray, name){
  return srcArray.find(function(src){
    return src.firstName === name
  })
}
