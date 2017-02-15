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
function readTasks() {
  return fetch('/read',
    { method: 'get' })
}
function writeTasks(description) {
  if (description) {
    return fetch(`/write/${description}`, {
      method: 'post'
    })
  } else {
    return 'No description passed'
  }
}
function deleteTask(id) {
  return fetch(`/destroy/${id}`, {
    method: 'delete'
  })
}
function updateTask(data, id) {
  if (data.description !== undefined || data.status !== undefined) {
    return fetch(`/update/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } else {
    return 'neither description nor status was passed'
  }
}
function toggleCheckTasks(check) {
  return fetch(check, {
    method: 'PUT'
  })
}
function clearCompletedTasks() {
  return fetch(`/clearCompleted`, {
    method: 'DELETE'
  })
}
