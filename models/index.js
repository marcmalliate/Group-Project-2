const User = require('./User');
const Book = require('./Book');
const Reviews = require('./Reviews');

User.hasMany(Reviews, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Reviews.belongsTo(User, {
  foreignKey: 'user_id'
});

Book.hasMany(Reviews, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE'
});

Reviews.belongsTo(Book, {
  foreignKey: 'book_id'
});

module.exports = { User, Reviews, Book };
