var fs = require('fs')

function readFile (filePath) {
  if (fs.existsSync(filePath)) {
    const bufferObject = fs.readFileSync(filePath)
    const fileContents = bufferObject.toString()
    return fileContents
  } else {
    return console.log('The file does not exist in the following path')
  }
}
module.exports = readFile

