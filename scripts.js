let inputField = document.querySelector("#input-field")

inputField.addEventListener("click", (e) => {
    let element = e.target

    if (element.nodeName == "BUTTON") {
        console.log(element.textContent);
    }
})