let row = ''
let allTasks = []
let completedTasks = []
let activeTasks = []
let flag = 0
readTasks().then(function (response) {
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
    writeTasks(description).then(function (response) {
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
  deleteTask(id).then(function (response) {
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
  updateTask(data, id).then(function (response) {
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
  if (descriptionData === '') {
    deleteFile(id)
  }
  console.log(descriptionData)
  let data = { description: descriptionData }
  updateTask(data, id).then(function (response) {
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
  document.getElementById('all').className = 'selected'
  document.getElementById('active').className = ''
  document.getElementById('completed').className = ''
  checkCompleted()
  render(allTasks)
}

function completed() {
  completedTasks = []
  allTasks.forEach((obj) => {
    if (obj.status === true) {
      completedTasks.push(obj)
    }
  })
  flag = 1
  document.getElementById('completed').className = 'selected'
  document.getElementById('all').className = ''
  document.getElementById('active').className = ''
  checkCompleted()
  render(completedTasks)
}

function active() {
  activeTasks = []
  allTasks.forEach((obj) => {
    if (obj.status === false) {
      activeTasks.push(obj)
    }
  })
  flag = 2
  document.getElementById('active').className = 'selected'
  document.getElementById('completed').className = ''
  document.getElementById('all').className = ''
  checkCompleted()
  render(activeTasks)
}

function checkAll() {
  if (allTasks.every((task) => (task.status === true))) {
    toggleCheckTasks(`/uncheckAll`).then((response) => {
      console.log(response)
      allTasks.forEach((task) => {
        task.status = false
      })
      countItems()
      checkFlag()
    })
  } else {
    toggleCheckTasks(`/checkAll`).then((response) => {
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
  clearCompletedTasks().then((response) => {
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

function enableText(id) {
  let textId = 'text' + id
  let input = document.getElementById(textId)
  console.log(input)
  input.readOnly = ''
  input.style.border = '1px solid black'
  input.style.boxShadow = 'inset 0 0 3px #878787'
  input.style.outline = 'none'
  let chk = document.getElementById(`status${id}`)
  let btn = document.getElementById(`delete${id}`)
  chk.style.visibility = 'hidden'
  btn.style.visibility = 'hidden'
}

