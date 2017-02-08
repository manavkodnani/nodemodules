const chai = require('chai')
const assert = chai.assert

let request = require('request')

let options = {
  method: 'POST',
  url: 'http://localhost:3000/write/exercise%202',
  headers:
  {
    'postman-token': '7ad22434-74ec-e5fe-f520-7b86403f0905',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded'
  }
}

describe('When write request is sent through post method', function () {
  it('should display successful written message', function (done) {
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      assert.equal(body, 'Successfuly written')
      done()
    })
  })
})
