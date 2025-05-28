// script.js

function calcularMultiplicacion() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultElement = document.getElementById('result');
    const explanationContainer = document.getElementById('explanation-container');
    const explanationText = document.getElementById('explanation-text');

    if (isNaN(num1) || isNaN(num2)) {
        resultElement.textContent = "Por favor, ingresa ambos números.";
        explanationContainer.classList.add('hidden');
        return;
    }

    const resultado = num1 * num2;
    resultElement.textContent = `${num1} × ${num2} = ${resultado}`;

    // Generar explicación según los valores
    let explicacion = "";
    if (num1 === 0 || num2 === 0) {
        explicacion = "Cualquier número multiplicado por cero es igual a cero.";
    } else if (Number.isInteger(num1) && Number.isInteger(num2) && num1 > 0 && num2 > 0) {
        const repeticion = `${num1} sumado ${num2} veces: ` + Array(num2).fill(num1).join(' + ');
        explicacion = `${repeticion} = ${resultado}`;
    } else {
        explicacion = `Multiplicar ${num1} por ${num2} nos da ${resultado}. Esta operación puede entenderse como sumar ${num1} ${num2} veces o viceversa.`;
    }

    explanationText.textContent = explicacion;
    explanationContainer.classList.remove('hidden');
}
