var expect = chai.expect
var should = chai.should()

describe('When the read API is called', function () {
  it('should return succes message when succesfully read operation is done', function (done) {
    readTasks()
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        expect(result instanceof Array).to.equals(true)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe('When update API is called', function () {
  it('should return success message when valid description and status with id are passed', function (done) {
    const data = { status: true, description: 'running' }
    updateTask(data, 134)
      .then((response) => {
        console.log(response)
        return response.text()
      })
      .then((result) => {
        expect(result).to.equals('Succesfully updated')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  it('should return success message only when valid description with id is passed', function (done) {
    const data = { description: 'hiking' }
    updateTask(data, 134)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        expect(result).to.equals('Succesfully updated')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  it('should return success message only when valid status with id is passed', function (done) {
    const data = { status: false }
    updateTask(data, 134)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        expect(result).to.equals('Succesfully updated')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  it('should return error message when nothing is passed for given id', function () {
    const data = {}
    expect(updateTask(data, 134)).to.equals("neither description nor status was passed")

  })
  it('should return false message when no ID is passed', function (done) {
    const data = { description: "hellooooo this is me" }
    updateTask(data)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        expect(result).to.equals('No id is passed')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe('When the checkAll or uncheckAll API is called', function () {
  it('should return success when correctly unchecks all', function (done) {
    toggleCheckTasks(`/unCheckAll`)
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        expect(result[1].rowCount).to.equals(4)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  it('should return success when correctly checks all', function (done) {
    toggleCheckTasks(`/checkAll`)
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        expect(result[1].rowCount).to.equals(4)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe('When write API is called', function () {
  it('should return success message when valid description is passed', function (done) {
    writeTasks('jogging')
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        expect(typeof Number(result.id)).to.equals('number')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  it('should return error message when no description is passed', function () {
    expect(writeTasks()).to.equals('No description passed')
  })
  it('should return error message when nothing is passed', function () {
    expect(writeTasks()).to.equals('No description passed')
  })
})

describe('When the delete API is called', function () {
  it('should return success message for correct ID', function (done) {
    deleteTask(134)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        expect(result).to.equals('Successfully deleted')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should return false message when ID not present', function (done) {
    deleteTask(600)
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        expect(result).to.equals('Cannot delete. Id does not exist')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  it('should return false message when non-integer ID is passed', function (done) {
    deleteTask('abc')
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        expect(result).to.equals('Id is not an integer')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  it('should return false message when no ID is passed', function (done) {
    deleteTask()
      .then((response) => {
        return response.text()
      })
      .then((result) => {
        expect(result).to.equals('Id is not an integer')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe('when the clear Completed API is called', function () {
  it('should return success when correctly deletes all checked', function (done) {
    clearCompletedTasks()
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        expect(result[1].rowCount).to.equals(3)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
