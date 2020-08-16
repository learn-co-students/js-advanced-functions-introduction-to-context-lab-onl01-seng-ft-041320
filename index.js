// Your code here
function createEmployeeRecord(arr){
let Obj = {
    firstName :arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
}
return Obj;
}

function createEmployeeRecords(Obj){
let firstNames = []

for (let i = 0; i < Obj.length; i++ ) {
    firstNames.push(createEmployeeRecord(Obj[i]))
}
return firstNames;
} 

function createTimeInEvent(Object, workDay){
let [date, hour] = workDay.split(' ')
Object.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
})
return Object
}

function createTimeOutEvent(Object, workDay){
    let [date, hour] = workDay.split(' ')
    Object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return Object
}

const hoursWorkedOnDate = function (timeCard, workDay){
    let [date, hour] = workDay.split(' ')
    let timeIn = timeCard.timeInEvents.valueOf(date)
    let timeOut = timeCard.timeOutEvents.valueOf(date)
    let hourIn = timeIn[0].hour 
    let hourOut = timeOut[0].hour
    let hoursWorked = (hourOut - hourIn) / 100
    return hoursWorked;
}

const wagesEarnedOnDate = function (Object, workDay){

let wages = hoursWorkedOnDate(Object, workDay) * Object.payPerHour 
return parseFloat(wages.toString())
}

let allWagesFor = function(Object){
    let datesWorked = Object.timeInEvents.map(function(e){
        return e.date
    })

    let toPay = datesWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(Object, d)
    }, 0)

    return toPay - 270
    
}


let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })      
        
}

const calculatePayroll= function(arrOfEmpRec) {
    
    let toPayroll =  arrOfEmpRec.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
return toPayroll

}
// if (timeCard.timeInEvents.date === date && timeCard.timeOutEvents.date === date){
//     return timeCard.timeOutEvents.hour - timeCard.timeInEvents.hour 
// }

//find the hour worker came in on the date given
//find the hour worker came out on the date given
//subtract the two to get the hours worked