let entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
let todos = []
function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
let flag
let idMap = []
function enableText(obj) {
  obj.readOnly = ""
  obj.style.border = '1px solid black'
  obj.style.boxShadow = 'inset 0 0 3px #878787'
  obj.style.outline = 'none'
  let id = parseInt(obj.id)
  let chk = document.getElementById(`${id}-chk`)
  let btn = document.getElementById(`${id}-btn`)
  chk.style.visibility = 'hidden'
  btn.style.visibility = 'hidden'
}
function renderHtml(todos) {
  let htmlString = ''
  todos.forEach((task) => {
    htmlString += addToHtml(task)
  })
  return htmlString
}
function addToHtml(task) {
  let checked = task.status == true ? 'checked' : null
  let string = `<tr class="border-bottom" id='${task.id}-desc-status'>
        <td>
        <input type="checkbox" id="${task.id}-chk" class = "toggle" value="${task.status}" onchange="updateStatus(${task.id})" ${checked}>
        </td>
        <td>
        <input class="desc-design ${checked ? 'striked' : ''} " type='text' id='${task.id}-desc' value='${task.description}'  readonly="true" ondblclick="enableText(this)" onfocusout='updateList(${task.id})' ></input>
        </td>
        <td>
        <button class="btn" id="${task.id}-btn" type="button" onclick="deleteTask
        (${task.id})">×</button>
        </td>
        </tr>`
  return string
}
function istrue(obj) {
  return (obj.status == true)
}
function checkflag() {
  console.log(todos.length)
  if (flag === 0) {
    filterAll()
  } else if (flag === 1) {
    filterActive()
  } else {
    filterCompleted()
  }
}
function outputList() {
  return fetch('/read', { method: 'get' })
    .then(function (response) {
      return response.json()
    })
    .then((tasks) => {
      flag = 0
      const listElement = document.getElementById('taskTable')
      listElement.innerHTML = ''
      tasks.forEach((task, index) => {
        todos[index] = {
          id: task.id,
          description: task.description,
          status: task.status
        }
        let id = escapeHtml(index + 1)
        let desc = escapeHtml(task.description)
        let status = escapeHtml(task.status)
        let checked = task.status == true ? 'checked' : null
        idMap[index] = task.id
      })
      if (todos.length === 0)
        document.getElementsByClassName('footer')[0].style.visibility = 'hidden';
      //console.log(todos)
      checkflag()
      updateCount()
    })
    .catch(function (err) {
      console.log(err)
    })
}
document.getElementById('data').onkeydown = function (e) {
  if (e.keyCode === 13) {
    let description = document.getElementById('data').value
    let status = false
    fetch(`/write/${description}`, { method: 'post' })
      .then((response) => {
        return response.json()
      })
      .then((text) => {
        id = text[0].id
        let objLength = todos.length
        let obj = { id, description, status }
        //   todos[objLength] = obj
        todos.push(obj)
        console.log(todos)
        checkflag()
        updateCount()
        if (todos.length > 0)
          document.getElementsByClassName('footer')[0].style.visibility = 'visible';
      })
      .catch(function (err) {
        console.log(err)
      })
    document.getElementById('data').value = ''
  }
}
function deleteTask(id) {
  let listElement = document.getElementById(`${id}-desc-status`)
  let description = document.getElementById(`${id}-desc`).value
  let statusBool = document.getElementById(`${id}-chk`).value
  let taskObj = {
    id, description, status: statusBool
  }
  fetch(`/destroy/${id}`, { method: 'delete' })
    .then(() => {
      let delId
      todos.forEach((todo, index) => {
        if (todo.id === id) {
          delId = index
        }
      })
      console.log(delId + 'jhghjghjghjjhjh')
      todos.splice(delId, 1)
      console.log(todos)
      if (todos.length === 0)
        document.getElementsByClassName('footer')[0].style.visibility = 'hidden';
      updateCount()
      checkCompleted()
      listElement.parentNode.removeChild(listElement)
    })
    .catch(function (err) {
      console.log(err)
    })
}
function updateList(id) {
  let listElement = document.getElementById(`${id}-desc-status`)
  let description = document.getElementById(`${id}-desc`).value
  let statusBool = document.getElementById(`${id}-chk`).value
  let index = todos.findIndex(x => x.id === id)
  let checked = status == true ? 'checked' : null
  let taskObj = {
    id, description, status: statusBool
  }
  console.log(index)
  let data = {
    description: description,
  }
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(() => {
      todos[index].description = description
      checkflag()
      updateCount()
    })
    .catch(function (err) {
      console.log(err)
    })
}
function updateStatus(id) {
  let listElement = document.getElementById(`${id}-desc-status`)
  let listTable = document.getElementById('taskTable')
  let description = document.getElementById(`${id}-desc`).value
  let status = document.getElementById(`${id}-chk`).value
  status = (status == 'false') ? true : false
  let checked = status == true ? 'checked' : null
  let index = todos.findIndex(x => x.id == id)
  let taskObj = {
    id, description, status
  }
  todos[index].status = status
  todos[index].description = description
  let data = {
    status: status
  }
  fetch(`/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(() => {
      listElement.innerHTML = addToHtml(taskObj)
      updateCount()
      switch (flag) {
        case 0: {
          checkCompleted()
          listTable.innerHTML = renderHtml(todos)
          break;
        }
        case 1: {
          let listElement = document.getElementById('taskTable')
          listElement.innerHTML = ''
          let activeTodos = todos.filter(isActive)
          checkCompleted()
          listElement.innerHTML = renderHtml(activeTodos)
          break;
        }
        case 2: {
          let listElement = document.getElementById('taskTable')
          listElement.innerHTML = ''
          let completedTodos = todos.filter(isCompleted)
          checkCompleted()
          listElement.innerHTML = renderHtml(completedTodos)
          break;
        }
          defualt: { }
      }
    })
    .catch(function (err) {
      console.log(err)
    })
}
function updateCount() {
  let activeTodos = todos.filter(isActive)
  document.getElementById('count-items').innerHTML = `${activeTodos.length} items`
}
function updateAll() {
  let statusAll
  let listElement = document.getElementById('taskTable')
  statusAll = todos.every(istrue)
  if (statusAll == true) {
    statusAll = false;
    todos.forEach((element) => {
      element.status = false;
    })
  }
  else {
    statusAll = true;
    todos.forEach((element) => {
      element.status = true;
    })
  }
  fetch(`updateAll/${statusAll}`, {
    method: 'put',
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(() => {
      listElement.innerHTML = ''
      checkflag()
      checkCompleted()
    }
    )
}
function filterAll() {
  flag = 0
  let listElement = document.getElementById('taskTable')
  listElement.innerHTML = ''
  checkCompleted()
  listElement.innerHTML = renderHtml(todos)
  document.getElementById('all').className = "selected";
  document.getElementById('active').className = "";
  document.getElementById('completed').className = "";
  updateCount()
}
function isActive(obj) {
  return obj.status == false;
}
function isCompleted(obj) {
  return obj.status == true;
}
function filterActive() {
  flag = 1
  let listElement = document.getElementById('taskTable')
  listElement.innerHTML = ''
  let activeTodos = todos.filter(isActive)
  document.getElementById('all').className = "";
  document.getElementById('active').className = "selected";
  document.getElementById('completed').className = "";
  checkCompleted()
  listElement.innerHTML = renderHtml(activeTodos)
  updateCount()
}
function filterCompleted() {
  flag = 2
  let listElement = document.getElementById('taskTable')
  listElement.innerHTML = ''
  let completedTodos = todos.filter(isCompleted)
  checkCompleted()
  listElement.innerHTML = renderHtml(completedTodos)
  console.log(completedTodos)
  document.getElementById('all').className = "";
  document.getElementById('active').className = "";
  document.getElementById('completed').className = "selected";
  updateCount()
}
function clearAll() {
  fetch(`/destroyAll`, { method: 'delete' })
    .then(() => {
      var updatedTodos = []
      todos.forEach((element) => {
        if (element.status === false)
          updatedTodos.push(element)
      })
      todos = updatedTodos
      if (todos.length === 0)
        document.getElementsByClassName('footer')[0].style.visibility = 'hidden';
      checkflag()
      updateCount()
    })
    .catch((err) => console.log(err))
}
function checkCompleted() {
  let check = false
  todos.forEach((obj) => {
    if (obj.status === true) {
      check = true
    }
  })
  if (check) {
    document.getElementById('button-clear').style.visibility = 'visible'
  } else {
    document.getElementById('button-clear').style.visibility = 'hidden'
  }
  return
}