// script.js

function calcularDivision() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultElement = document.getElementById('result');
    const explanationContainer = document.getElementById('explanation-container');
    const explanationText = document.getElementById('explanation-text');
    const errorContainer = document.getElementById('error-container');
    const errorText = document.getElementById('error-text');

    // Limpiar mensajes anteriores
    explanationContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');

    if (isNaN(num1) || isNaN(num2)) {
        resultElement.textContent = "-";
        errorText.textContent = "Por favor, ingresa ambos números.";
        errorContainer.classList.remove('hidden');
        return;
    }

    if (num2 === 0) {
        resultElement.textContent = "Error";
        errorText.textContent = "No se puede dividir entre cero.";
        errorContainer.classList.remove('hidden');
        return;
    }

    const resultado = num1 / num2;
    resultElement.textContent = `${num1} ÷ ${num2} = ${resultado}`;

    let explicacion = "";
    if (Number.isInteger(num1) && Number.isInteger(num2)) {
        const cociente = Math.floor(num1 / num2);
        const residuo = num1 % num2;
        if (residuo === 0) {
            explicacion = `${num2} cabe exactamente ${cociente} veces en ${num1}.`;
        } else {
            explicacion = `${num2} cabe ${cociente} veces en ${num1}, con un residuo de ${residuo}.`;
        }
    } else {
        explicacion = `El número ${num2} está contenido ${resultado} veces en ${num1}.`;
    }

    explanationText.textContent = explicacion;
    explanationContainer.classList.remove('hidden');
}
