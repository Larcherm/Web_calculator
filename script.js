let buttons = document.querySelectorAll("button");
let display = document.querySelector(".display-2");

buttons.forEach(button => button.addEventListener("click", e => {
    let buttonContent = button.textContent;
    let displayContent = display.textContent;
    if (!button.classList.contains("operator")) {
        if (display.classList.contains("hasContent")) {
            console.log(buttonContent);
            display.textContent += buttonContent;
            console.log(displayContent);
        }
        else {
            display.textContent = buttonContent;
            display.classList.add("hasContent");
        }

    }
    else if (buttonContent == "AC") {
        displayContent = "0";
        display.classList.remove("hasContent");
    }
    else if (buttonContent == "DEL") {
        displayContent = displayContent.slice(0, displayContent.length - 2);
    }
}))