const { faker } = require('@faker-js/faker');

const User = require('../models/User');

require("dotenv").config();

/**
 * already hashed password to store into database
 */
let hashedPassword = '$2b$10$FmT1vhzanwdXL8hemVZ4Se9EFVWbiPEuN4bHHD6.fYHaxukKvgNUa';

/**
 * represent number of inserted users & it's added as suffix of userName
 */
let usersCounter = 1;

/**
 * create user object with random values
 * 
 * @returns User object
 */
function createUser() {
	let firstName = faker.name.firstName();
	let lastNamne = faker.name.lastName();
	let userName = firstName + lastNamne + usersCounter;
	usersCounter++;
  return {
    firstName: firstName,
    lastName: lastNamne,
    userName: userName, 
    image: faker.image.avatar(),
    dateOfBirth: faker.date.birthdate(),
    email: faker.internet.email(),
    gender: faker.name.sexType(),
    password: hashedPassword
  };
}

/**
 * create number of random users and insert them into database.
 * 
 * @param {int} numberOfUsers 
 */
async function usersFactory(numberOfUsers) {
  let users = [];

  for(let i = 0; i < numberOfUsers; i++) {
    users.push(createUser());
  }

  await User.insertMany(users);
}

module.exports = usersFactory;