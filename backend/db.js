import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('task_database', 'springstudent', 'springstudent', {
  host : 'localhost',
  dialect : 'mysql'
})

export default sequelize