var fs = require('fs')

function updateFile (filePath, lineNumber, data, callback) {
  var isValid = false
  const bufferObject = fs.readFileSync(filePath)
  const fileContentsArray = bufferObject.toString().split('\n')
  console.log(lineNumber)
  console.log(fileContentsArray.length)
  console.log(data)
  if (lineNumber > fileContentsArray.length) {
    isValid = false
  } else {
    fileContentsArray[lineNumber] = data
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

module.exports = updateFile
