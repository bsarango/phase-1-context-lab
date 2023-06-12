/* Your Code Here */
const createEmployeeRecord = function(employeeData){
    
    
    const employeeRecord = {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: parseInt(employeeData[3],10),
        timeInEvents: [],
        timeOutEvents: [],
    }
    
    return employeeRecord
}


const createEmployeeRecords = function (multipleEmployeesData){
    return multipleEmployeesData.map(createEmployeeRecord)
}  

function createTimeInEvent(dateStamp){      //change this to work for .this!!!
   // console.log(dateStamp)
    const splitTimeInStamp = dateStamp.split(" ")
    //console.log(splitTimeInStamp)
    const timeInObj = {
        type: "TimeIn",
        hour: parseInt(splitTimeInStamp[1],10), 
        date: splitTimeInStamp[0]
    }
    //console.log({timeInObj})
    this.timeInEvents.push(timeInObj)
    return this
}

//createTimeInEvent("05-04-1997 0800")

function createTimeOutEvent (dateStamp){
    //console.log(dateStamp)
    const splitTimeOutStamp = dateStamp.split(" ")
    //console.log(splitTimeOutStamp)
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(splitTimeOutStamp[1],10), 
        date: splitTimeOutStamp[0]
    })
    return this
}

//console.log(createTimeOutEvent("05-04-1997 0800"))

function hoursWorkedOnDate(dateWorked){
    const clockIn = this.timeInEvents.find((timeInEvent)=>timeInEvent.date === dateWorked).hour
    //console.log(clockIn)
    const clockOut = this.timeOutEvents.find((timeInEvent)=>timeInEvent.date === dateWorked).hour
    //console.log(clockOut)
    return (clockOut - clockIn) / 100
}

//hoursWorkedOnDate("05-04-1997")

function wagesEarnedOnDate(date){
    return this.payPerHour * hoursWorkedOnDate.call(this,date)
}

function findEmployeeByFirstName(allEmployeeRecords, nameYouWant){
    return (allEmployeeRecords.find((employeeRecord)=>employeeRecord.firstName===nameYouWant)) 
}

function calculatePayroll(allEmployeeRecords){
    return allEmployeeRecords.reduce(((accu,employeeRecord)=>{      //for reduce, an accumulator variable must be at the start followed by intial value(can be whatever type of data variable) and then value to initialize value
        return accu + allWagesFor.call(employeeRecord)      //You have to return the value of the call back function and add it to the accumulator for the value to increase
    }),0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

