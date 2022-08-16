let buttons = document.querySelectorAll("button");
let display = document.querySelector(".display-2");

buttons.forEach(button => button.addEventListener("click", e => {
    let buttonContent = button.textContent;
    let displayContent = display.textContent;
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
}))

function displayNumber(button) {
    if (display.classList.contains("hasContent")) {
        display.textContent += button.textContent;
    }
    else {
        if (button.textContent == "0") return;
        display.textContent = button.textContent;
        display.classList.add("hasContent");
    }
    return;
}

function reset() {
    display.textContent = "0";
    display.classList.remove("hasContent");
    display.classList.remove("isFloat");
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

    //add % button function
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
    display.textContent = n;
}

function getOperand(button) {
    let operand1 = display.textContent;
    if (!display.hasAttribute("key-operator")) {
        display.setAttribute("key-operator", `${ => operand1}`);
            // + (button.textContent == "x") ? "*" : button.textContent;

        reset();
    }
}
