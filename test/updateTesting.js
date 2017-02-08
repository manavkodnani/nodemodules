const chai = require('chai')
const assert = chai.assert

let request = require('request')

let options = {
  method: 'PUT',
  url: 'http://localhost:3000/update/4',
  headers:
  {
    'postman-token': '32642145-02b7-d25b-77a5-04fd223f4242',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded'
  },
  form: { description: 'exercise 1.1' }
}

describe('When update request is sent through put method', function () {
  it('should display successful updated message', function (done) {
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      assert.equal(body, 'Successfuly updated')
      done()
    })
  })
})
