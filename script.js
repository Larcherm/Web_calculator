let buttons = document.querySelectorAll("button");
let display = document.querySelector(".display-2");

//adds on click properties for each of the buttons
buttons.forEach(button => button.addEventListener("click", e => {
   calc(button);
}))

//check buttons for transition end in order to return to original state
buttons.forEach(button => button.addEventListener("transitionend", e => {
    if (e.propertyName !== "transform") return;
    button.classList.remove("pressed");
    return;
}))

//add keydown properties to the calculator
window.addEventListener("keydown", e => {
    e.preventDefault();
    let code = e.code;
    for (const btn of buttons) {
        if (btn.hasAttribute("data-key")) {
            let keyArray = btn.dataset.key.split(" ");
            if (keyArray.includes(code)) {
                calc(btn);
                return;
            }
        }
    }
    return;
})

//branches function according to button pressed
function calc(button) {
    let buttonContent = button.textContent;
    let displayContent = display.textContent;
    button.classList.add("pressed");
    if (!button.classList.contains("operator")) displayNumber(button);
    else {
        switch (buttonContent) {
            case "AC" : 
                reset(); 
                break;
            case "DEL":
                if (displayContent.length == 1 || displayContent.length == "0"){
                    reset();
                }
                else {
                    displayContent = displayContent.slice(0, displayContent.length - 1);
                    display.textContent = displayContent;
                }
                break;
            case "." : 
                float();
                break;
            case "+/-" : 
                inverseSign();
                break;
            case "%" : 
                percentage();
                break;
            default :
                getOperand(button);
        }
    }
    return;
}

function displayNumber(button) {
    let digitCount = display.textContent.length;
    if (display.classList.contains("hasContent")) {
        if (digitCount >= 21) return;
        else if (display.textContent == "0") {
            display.textContent = button.textContent;
            digitCount = 1;
        } else {
            display.textContent += button.textContent;
            digitCount++;
        };
    }
    else {
        display.textContent = button.textContent;
        display.classList.add("hasContent");
        digitCount++;
    }
    return;
}

//resets display and stored properties
function reset(x = 0) {
    display.classList.remove("hasContent");
    display.classList.remove("isFloat");
    charCount = 0;
    if (x == 0) {
        display.removeAttribute("key-operation");
        display.textContent = "0";
    }
    else if (x == 1) {
        display.removeAttribute("key-operation");
    }
    else {
        return;
    }
}

function float() {   
    if (!display.classList.contains("hasContent")) {
        display.textContent = "0."
        display.classList.add("hasContent");
        display.classList.add("isFloat");
    }
    else if (display.classList.contains("hasContent") && display.classList.contains("isFloat")) {
        return;
    }

    else {
        display.textContent += ".";
        display.classList.add("isFloat");
    }
}

function inverseSign() {
    let n = Number(display.textContent);
    display.textContent = String((-n));
}

function percentage() {
    let n = Number(display.textContent) / 100;
    display.textContent = limit(n);
}

//stores operand and operator in the display attributes
function getOperand(button) {
    let operand = display.textContent;
    let operator = (button.textContent == "x") ? "*" : button.textContent;
    if (!display.hasAttribute("key-operation")) {
        if (operator == "=") return;
        display.setAttribute("key-operation", `${operand + " " + operator}`);
    }
    else {
        let opArray = display.getAttribute("key-operation").split(" ")
        let result = operate(opArray[0], opArray[1], operand);
        if (operator == "=") {
            display.textContent = result;
            reset(1);
            return;
        }
        else {
            display.textContent = result;
            display.setAttribute("key-operation", `${result + " " + operator}`);          
        }
    }
    reset(2);
}

function operate(a, operator, b) {
    a = Number(a);
    b = Number(b);
    if (a == NaN || b == NaN) return NaN;
    switch (operator) {
        case "*" :
            return limit(a * b);
        case "+" :
            return limit(a + b);
        case "-" :
            return limit(a - b);
        case "/" :
            if (b == 0) return "ya broke it";
            return limit(a / b);
    }
}

//rounds the result of operations and stops user input if it exceeds display space
function limit(result) {
    let length = String(result).length;
    if (length <= 21 ) {
        return result;
    }
    else {
        return Math.round(result * 1e-21) / 1e-21;
    }
}

