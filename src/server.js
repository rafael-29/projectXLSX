const XLSX = require("xlsx")


const wb = XLSX.readFile("Emps.xlsx");


console.log(wb);