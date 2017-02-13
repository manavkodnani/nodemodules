let row = ''
let allTasks = []
let completedTasks = []
let activeTasks = []
let flag = 0
fetch('/read', {
  method: 'get'
}).then(function (response) {
  response.json().then(function (json) {
    json.forEach((obj, index) => {
      allTasks[index] = obj
    })
    countItems()
    checkFlag()
  })
})
  .catch(function (err) {
    console.log(err)
  })

document.getElementById('description').onkeydown = function (e) {
  if (e.keyCode === 13) {
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
        countItems()
        checkFlag()
      })
    }).catch(function (err) {
      console.log(err)
    })
  }
}

function deleteFile(id) {
  let index1 = allTasks.findIndex(x => x.id === id)
  console.log(index1)
  fetch(`/destroy/${id}`, {
    method: 'delete'
  }).then(function (response) {
    console.log('Before splicing:', allTasks)
    let index = allTasks.findIndex(x => x.id === id)
    console.log('index to delete', index)
    allTasks.splice(index, 1)
    countItems()
    checkFlag()
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
    countItems()
    checkFlag()
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
    countItems()
    checkFlag()
  }).catch(function (err) {
    console.log(err)
  })
}

function countItems() {
  let filteredTasks = allTasks.filter(function (obj) {
    return obj.status === false
  })
  let totalItems = filteredTasks.length
  if (totalItems === 1) {
    document.getElementById('items').innerHTML = `${totalItems} item left`
    return
  }
  document.getElementById('items').innerHTML = `${totalItems} items left`
  return
}

function showDelete(id) {
  const deleteId = 'delete' + id
  document.getElementById(deleteId).style.visibility = 'visible'
}

function hideDelete(id) {
  const deleteId = 'delete' + id
  document.getElementById(deleteId).style.visibility = 'hidden'
}

function checkFlag() {
  if (flag === 0) {
    all()
  } else if (flag === 1) {
    completed()
  } else {
    active()
  }
}

function checkCompleted() {
  let check = false
  allTasks.forEach((obj) => {
    if (obj.status === true) {
      check = true
    }
  })
  if (check) {
    document.getElementById('clearCompleted').style.visibility = 'visible'
  } else {
    document.getElementById('clearCompleted').style.visibility = 'hidden'
  }
  return
}

function all() {
  flag = 0
  checkCompleted()
  render(allTasks)
}

function completed() {
  allTasks.forEach((obj) => {
    if (obj.status === true) {
      completedTasks.push(obj)
    }
  })
  flag = 1
  checkCompleted()
  render(completedTasks)
}

function active() {
  allTasks.forEach((obj) => {
    if (obj.status === false) {
      activeTasks.push(obj)
    }
  })
  flag = 2
  checkCompleted()
  render(activeTasks)
}

function checkAll() {
  if (allTasks.every((task) => (task.status === true))) {
    fetch(`/uncheckAll`, {
      method: 'PUT'
    }).then((response) => {
      console.log(response)
      allTasks.forEach((task) => {
        task.status = false
      })
      countItems()
      checkFlag()
    })
  } else {
    fetch(`/checkAll`, {
      method: 'PUT'
    }).then((response) => {
      console.log(response)
      allTasks.forEach((task) => {
        task.status = true
      })
      countItems()
      checkFlag()
    })
  }
}

function clearCompleted() {
  fetch(`/clearCompleted`, {
    method: 'DELETE'
  }).then((response) => {
    let newTasks = []
    allTasks.forEach((task, index) => {
      if (task.status === false) {
        newTasks.push(task)
      }
    })
    allTasks = newTasks
    countItems()
    checkFlag()
  })
    .catch((response) => {
      console.log(response)
    })
}

document.getElementById('all').addEventListener('click', all)

document.getElementById('completed').addEventListener('click', completed)

document.getElementById('active').addEventListener('click', active)

document.getElementById('updateAll').addEventListener('click', checkAll)

document.getElementById('clearCompleted').addEventListener('click', clearCompleted)

function render(currentTasks) {
  row = ''
  let checked
  currentTasks.forEach((obj) => {
    if (obj.status === true) {
      checked = 'checked'
    } else {
      checked = null
    }
    row += `<li id="${obj.id}" onmouseover="showDelete(${obj.id})" onmouseout="hideDelete(${obj.id})"><input class="check-status" type="checkbox" id=status${obj.id} ${checked} onclick="updateStatus(${obj.id})"><input type="text" value="${obj.description}" class="update-description ${checked ? 'striked' : ''}" id=text${obj.id} onfocusout="updateDescription(${obj.id})"><span class="delete" id=delete${obj.id} onclick="deleteFile(${obj.id})" style="visibility:hidden;">❌</span></li><br>`
  })
  activeTasks = []
  completedTasks = []
  document.getElementById('read').innerHTML = null
  document.getElementById('read').innerHTML = row
  document.getElementById('footer-bar').style.visibility = (allTasks.length > 0) ? 'visible' : 'hidden'
}

