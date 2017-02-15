function render (currentTasks) {
  row = ''
  let checked
  currentTasks.forEach((obj) => {
    if (obj.status === true) {
      checked = 'checked'
    } else {
      checked = null
    }
    row += `<li id="${obj.id}" onmouseover="showDelete(${obj.id})" onmouseout="hideDelete(${obj.id})"><input class="check-status" type="checkbox" id=status${obj.id} ${checked} onclick="updateStatus(${obj.id})"><input type="text" value="${obj.description}" class="update-description ${checked ? 'striked' : ''}" id=text${obj.id} ondblclick="enableText(${obj.id})" onfocusout="updateDescription(${obj.id})" readOnly="true"><button class="delete" id=delete${obj.id} onclick="deleteFile(${obj.id})" style="visibility:hidden;">×</button></li>`
  })
  document.getElementById('read').innerHTML = null
  document.getElementById('read').innerHTML = row
  document.getElementById('footer-bar').style.display = (allTasks.length > 0) ? 'block' : 'none'
}
