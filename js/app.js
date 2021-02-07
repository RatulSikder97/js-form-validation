/** @format */

// Input fields
const userName = document.getElementById("user-input__name");
const userPassword = document.getElementById("user-input__password");
const userEmail = document.getElementById("user-input__email");
const userNumber = document.getElementById("user-input__phone");

// Form
const form = document.getElementById("user-input");

// error massage
let errors = {};

// Handle form
form.addEventListener("submit", function (event) {
	// Prevent default behaviour
	event.preventDefault();
	if (
		validateTextField(userName) ||
		validateEmailField(userEmail) ||
		validateNumericField(userNumber) ||
		validateAlphaNumSpecialField(userPassword)
	) {
		console.log("Successful");
	}
});

// user form valid

// generic functions
// validate field

function validateTextField(field) {
	if (isEmpty(field)) {
		setEmptyMsg(field);
		removeClass(field, "valid");
		addClass(field, "invalid");
		return false;
	} else if (!isStringOnlyWithLetter(field.value)) {
		setValidMsg(field);
		removeClass(field, "valid");
		addClass(field, "invalid");
		return false;
	} else {
		removeClass(field, "invalid");
		removeMsg(field);
		addClass(field, "valid");
		return true;
	}
}

function validateNumericField(field) {
	if (isEmpty(field)) {
		setEmptyMsg(field);
		removeClass(field, "valid");
		addClass(field, "invalid");
		return false;
	} else if (!isStringOnlyWithNumber(field.value)) {
		setValidMsg(field);
		removeClass(field, "valid");
		addClass(field, "invalid");
		return false;
	} else {
		removeMsg(field);
		removeClass(field, "invalid");
		addClass(field, "valid");
		return true;
	}
}

function validateEmailField(field) {
	if (isEmpty(field)) {
		setEmptyMsg(field);
		removeClass(field, "valid");
		addClass(field, "invalid");
		return false;
	} else if (!isEmail(field.value)) {
		setValidMsg(field);
		removeClass(field, "valid");
		addClass(field, "invalid");
		return false;
	} else {
		removeMsg(field);
		removeClass(field, "invalid");
		addClass(field, "valid");
		return true;
	}
}

function validateAlphaNumField(field) {
	if (isEmpty(field)) {
		setEmptyMsg(field);
		removeClass(field, "valid");
		addClass(field, "invalid");
		return false;
	} else if (!isStringContainsLetterNumber(field.value)) {
		setValidMsg(field);
		removeClass(field, "valid");
		addClass(field, "invalid");
		return false;
	} else {
		removeMsg(field);
		removeClass(field, "invalid");
		addClass(field, "valid");
		return true;
	}
}

function validateAlphaNumSpecialField(field) {
	if (isEmpty(field)) {
		setEmptyMsg(field);
		removeClass(field, "valid");
		addClass(field, "invalid");
		return false;
	} else if (!isStringContainsLetterNumberSpecialchar(field.value)) {
		setValidMsg(field);
		removeClass(field, "valid");
		addClass(field, "invalid");
		return false;
	} else {
		removeClass(field, "invalid");
		removeMsg(field);
		addClass(field, "valid");
		return true;
	}
}

// empty check
function isEmpty(field) {
	if (field.value == "" || field.value == null) {
		return true;
	} else return false;
}

// set error message
function setEmptyMsg(field) {
	errors[field.name] = `${field.name} is required!!`;
	field.nextElementSibling.innerText = errors[field.name];
	addClass(field.nextElementSibling, "error-msg");
}
// remove error msg
function removeMsg(field) {
	delete errors[field.name];
	field.nextElementSibling.innerText = "";
}

function setValidMsg(field) {
	errors[field.name] = `${field.name} is not valid!!`;
	field.nextElementSibling.innerText = errors[field.name];
	addClass(field.nextElementSibling, "error-msg");
}

// check is upper

function isUpper(char) {
	if ((char >= "A" && char <= "Z") || char == " ") {
		return true;
	} else return false;
}

function isLower(char) {
	if ((char >= "a" && char <= "z") || char == " ") {
		return true;
	} else return false;
}

// check if numaric
function isNumber(char) {
	if (typeof char == "number") {
		return true;
	} else return false;
}

function isSpecialChar(char) {
	let specialChars = "@_.";

	if (specialChars.indexOf(char) != -1 && char != "") {
		return true;
	}
	return false;
}

function isStringOnlyWithLetter(str) {
	let len = str.length;
	str = str.toLowerCase();
	for (let i = 0; i < len; i++) {
		if (!isLower(str[i])) {
			return false;
		}
	}
	return true;
}

function isStringOnlyWithNumber(str) {
	let len = str.length;

	for (let i = 0; i < len; i++) {
		if (!isNumber(+str[i]) || isNaN(+str[i])) {
			return false;
		}
	}
	return true;
}

function isStringContainsLetterNumber(str) {
	let len = str.length;
	let letter = 0,
		num = 0;
	str = str.toLowerCase();
	for (let i = 0; i < len; i++) {
		if (isLower(str[i])) {
			letter++;
		} else if (isNumber(+str[i])) {
			num++;
		}
	}

	if (letter > 0 && num > 0) return true;
	else return false;
}

function isStringContainsLetterNumberSpecialchar(str) {
	let len = str.length;
	let letter = 0,
		num = 0,
		special = 0;
	str = str.toLowerCase();
	for (let i = 0; i < len; i++) {
		if (isLower(str[i])) {
			letter++;
		} else if (isNumber(+str[i])) {
			num++;
		} else if (isSpecialChar(str[i])) {
			special++;
		}
	}

	if (letter > 0 && num > 0 && special > 0) return true;
	else return false;
}

function isEmail(str) {
	// check for @
	let atSymbol = str.indexOf("@");
	if (atSymbol < 1) return false;

	let dot = str.indexOf(".");
	if (dot <= atSymbol + 2) return false;

	// check that the dot is not at the end
	if (dot === str.length - 1) return false;

	return true;
}
function isStringContainsNumber(str) {
	let len = str.length;
	str = str.toLowerCase();
	for (let i = 0; i < len; i++) {
		if (isLower(str[i])) {
			return true;
		}
	}
	return false;
}
// // check regex
// function containsCharacters(field, code) {
// 	let regEx;
// 	switch (code) {
// 		case 1:
// 			// letters
// 			regEx = /(?=.*[a-zA-Z])/;
// 			return matchWithRegEx(regEx, field, "Must contain at least one letter");
// 		case 2:
// 			// letter and numbers
// 			regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
// 			return matchWithRegEx(
// 				regEx,
// 				field,
// 				"Must contain at least one letter and one number",
// 			);
// 		case 3:
// 			// uppercase, lowercase and number
// 			regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
// 			return matchWithRegEx(
// 				regEx,
// 				field,
// 				"Must contain at least one uppercase, one lowercase letter and one number",
// 			);
// 		case 4:
// 			// uppercase, lowercase, number and special char
// 			regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
// 			return matchWithRegEx(
// 				regEx,
// 				field,
// 				"Must contain at least one uppercase, one lowercase letter, one number and one special character",
// 			);
// 		case 5:
// 			// Email pattern
// 			regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 			return matchWithRegEx(regEx, field, "Must be a valid email address");
// 		case 6:
// 			regEx = /^\d+$/;
// 			return matchWithRegEx(regEx, field, "All should be numeric");

// 		default:
// 			return false;
// 	}
// }
// function matchWithRegEx(regEx, field, message) {
// 	if (field.value.match(regEx)) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

// file validation
function validateImage(field) {
	let validExtensions = ["jpg", "png", "jpeg"]; //array of valid extensions

	let fileName = field.files.length != 0 ? field.files[0].name : "";
	var fileNameExt = fileName.substr(fileName.lastIndexOf(".") + 1);

	// view box
	let imageShow = document.getElementById("user-input__image--view");

	if (validExtensions.indexOf(fileNameExt) == -1) {
		imageShow.setAttribute("src", "");
		alert("Only these file types are accepted : " + validExtensions.join(", "));
	} else {
		if (field.files && field.files[0]) {
			var filerdr = new FileReader();
			filerdr.onload = function (e) {
				imageShow.setAttribute("src", e.target.result);
			};
			filerdr.readAsDataURL(field.files[0]);
		}
	}
}

// add class to element
function addClass(field, className) {
	field.classList.add(className);
}

// remove class from element

function removeClass(field, className) {
	field.classList.remove(className);
}
