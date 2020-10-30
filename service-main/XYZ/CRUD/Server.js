
const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

//CRUD OPERATIONS
//GET(Reading), POST(Adding), PUT(Updating), DELETE(Deleting) data....
//we must add cors extension in web-browser


let students = []; //blank array...
let flag = 1;

function readData() {
    const filename = "Database.json"; //new file... 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    students = JSON.parse(jsonContent);
}

function saveData() {
    const filename = "Database.json";
    const jsonData = JSON.stringify(students);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}

app.get("/students", (req, res) => {
    readData();
    res.send(JSON.stringify(students));
})

app.get("/students/:id", (req, res) => {
    const studentid = req.params.id;
    if (students.length == 0) {
        readData();
    }
    let foundRec = students.find((e) => e.studentId == studentid);
    if (foundRec == null)
        throw "Student not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/students", (req, res) => {
    if (students.length == 0)
        readData(); 
        //Fill the array if it is not loaded....
    let body = req.body;
    //checking all the values
    for (let index = 0; index < students.length; index++) {
        let element = students[index];
        //Checking for particular id
        if (element.studentId == body.studentId) {
            element.studentName = body.studentName;
            element.studentCity = body.studentCity;
            element.studentEmail = body.studentEmail;
            element.studentPhone = body.studentPhone;
            saveData();
            res.send("Student updated successfully");
        }
    }
    //update the data
    //exit the function....
})

app.post('/students', (req, res) => {
    if (students.length == 0)
        readData(); 
    let body = req.body; 



    for (let index = 0; index < students.length; index++) {
        let element = students[index];
        //Checking any Student is matching with already existing Student
        if (element.studentName == body.studentName) { 
            res.send("Student name already exists");
            flag = 0;
        }

    }


    if (flag >= 1) {
        students.push(body);
        saveData(); 
        //updating to the JSON file...
        res.send("Student added successfully");
    }

})
app.delete("/students/id", (req, res) => {
    throw "Check properly";
})

app.listen(1234, () => {
    console.log("Server available at 1234");
})