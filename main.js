// Pesos originales de cada tema (en %)
const pesosOriginales = {
    UT1: 12,
    UT2: 26,
    UT3: 12,
    UT4: 15,
    UT5: 15,
    UT6: 20
};

// Función para calcular la nota de un tema
function calcularNotaTema(teorico, practico, tareas) {
    return (teorico * 0.16) + (practico * 0.24) + (tareas * 0.60);
}

function calcularModulo() {
    const temas = ["UT1", "UT2", "UT3", "UT4", "UT5", "UT6"];
    let notasTemas = {};
    let pesosUsados = {};
    let sumaPesos = 0;
    let temasImpartidos = [];

    // Se recorre cada tema y se calcula la nota si está impartido.
    temas.forEach(function(tema) {
        const impartido = document.getElementById(tema + "_impartido").checked;
        if (impartido) {
            const teorico = parseFloat(document.getElementById(tema + "_teorico").value) || 0;
            const practico = parseFloat(document.getElementById(tema + "_practico").value) || 0;
            const tareas = parseFloat(document.getElementById(tema + "_tareas").value) || 0;
            const notaTema = calcularNotaTema(teorico, practico, tareas);
            notasTemas[tema] = notaTema;
            pesosUsados[tema] = pesosOriginales[tema];
            sumaPesos += pesosOriginales[tema];
            temasImpartidos.push(tema); // Guardar los temas impartidos
        }
    });

    // Redistribuir los pesos de los temas no impartidos proporcionalmente entre los impartidos.
    if (temasImpartidos.length > 0) {
        let sumaPesosImpartidos = temasImpartidos.reduce(function(suma, tema) {
            return suma + pesosOriginales[tema];
        }, 0);

        // Recalcular los pesos efectivos para los temas impartidos.
        for (const tema of temasImpartidos) {
            let pesoRedistribuido = pesosOriginales[tema] + ((100 - sumaPesosImpartidos) / temasImpartidos.length);
            pesosUsados[tema] = pesoRedistribuido;
        }
    }

    // Calcular la nota final del módulo considerando los pesos redistribuidos
    let notaModulo = 0;
    for (const tema in notasTemas) {
        let pesoEfectivo = pesosUsados[tema];
        notaModulo += notasTemas[tema] * (pesoEfectivo / 100);
    }

    // Mostrar los resultados en pantalla
    let resultadoHTML = "<h3>Resultados:</h3>";
    for (const tema in notasTemas) {
        resultadoHTML += `<p>${tema}: ${notasTemas[tema].toFixed(2)} (Peso efectivo: ${pesosUsados[tema].toFixed(2)}%)</p>`;
    }
    resultadoHTML += `<h2>Nota Final del Módulo: ${notaModulo.toFixed(2)}</h2>`;
    document.getElementById("resultado").innerHTML = resultadoHTML;
}
