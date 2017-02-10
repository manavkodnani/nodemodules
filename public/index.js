let row = ''
let allTasks = []
fetch('/read', {
  method: 'get'
}).then(function (response) {
  response.json().then(function (json) {
    json.forEach((obj, index) => {
      allTasks[index] = obj
    })
    render()
  })
})
  .catch(function (err) {
    console.log(err)
  })

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
      console.log(response)
      response.json().then(function (json) {
        allTasks.push({ id: json[0].id, description, status: false })
        console.log(allTasks)
        render()
      })
    }).catch(function (err) {
      console.log(err)
    })
  }
}

function deleteFile(id) {
  console.log(id+"         ijhiuhiuhi")
  let index1 = allTasks.findIndex(x => x.id === id)
  console.log(index1)
  fetch(`/destroy/${id}`, {
    method: 'delete'
  }).then(function (response) {
    console.log("Before splicing:", allTasks)
    let index = allTasks.findIndex(x => x.id === id)
    console.log('index to delete', index)
    allTasks.splice(index, 1)
    render()
  }).catch(function (err) {
    console.log(err)
  })
}


function updateStatus(id) {
  // alert(id)
  console.log(id)
  const statusId = 'status' + id
  let statusData = document.getElementById(statusId).checked.toString()
  console.log(statusData)
  let data = { status: statusData }
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    let index = allTasks.findIndex(x => x.id === id)
    console.log(index)
    statusData = (statusData === 'true')
    allTasks[index].status = statusData
    console.log(allTasks[index])
    render()
  }).catch(function (err) {
    console.log(err)
  })
}

function updateDescription(id) {
  // alert(id)
  console.log(id)
  const textID = 'text' + id
  const descriptionData = document.getElementById(textID).value
  console.log(descriptionData)
  let data = { description: descriptionData }
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    let index = allTasks.findIndex(x => x.id === id)
    allTasks[index].description = descriptionData
    render()
  }).catch(function (err) {
    console.log(err)
  })
}

function render() {
  console.log("rendering")
  console.log(allTasks)
  row = ''
  allTasks.forEach((obj) => {
    let checked = obj.status === true ? 'checked' : null
    row += `<li id="${obj.id}"><input class="check-status" type="checkbox" id=status${obj.id} ${checked} onclick="updateStatus(${obj.id})"><input type="text" value="${obj.description}" class="update-description ${checked ? 'striked' : ''}" id=text${obj.id} onfocusout="updateDescription(${obj.id})"><span class="delete" id=${obj.id} onclick="deleteFile(${obj.id})">❌</span></li><br>`
  })
  document.getElementById('read').innerHTML = null
  document.getElementById('read').innerHTML = row
}

