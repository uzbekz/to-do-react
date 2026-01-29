import User from './Users.js'
import Task from './Task.js'

// Associations
User.hasMany(Task, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Task.belongsTo(User, {
  foreignKey: 'user_id'
})

export { User, Task }
