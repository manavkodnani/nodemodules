function readFile() {
  let row = ''
  let option = ''
  fetch('/read', {
    method: 'get'
  }).then(function (response) {
    response.json().then(function (json) {
      let index = 1
      json.forEach((obj) => {
        if (obj.status === true) {
          row += `<li><input type="checkbox" id=${obj.id} checked="true" onclick="updateStatus(id)">${obj.description}   <input type="text" placeholder="Edit Text" id=text${obj.id}><input type='button' id=${obj.id} value="Edit" onclick="updateDescription(id)"><input type='button' id=${obj.id} value="Delete" onclick="deleteFile(id)"></li><br>`
        } else {
          row += `<li><input type="checkbox" id=${obj.id} onclick="updateStatus(id)">${obj.description}   <input type="text" placeholder="Edit Text" id=text${obj.id}><input type='button' id=${obj.id} value="Edit" onclick="updateDescription(id)"><input type='button' id=${obj.id} value="Delete" onclick="deleteFile(id)"></li><br>`
        }
        option += `<option value = ${obj.id}>` + index++ + `</option>`
      })
    }).then(() => {
      document.getElementById('read').innerHTML = row
    })
  }).catch(function (err) {
    console.log(err)
  })
}

document.getElementById("description").onkeydown = function (e) {
  if (e.keyCode === 13) {
    // document.getElementById("add-task").submit()
    // document.getElementById("add-task").method = 'post'
    let description = document.getElementById('description').value
    document.getElementById('description').value = ''
    console.log(description)
    fetch(`/write/${description}`, {
      method: 'post'
    }).then(function (response) {
      readFile()
    }).catch(function (err) {
      console.log(err)
    })
  }
}

function deleteFile(id) {
  fetch(`/destroy/${id}`, {
    method: 'delete'
  }).then(function (response) {
    readFile()
  }).catch(function (err) {
    console.log(err)
  })
}


function updateStatus(id) {
  // alert(id)
  const statusData = document.getElementById(id).checked.toString()
  let data = { status: statusData }
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
}

function updateDescription(id) {
  // alert(id)
  const textId = 'text' + id
  console.log(id)
  const descriptionData = document.getElementById(textId).value
  console.log(descriptionData)
  let data = { description: descriptionData }
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
}

readFile()

