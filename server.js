const students = require('./data/students.json')
const professors = require('./data/professors.json')

const express = require('express')

const app = express()

// User logged in:
const currentUser = {
    username: "warren-west",
    fName: "Warren",
    lName: "West",
    email: "warren.west@noroff.no",
    age: 32,
    isMarried: false
}

// User not logged in:
// const currentUser = {}

// Configure our app to use EJS (embedded JavaScript)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') // Where should Express find the views?

// Overwrite the default behavior of the app
// and grab any JSON body attached to a request
app.use(express.json()) // it's a piece of middleware (more on middleware next week)
app.use(express.static('public'))

// #region Middleware
// Using our own middleware functions:
// Note the sequence is important!
// app.use(myFirstMiddleware)
// app.use(mySecondMiddleware)
// app.use(printCountMiddleware)

function myFirstMiddleware(req, res, next) {
    // console.log("myFirstMiddleware() fired!")
    req.count = 1
    next()
}

function mySecondMiddleware(req, res, next) {
    // console.log("mySecondMiddleware() fired!")
    req.count += 1
    next()
}

function printCountMiddleware(req, res, next) {
    // console.log(`Value of count: ${req.count}`)
    next()
}

function isUserLoggedIn(req, res, next) {
    if (currentUser.username === undefined) {
        res.redirect('/')
    }

    next()
}

// #endregion

// #region Endpoints
// GET /
app.get('/', (req, res) => {
    // res.send("Hello world")

    // Serving static HTML:
    // res.sendFile(__dirname + '/public/index.html')

    // Serving dynamic EJS content (with a view engine):
    res.render('index', {
        fName: "Warren",
        lName: "West",
        message: "Welcome to EJS!"
    })
})

app.get('/profile', isUserLoggedIn, (req, res) => {
    res.render('userProfile', { currentUser })
})

// GET /students
app.get('/students', (req, res) => {
    // /students?order=asc&lName=Lennox
    // console.log(req.query)

    const { lName, order } = req.query
    let studentList = [...students]

    if (!lName) {
        // do nothing, move along
    } else {
        studentList = studentList.filter((s) => s.lName === lName)
    }

    if (!order) {
        // do nothing, move along
    } else if (order === "asc") {
        studentList.sort((a, b) => {
            if (a.lName > b.lName) return 1
            else if (a.lName < b.lName) return -1
            else return 0
        })
    } else if (order === "desc") {
        studentList.sort((a, b) => {
            if (a.lName > b.lName) return -1
            else if (a.lName < b.lName) return 1
            else return 0
        })
    }

    // return all students (maybe filtered, maybe ordered)
    res.status(200).json(studentList)
})

// GET /students/5
app.get('/students/:id', (req, res) => {
    console.log(`Student id: ${req.params.id}`)

    const result = students.find((student) => student.id == req.params.id)
    if (!result)
        res.status(404).json({ error: `Error 404, the student with the id ${req.params.id} was not found.` })

    res.status(200).json(result)
})

app.get('/professors', (req, res) => {
    // return all professors
    res.status(200).json(professors)
})

// POST /students
app.post('/students', (req, res) => {
    const { body: newStudent } = req // aliasing the "body" variable with the name "newStudent"
    console.log(newStudent)

    // Maybe there's no data attached to the body
    // We have decided as part of our business rules
    // that fName and lName are required fields, and
    // id and isUndergrad are optional fields
    if (!newStudent.fName || !newStudent.lName) {
        res.status(400).send()
    }

    // add the new student to the student list
    const updatedStudentList = [...students, newStudent]

    // Finally, echo the new student object back to the client 
    res.status(201).json(newStudent)
})

// OTHER HTTP VERBS / METHODS

// Delete
app.delete('/students/:id', (req, res) => {
    console.log(`Deleting student with id: ${req.params.id}`)

    const updatedStudentList = students.filter((s) => s.id !== req.params.id)
})

// Update (PUT)
app.put('/students/:id', (req, res) => {
    console.log(`Updating student details with id: ${req.params.id}`)
})

// #endregion

app.listen(3000)