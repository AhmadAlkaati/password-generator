const generateBtn = document.querySelector('.generate');
const copyBtn = document.querySelector('.copy');
const outputText = document.querySelector('.output-text');
const passwordLength = document.querySelector('.password-length');
const incUpper = document.querySelector('.inc-upper');
const incLower = document.querySelector('.inc-lower');
const incNumbers = document.querySelector('.inc-numbers');
const incSpecial = document.querySelector('.inc-special');
let msg = document.createElement('p');
msg.className = 'msg';
const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const specialChar = '!@#$%^&*()_+=';
function getRandomIntegerNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getRandomCapitalLetter() {
  return capitalLetters[Math.floor(Math.random() * capitalLetters.length)];
}

function getRandomSmallLetter() {
  return smallLetters[Math.floor(Math.random() * smallLetters.length)];
}
function getRandomSpecialChar() {
  return specialChar[Math.floor(Math.random() * specialChar.length)];
}

function generateX() {
  let x = [];

  if (incNumbers.checked) {
    x.push(getRandomIntegerNumber());
  }
  if (incUpper.checked) {
    x.push(getRandomCapitalLetter());
  }
  if (incLower.checked) {
    x.push(getRandomSmallLetter());
  }
  if (incSpecial.checked) {
    x.push(getRandomSpecialChar());
  }

  if (x.length === 0) return '';
  return x[Math.floor(Math.random() * x.length)];
}

generateBtn.addEventListener('click', generatePassword);

function generatePassword() {
  let password = '';
  if (incNumbers.checked) {
    password += getRandomIntegerNumber();
  }
  if (incUpper.checked) {
    password += getRandomCapitalLetter();
  }
  if (incLower.checked) {
    password += getRandomSmallLetter();
  }
  if (incSpecial.checked) {
    password += getRandomSpecialChar();
  }

  for (let i = password.length; i < passwordLength.value; i++) {
    const x = generateX();
    password += x;
  }

  outputText.innerHTML = password;
  userMsg();
}

function userMsg() {
  if (passwordLength.value == '') {
    msg.innerHTML = 'Please specify a password length';
    generateBtn.after(msg);

    setTimeout(() => {
      msg.remove();
    }, 1500);
  }
  if (passwordLength.value > 30) {
    outputText.innerHTML = '';
    let msgTwo = document.createElement('p');
    msgTwo.className = 'msg';
    msgTwo.innerHTML = 'Max password length is 30';
    console.log('ok');
    generateBtn.after(msgTwo);
    setTimeout(() => {
      msgTwo.remove();
    }, 1500);
  }
  if (passwordLength.value < 5 && passwordLength.value != '') {
    outputText.innerHTML = '';
    let msgThree = document.createElement('p');
    msgThree.className = 'msg';
    msgThree.innerHTML = 'Min password length is 5';
    console.log('ok');
    generateBtn.after(msgThree);
    setTimeout(() => {
      msgThree.remove();
    }, 1500);
  }

  if (
    !incUpper.checked &&
    !incLower.checked &&
    !incNumbers.checked &&
    !incSpecial.checked &&
    passwordLength.value != ''
  ) {
    msg.innerHTML = 'Please check at least one box';
    generateBtn.after(msg);
    setTimeout(() => {
      msg.remove();
    }, 1500);
  }
}

copyBtn.addEventListener('click', copyPass);

function copyPass() {
  copyBtn.innerHTML = 'Copied!';
  setTimeout(() => {
    copyBtn.innerHTML = '<i class="far fa-clipboard"></i>';
  }, 1000);
  const copiedText = document.createElement('textarea');
  document.body.append(copiedText);
  copiedText.innerHTML = outputText.innerHTML;
  copiedText.select();
  document.execCommand('copy');
}
