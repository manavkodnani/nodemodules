const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://manavkodnani:competitivecoding@localhost:5432/manavkodnani')

const operations = {
  create: function (description) {
    return sequelize.query(`INSERT INTO todo (DESCRIPTION) VALUES ('${description}')`)
  },
  read: function () {
    return sequelize.query(`SELECT * from todo ORDER BY id`)
  },
  update: function (id, description, status) {
    return sequelize.query(`UPDATE todo SET DESCRIPTION = '${description}', STATUS = '${status}' where ID = '${id}'`)
  },
  destroy: function (id) {
    return sequelize.query(`DELETE FROM TODO WHERE ID = '${id}'`)
  }
}


// operations.destroy(2).then(function (response) {
//   console.log(response)
// })

module.exports = operations

