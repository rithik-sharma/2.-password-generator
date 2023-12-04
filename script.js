// In querySelector() can pass in this a id ,class or a custom attribute!!
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");

const allcheckBox = document.querySelectorAll("input[type=checkbox]");
let symbolString = "!@#$%^&*()_+";

let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();
// set strength circle color to grey


// set password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRandomInt(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRandomInt(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRandomInt(65, 91));
}


function generateSymbol() {
    const randNum = getRandomInt(0, symbolString.length);
    return symbolString.charAt(randNum);
}


// calculate Strength;

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasSym = false;
    let hasNum = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasLower && hasUpper && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}


// copy content;
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch (e) {
        copyMsg.innerText = "Failed"
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);

}

// event slider on slider to display length;
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
})

function handleCheckBoxChange() {
    checkCount = 0;
    allcheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allcheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


generateBtn.addEventListener('click', () => {
    // koi checkbox check nhi hai 
    if (checkCount <= 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // find new password

    // remove old password
    password = "";

    // let's put the stuff mentioned by checkboxes

    // if (uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if (lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if (numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if (symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if (uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }

    if (lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }

    if (numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }

    if (symbolsCheck.checked) {
        funcArr.push(generateSymbol);
    }

    // compulsary addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

    // remaining addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRandomInt(0, funcArr.length);
        password += funcArr[randIndex]();
    }


    // shuffle the password
    password = shufflePassword(Array.from(password));

    // show in UI
    passwordDisplay.value = password;
    // calculate strength
    calcStrength();


})


function shufflePassword(array) {
    // fisher yates method 
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}




