const User = require('../models/User');

const user = new User({
  _id: '6453f4d29be8b6f9e65573db',
  firstName: 'Samer',
  lastName: 'Huwari',
  dateOfBirth: '1964-07-15T20:01:52.295+00:00',
  email: 'samer.huwari@gmail.com',
  password: '$2b$10$FmT1vhzanwdXL8hemVZ4Se9EFVWbiPEuN4bHHD6.fYHaxukKvgNUa',
  userName: 'SamerHuwari1',
  image: 'user2.png',
  gender: 'male',
  score: 12,
});

const seed = async() => {
  await User.create(user);
}

module.exports = seed;