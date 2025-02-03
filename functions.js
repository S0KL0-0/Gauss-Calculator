generate()

function generate() {
    generateInputs()
    generateMatrix(true)
}

function CalculateMatrix() {
    displayReset();
    console.clear();
    const size = parseInt(document.getElementById("size").value, 10);
    const matrix = collectMatrixData(size, size);
    const names = collectNameData(size);
    gauss(matrix, names, size, size);
}

function Clear() {
    const matrixDiv = document.getElementById("matrix_div");

    const matrixInputs = matrixDiv.querySelectorAll('input[type="text"]');
    matrixInputs.forEach(input => {
        input.value = '';
    });
}