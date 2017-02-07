const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://manavkodnani:competitivecoding@localhost:5432/manavkodnani')
sequelize.query("INSERT INTO todo VALUES (2, 'Write code' , false)").spread(function (results, metadata) {
 //console.log(results)
})
sequelize.query('SELECT * FROM todo').then(function (tasks) {
 console.log(tasks+ 'cklvnkl')
})
