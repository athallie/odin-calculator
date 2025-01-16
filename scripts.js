let inputField = document.querySelector("#input-field")
let outputField = document.querySelector('textarea[name=output-field]')
let backspaceButton = document.querySelector("#backspace-button")
let expression = []
let operators = ['+', '-', '\u00D7', '\u00F7', '=']
let contentIsOperator = false
let isCleared = true

backspaceButton.addEventListener("click", (e) => {
    if (outputField.value != "" && !operators.includes(outputField.value)) {
        outputField.value = outputField.value.substring(0, outputField.value.length - 1)
        if (outputField.value == "") {
            isCleared = true
            outputField.value = 0
        }
        expression.pop()
    }
})

//Buttons interactivity
inputField.addEventListener("click", (e) => {
    let element = e.target
    outputField.focus()

    console.log(element.id);

    if (element.nodeName == "BUTTON") {
        if (element.id == "clear-button") {
            outputField.value = "0"
            isCleared = true
            expression = []
        } else {
            if (
                contentIsOperator == true &&
                element.textContent != "." &&
                !operators.includes(element.textContent)
            ) {
                contentIsOperator = false
                outputField.value = element.textContent
                isCleared = false
            } else if (
                Number.isInteger(parseInt(element.textContent)) ||
                element.textContent == "."
            ) {
                if (isCleared == true) {
                    outputField.value = element.textContent
                } else {
                    outputField.value += element.textContent
                }
                isCleared = false
            } else if (operators.includes(element.textContent)) {
                if (expression.length == 2) {
                    let result = eval(expression)
                    expression = [result]
                } else {
                    expression.push(outputField.value)
                }
                if (element.textContent != '=') {
                    expression.push(element.textContent)
                }
                outputField.value = element.textContent
                contentIsOperator = true
                isCleared = false
            }
        }
    }
    
    console.log(expression);
    
})

function eval(expression) {
    if (expression.length < 3) {
        return false
    } else {
        return 1
    }
}