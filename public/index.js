function readFile() {
  let row = ''
  let option = ''
  fetch('/read', {
    method: 'get'
  }).then(function (response) {
    response.json().then(function (json) {
      let index = 1
      json.forEach((obj) => {
        row += '<input type="checkbox"> <li>' + obj.description + '    ' + obj.status + '</li>'
        option += `<option value = ${obj.id}>` + index++ + `</option>`
      })
    }).then(() => {
      document.getElementById('read').innerHTML = row
      document.getElementById('lineID').innerHTML = option
    })
  }).catch(function (err) {
    console.log(err)
  })
}

document.getElementById("writeFile").addEventListener("click",
  function () {
    let description = document.getElementById('description').value
    console.log(description)
    fetch(`/write/${description}`, {
      method: 'post'
    }).then(function (response) {
      readFile()
    }).catch(function (err) {
      console.log(err)
    })
  })

document.getElementById("deleteFile").addEventListener("click",
  function () {
    let id = document.getElementById('lineID').value
    fetch(`/destroy/${id}`, {
      method: 'delete'
    }).then(function (response) {
      readFile()
    }).catch(function (err) {
      console.log(err)
    })
  })

document.getElementById("updateFile").addEventListener("click",
  function () {
    let descriptionData = document.getElementById('descriptionUpdate').value
    let id = document.getElementById('lineID').value
    let statusData = document.getElementById('status').value
    console.log(id, descriptionData, statusData)
    let data = { description: descriptionData, status: statusData }
    console.log(data)
    fetch(`/update/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      readFile()
    }).catch(function (err) {
      console.log(err)
    })
  })

readFile()

