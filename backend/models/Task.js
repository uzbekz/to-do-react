import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  user_id :{
    type : DataTypes.INTEGER,
    references : {
      model : 'users', // this has to be the actual table name
      key : 'id'
    },
    onDelete : 'CASCADE'
  },

  task: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'tasks',
  timestamps: true,
  underscored: true
});

export default Task
