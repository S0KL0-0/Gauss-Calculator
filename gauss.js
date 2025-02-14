function gauss(oMatrix, names, rows, columns) { let matrix = JSON.parse(JSON.stringify(oMatrix));

    for (let pivot = 0; pivot < rows; pivot++) {
        DisplayEquation("steps_div", matrix, names, true);

        let maxRow = pivot;
        for (let row = pivot + 1; row < rows; row++) {
            if (Math.abs(matrix[row][pivot]) > Math.abs(matrix[maxRow][pivot])) {
                maxRow = row;
            }
        }
        if (maxRow !== pivot) {
            let temp = matrix[pivot];
            matrix[pivot] = matrix[maxRow];
            matrix[maxRow] = temp;
        }

        let pNezinamais = matrix[pivot][pivot];
        if (Math.abs(pNezinamais) < 1e-10) {
            throw new Error("Matrix is singular or nearly singular.");
        }

        for (let col = 0; col <= columns; col++) {
            matrix[pivot][col] = matrix[pivot][col] / pNezinamais;
        }
        DisplayEquation("steps_div", matrix, names, true);

        for (let row = pivot + 1; row < rows; row++) {
            let koeficents = matrix[row][pivot];

            if (Math.abs(koeficents) < 1e-10) {
                continue;
            }

            let currentRow = JSON.parse(JSON.stringify(matrix[pivot]));
            let selectedRow = JSON.parse(JSON.stringify(matrix[row]));

            for (let col = 0; col <= columns; col++) {
                currentRow[col] = currentRow[col] * -koeficents;
            }

            for (let col = 0; col <= columns; col++) {
                matrix[row][col] = currentRow[col] + matrix[row][col];
            }

            let pos = "start";
            if (pivot + 1 === rows - 1) {
                pos = "only";
            } else if (row > pivot + 1 && row < rows - 1) {
                pos = "middle";
            } else if (row === rows - 1) {
                pos = "end";
            }

            DisplayOperation(
                "steps_div",
                -koeficents,
                pivot + 1,
                row + 1,
                currentRow,
                selectedRow,
                matrix[row],
                names,
                pos,
                true
            );
        }
    }

    let solution = new Array(rows).fill(0);

    for (let row = rows - 1; row >= 0; row--) {
        let sum = matrix[row][columns];

        for (let col = row + 1; col < columns; col++) {
            sum -= matrix[row][col] * solution[col];
        }

        solution[row] = sum;

        for (let aboveRow = row - 1; aboveRow >= 0; aboveRow--) {
            matrix[aboveRow][columns] -= matrix[aboveRow][row] * solution[row];
            matrix[aboveRow][row] = 0;
        }

        if (row > 0) {
            DisplayEquation("steps_div", matrix, names, true);
        }
    }

    DisplaySolution("solution_div", solution, names);

    let checkMatrix = JSON.parse(JSON.stringify(oMatrix));
    let checkArray = new Array(rows).fill(1);
    DisplayEquation("check_div", checkMatrix, names, true);
    for (let row = 0; row < rows; row++) {
        let computed = 0;
        for (let col = 0; col < columns; col++) {
            let substituted = checkMatrix[row][col] * solution[col];
            checkMatrix[row][col] = substituted;
            computed += substituted;
        }
        checkArray[row] = 0;
        DisplayCheck("check_div", checkMatrix, names, checkArray, true);
    }

    let endCheckMatrix = Array.from({ length: rows }, () =>
        new Array(columns + 1).fill(0)
    );
    for (let row = 0; row < rows; row++) {
        let sum = 0;
        for (let col = 0; col <= columns - 1; col++) {
            sum += checkMatrix[row][col];
        }
        endCheckMatrix[row][0] = sum;
        endCheckMatrix[row][columns] = checkMatrix[row][columns];
    }
    DisplayCheck("check_div", endCheckMatrix, names, checkArray, false);
}