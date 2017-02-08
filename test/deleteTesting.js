const chai = require('chai')
const assert = chai.assert

let request = require('request')

let options = {
  method: 'DELETE',
  url: 'http://localhost:3000/delete/4',
  headers:
  {
    'postman-token': '6723e19e-68ef-3a29-51db-93a39ab5b55e',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded'
  }
}

describe('When delete request is sent through delete method', function () {
  it('should display successful delete message', function (done) {
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      assert.equal(body, 'Successfuly deleted')
      done()
    })
  })
})
