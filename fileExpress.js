const express = require('express')
const app = express()
const readFile = require('./readSampleFile')
const writeFile = require('./writeSampleFile')
const updateFile = require('./updateSampleFile')
const deleteLineOfFile = require('./deleteLineOfFile')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.send('Hello World')
})

app.get('/read', function (request, response) {
  let lines = readFile('./sample.txt')
  lines = lines.split('\n')
  response.render('read', { items: lines })
})

app.post('/write', function (request, response) {
  const textInput = request.body.data
  writeFile('./sample.txt', '\n' + textInput, () => {
    response.redirect('/read')
  })
})

app.post('/update', function (request, response) {
  const lineNumber = request.body.lineNumber
  const data = request.body.data
  var isValid
  updateFile('./sample.txt', lineNumber, data, (bool) => {
    isValid = bool
    if (!isValid) {
      response.sendStatus(500)
    } else {
      console.log('File updated')
      response.redirect('/read')
    }
  })
})

app.post('/destroy', function (request, response) {
  const lineNumber = request.body.lineNumber
  var isValid
  deleteLineOfFile('./sample.txt', lineNumber, (bool) => {
    isValid = bool
    if (!isValid) {
      response.sendStatus(500)
    } else {
      console.log('Line deleted')
      response.redirect('/read')
    }
  })
})

app.listen(3000, function () {
  console.log('Listening')
})


