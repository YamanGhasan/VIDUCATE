const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
const firstNameRegex = /^[A-Za-z]{1,20}$/;
const lastNameRegex = /^[A-Za-z]{1,20}$/;
const emailRegex = /^[^\s@]+@(yahoo|hotmail|gmail)+\.[^\s@]+$/;
const userNameRegex = /^[A-Za-z_. ]{1,30}$/;

function validateFirstName(firstName) {
    if (firstName.length === 0) {
        return 'Please enter your first name';
    } else if (!firstNameRegex.test(firstName)) {
        return 'Only Arabic, English, and spaces are allowed for first name';
    } else if (firstName.length > 20) {
        return 'Maximum of 20 characters allowed for first name';
    }
    return null;
}
function validateLastName(lastName) {
    if (lastName.length === 0) {
        return 'Please enter your last name';
    } else if (!lastNameRegex.test(lastName)) {
        return 'Only Arabic, English, and spaces are allowed for last name';
    } else if (lastName.length > 20) {
        return 'Maximum of 20 characters allowed for last name';
    }
    return null;
}
function validateDateOfBirth(dateOfBirth) {
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() - 14, currentDate.getMonth(), currentDate.getDate());
    if (dateOfBirth > minDate) {
        return 'Account owner must be 14 years old or older';
    }
    return null;
}
function validateEmail(email) {
  if (email.length === 0) {
    return 'Please enter your email';
  }
    else if (!emailRegex.test(email)) {
        return 'Invalid email address';
    }
    return null;
}
function validatePassword(password, confirmPassword) {
    if (!passwordRegex.test(password)) {
        return 'Password must be between 8 and 24 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    } else if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return null;
}
function validateUserName(userName) {
  if (userName.length === 0) {
    return 'Please enter a user name';
  }else if (!userNameRegex.test(userName)) {
        return 'Only Arabic, English, underscores, dots, and spaces are allowed for user name';
    } else if (userName.length > 30) {
        return 'Maximum of 30 characters allowed for user name';
    }
    return null;

}
module.exports = {
    validateFirstName,
    validateLastName,
    validateDateOfBirth,
    validateEmail,
    validatePassword,
    validateUserName
};