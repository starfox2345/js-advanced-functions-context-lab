/* Your Code Here */
function createEmployeeRecord(info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), date
    })
    return this
}

const createTimeOutEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), date
    })
    return this
}
// let hoursWorkedOnDate = function (date) {
//     let timeIn = this.timeInEvents.find(function(day) {
//         return day.date === date
//     })
//     let timeOut = this.timeOutEvents.find(function(day) {
//         return day.date === date 
//     })
//     return (timeOut.hour - timeIn.hour) / 100
// }

let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find((e) => e.date === date)
    let timeOut = this.timeOutEvents.find((e) => e.date === date)   
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function (workDate) {
    let earnings = hoursWorkedOnDate.call(this, workDate) * this.payPerHour
    return parseFloat(earnings.toString())
}

let calculatePayroll = function(employees){
    return employees.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

let findEmployeeByFirstName = function (collection, firstNameString) {
    return collection.find(function(name) {
        return name.firstName === firstNameString
    })
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

