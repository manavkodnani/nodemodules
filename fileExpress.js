const express = require('express')
const app = express()
// const readFile = require('./readSampleFile')
// const writeFile = require('./writeSampleFile')
// const updateFile = require('./updateSampleFile')
// const deleteLineOfFile = require('./deleteLineOfFile')
const bodyParser = require('body-parser')
const operations = require('./add.js')

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('../public/index')
})
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get('/read', function (request, response) {
  operations.read()
    .then(function (result) {
      response.json(result[0])
    })
    .catch(function (error) {
      response.sendStatus(500)
      console.error(error)
    })
})

app.post('/write/:writeContent', function (request, response) {
  const writeContent = request.params.writeContent
  operations.create(writeContent)
    .then(function (result) {
      response.send('Successfuly written')
    })
    .catch(function (error) {
      response.sendStatus(500)
      console.error(error)
    })
})

app.put('/update/:id', function (request, response) {
  const id = request.params.id
  const description = request.body.description
  const status = request.body.status
  operations.update(id, description, status)
    .then(function (result) {
      response.send('Successfuly updated')
    })
    .catch(function (error) {
      response.sendStatus(500)
      console.error(error)
    })
})

app.delete('/destroy/:id', function (request, response) {
  const id = request.params.id
  operations.destroy(id)
    .then(function (result) {
      response.send('Successfuly deleted')
    })
    .catch(function (error) {
      response.sendStatus(500)
      console.error(error)
    })
})


app.listen(3000, function () {
  console.log('Listening')
})


