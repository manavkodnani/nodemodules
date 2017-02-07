var fs = require('fs')

function writeFile (filePath, fileContents, callback) {
  if (fs.existsSync(filePath)) {
    fs.appendFile(filePath, fileContents, (err) => {
      if (err) throw err
      console.log('The "data to append" was appended to file!')
      callback()
    })
  } else {
    return console.log('The file does not exist in the following path')
  }
}
module.exports = writeFile
