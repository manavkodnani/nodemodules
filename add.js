const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://manavkodnani:competitivecoding@localhost:5432/manavkodnani')

const operations = {
  create: function (description) {
    return sequelize.query(`INSERT INTO todo (DESCRIPTION) VALUES ('${description}') RETURNING id`)
  },
  read: function () {
    return sequelize.query(`SELECT * from todo ORDER BY id`)
  },
  update: function (id, description, status) {
    if (!description) {
      return sequelize.query(`UPDATE TODO SET STATUS = '${status}' WHERE ID = '${id}'`)
    }
    if (!status) {
      return sequelize.query(`UPDATE TODO SET DESCRIPTION = '${description}' WHERE ID = ${id}`)
    }
    return sequelize.query(`UPDATE TODO SET DESCRIPTION = '${description}', STATUS = ${status} WHERE ID = ${id}`)
  },
  destroy: function (id) {
    return sequelize.query(`DELETE FROM TODO WHERE ID = '${id}'`)
  },
  uncheckAll: function () {
    return sequelize.query(`UPDATE TODO SET STATUS = false`)
  },
  checkAll: function () {
    return sequelize.query(`UPDATE TODO SET STATUS = true`)
  },
  clearCompleted: function () {
    return sequelize.query(`DELETE FROM TODO WHERE STATUS = true`)
  }
}


// operations.destroy(2).then(function (response) {
//   console.log(response)
// })

module.exports = operations

