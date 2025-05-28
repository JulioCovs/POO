function calcularResta() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultElement = document.getElementById("result");
    const explanationContainer = document.getElementById("explanation-container");
    const explanationText = document.getElementById("explanation-text");

    if (isNaN(num1) || isNaN(num2)) {
        resultElement.textContent = "Por favor, ingresa ambos números.";
        explanationContainer.classList.add("hidden");
        return;
    }

    const result = num1 - num2;
    resultElement.textContent = result;

    explanationText.textContent = `Tomamos ${num1} y le restamos ${num2}, lo cual da como resultado ${result}.`;
    explanationContainer.classList.remove("hidden");
}
