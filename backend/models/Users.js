import sequelize from "../db.js"
import { DataTypes } from "sequelize"

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },

  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  tableName: 'users',
  timestamps: true,
  underscored: true
})

export default User
