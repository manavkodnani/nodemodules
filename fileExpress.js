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
      console.log(result)
      response.json(result)
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
  console.log(description, status)
  operations.update(id, description, status)
    .then(function (result) {
      response.send('Succesfully updated')
    })
    .catch(function (error) {
      response.send('No id is passed')
      console.error(error)
    })
})

app.delete('/destroy/:id', function (request, response) {
  const id = request.params.id
  operations.destroy(id)
    .then(function (result) {
      if (result[1].rowCount === 0) {
        response.send('Cannot delete. Id does not exist')
      } else {
        response.send('Successfully deleted')
      }
    })
  .catch(function (error) {
    console.error(error)
    response.send('Id is not an integer')
  })
})

app.put('/uncheckAll', function (request, response) {
  operations.uncheckAll()
    .then(function (result) {
      response.send(result)
    })
    .catch(function (error) {
      response.sendStatus(500)
      console.error(error)
    })
})

app.put('/checkAll', function (request, response) {
  operations.checkAll()
    .then(function (result) {
      response.send(result)
    })
    .catch(function (error) {
      response.sendStatus(500)
      console.error(error)
    })
})

app.delete('/clearCompleted', function (request, response) {
  operations.clearCompleted()
    .then(function (result) {
      response.send(result)
    })
    .catch(function (error) {
      response.sendStatus(500)
      console.error(error)
    })
})

app.listen(3000, function () {
  console.log('Listening')
})

