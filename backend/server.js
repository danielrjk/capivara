require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const alunosRoutes = require('./routes/alunos')
const leitorRoutes = require('./routes/leitor')
const professorRoutes = require('./routes/professor')
const turmaRoutes = require('./routes/turma')
var cors = require('cors')

// create express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

/*
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    console.log(req.path, req.method)
    next()
  });

// routes
app.use('/api/alunos', alunosRoutes)
app.use('/api/leitor', leitorRoutes)
app.use('/api/professor', professorRoutes)
app.use('/api/turma', turmaRoutes)

try {
// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listening requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db')
        })
    })
    .catch((error) => {
        console.error(error)
    })
} catch (err) {
    console.log("recebi o erro")
    console.error(err)
}
