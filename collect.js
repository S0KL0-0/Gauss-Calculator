function collectMatrixData(rows, columns) {
    let matrix = [];

    for (let row = 1; row <= rows; row++) {
        let rowData = [];
        for (let col = 0; col < columns; col++) {
            const input = document.getElementById(`input_${row}_${col}_var`);
            const value = input ? parseFloat(input.value) : NaN;
            rowData.push(isNaN(value) ? 0 : value);
        }
        const result = document.getElementById(`input_${row}_result`);
        const resultValue = result ? parseFloat(result.value) : NaN;
        rowData.push(isNaN(resultValue) ? 0 : resultValue);
        matrix.push(rowData);
    }

    return matrix;
}

function collectNameData(rows) {
    let names = [];

    for (let row = 0; row <= rows-1; row++) {
        const result = document.getElementById(`name_${row}`);
        const resultValue = result ? result.value : NaN;
        names.push(resultValue);
    }

    return names;
}