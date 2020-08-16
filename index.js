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

function hoursWorkedOnDate(timeCard, workDay){
    let [date, hour] = workDay.split(' ')
    let timeIn = timeCard.timeInEvents.valueOf(date)
    let timeOut = timeCard.timeOutEvents.valueOf(date)
    return timeOut.hour - timeIn.hour

    
}

// if (timeCard.timeInEvents.date === date && timeCard.timeOutEvents.date === date){
//     return timeCard.timeOutEvents.hour - timeCard.timeInEvents.hour 
// }

//find the hour worker came in on the date given
//find the hour worker came out on the date given
//subtract the two to get the hours worked