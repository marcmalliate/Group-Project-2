const sequelize = require('../config/connection');
const { User, Book } = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log(userData)
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const book of bookData) {
    console.log(book)
    try{
      await Book.create({
        ...book,
      });
    }catch(err){
      console.log(err)
    }
    
  }

  process.exit(0);
};

seedDatabase();
