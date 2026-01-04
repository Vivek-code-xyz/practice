// ===== Selecting elements =====
const currDisplay = document.querySelector(".curr input");
const prevDisplay = document.querySelector(".prev input");
const buttons = document.querySelectorAll(".buttons");

// ===== State =====
let currentInput = "";
let previousInput = "";

// ===== Update display =====
function updateDisplay() {
    currDisplay.value = currentInput;
    prevDisplay.value = previousInput;
}

// ===== Handle button click =====
buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.id, button.innerText);
    });
});

// ===== Handle all inputs (buttons + keyboard) =====
function handleInput(id, value) {

    // Clear All
    if (id === "clear") {
        currentInput = "";
        previousInput = "";
    }

    // Backspace (CE)
    else if (id === "backspace") {
        currentInput = currentInput.slice(0, -1);
    }

    // Equal
    else if (id === "=") {
        if (currentInput === "") return;

        try {
            previousInput = currentInput;
            currentInput = eval(
                currentInput.replace("÷", "/").replace("×", "*")
            ).toString();
        } catch {
            currentInput = "Error";
        }
    }

    // Percentage
    else if (id === "Percentage") {
        if (currentInput !== "") {
            currentInput = (parseFloat(currentInput) / 100).toString();
        }
    }

    // Operators
    else if (["+", "-", "*", "/"].includes(id)) {
        if (currentInput === "") return;
        const lastChar = currentInput.slice(-1);
        if (["+", "-", "*", "/"].includes(lastChar)) return;
        currentInput += id;
    }

    // Numbers & dot
    else {
        currentInput += id;
    }

    updateDisplay();
}

// ===== Keyboard Support =====
document.addEventListener("keydown", (e) => {

    if (
        (e.key >= "0" && e.key <= "9") ||
        ["+", "-", "*", "/", "."].includes(e.key)
    ) {
        handleInput(e.key, e.key);
    }

    if (e.key === "Enter") {
        handleInput("=", "=");
    }

    if (e.key === "Backspace") {
        handleInput("backspace", "");
    }

    if (e.key === "Escape") {
        handleInput("clear", "");
    }
});
