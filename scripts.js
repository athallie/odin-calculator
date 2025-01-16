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
    if (element.nodeName == "BUTTON") {
        if (element.id == "clear-button") {
            outputField.value = "0"
            isCleared = true
            expression = []
        } else {
            // 
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
                if (
                    operators.includes(expression.at(-1)) &&
                    element.textContent != '=' &&
                    contentIsOperator == true
                ) {
                    expression.pop()
                } else {
                    expression.push(outputField.value)
                }
                if (expression.length == 3) {
                    let result = eval(expression)
                    outputField.value = result
                    expression = []
                } else {
                    outputField.value = element.textContent
                }
                if (element.textContent != '=') {
                    if (expression.length == 0) {
                        expression.push(outputField.value)
                    }
                    expression.push(element.textContent)
                }
                contentIsOperator = true
                isCleared = false
            }
        }
    }
})

function eval(expression) {
    if (expression.length < 3) {
        return false
    }

    let operand1 = parseFloat(expression[0])
    let operator = expression[1]
    let operand2 = parseFloat(expression[2])

    switch(operator) {
        case '+':
            return operand1 + operand2
        case '-':
            return operand1 - operand2
        case '\u00D7':
            return operand1 * operand2
        case '\u00F7':
            return operand1 / operand2
    }
}