var fs = require('fs')

function deleteLineOfFile (filePath, lineNumber, callback) {
  var isValid = false
  const bufferObject = fs.readFileSync(filePath)
  const fileContentsArray = bufferObject.toString().split('\n')
  console.log(lineNumber)
  console.log(fileContentsArray.length)
  if (lineNumber > fileContentsArray.length) {
    isValid = false
    callback(isValid)
  } else {
    fileContentsArray.splice(lineNumber, 1)
    const fileContents = fileContentsArray.join('\n').toString()
    fs.writeFile(filePath, fileContents, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('File successfully updated')
        isValid = true
        callback(isValid)
      }
    })
  }
}

module.exports = deleteLineOfFile
