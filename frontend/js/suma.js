document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("calculate-btn");
    const resultDiv = document.getElementById("result");
    const stepsDiv = document.getElementById("steps");
    const errorDiv = document.getElementById("error-message");

    btn.addEventListener("click", function () {
        const num1 = parseFloat(document.getElementById("num1").value);
        const num2 = parseFloat(document.getElementById("num2").value);

        if (isNaN(num1) || isNaN(num2)) {
            errorDiv.textContent = "Por favor, ingresa dos números válidos.";
            resultDiv.textContent = "?";
            stepsDiv.innerHTML = "<p>Ingresa números para ver los pasos de la operación.</p>";
            return;
        }

        errorDiv.textContent = "";
        const resultado = num1 + num2;
        resultDiv.textContent = resultado;

        // Mostrar pasos
        stepsDiv.innerHTML = `
            <p>1. Tomamos el primer número: ${num1}</p>
            <p>2. Sumamos el segundo número: ${num1} + ${num2}</p>
            <p>3. El resultado es: ${resultado}</p>
        `;
    });
});
