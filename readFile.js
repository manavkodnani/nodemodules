const fs = require('fs');
const readFileWithPromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data);
      }
    });
  });
}

readFileWithPromise('sample.txt').then((data) => {
  console.log(data);
})