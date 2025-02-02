function ro(num) {return Math.round((num + Number.EPSILON) * 10000) / 10000;}

function displayReset() {

    const stepsDiv = document.getElementById("steps_div");
    while(stepsDiv.firstChild) {
        stepsDiv.removeChild(stepsDiv.firstChild);
    }
    stepsDiv.appendChild(document.createElement("br"));

    const checkDiv = document.getElementById("check_div");
    while(checkDiv.firstChild) {
        checkDiv.removeChild(checkDiv.firstChild);
    }
    checkDiv.appendChild(document.createElement("br"));

    const solutionDiv = document.getElementById("solution_div");
    while(solutionDiv.firstChild) {
        solutionDiv.removeChild(solutionDiv.firstChild);
    }
    solutionDiv.appendChild(document.createElement("br"));
}

function DisplayEquation(divId, matrix, names, showContinuation) {
    const div = document.getElementById(divId);

    let mathContent = "\\[\\begin{cases}\n";

    for (let r = 0; r < matrix.length; r++) {
        let row = "";

        let nonZeroIndices = [];
        for (let c = 0; c < matrix[r].length - 1; c++) {
            if (matrix[r][c] !== 0) {
                nonZeroIndices.push(c);
            }
        }

        for (let i = 0; i < nonZeroIndices.length; i++) {
            let c = nonZeroIndices[i];

            if (matrix[r][c] === 1) {
                row += names[c];
            } else {
                row += ro(matrix[r][c]) + names[c];
            }

            row += ' &';

            if (i < nonZeroIndices.length - 1) {
                row += ' + &';
            }
        }

        row += ' = & ' + matrix[r][matrix[r].length - 1].toFixed(4);
        mathContent += row + '\\\\\n';
    }

    mathContent += '\\end{cases}';

    if (showContinuation) {
        mathContent += ' \\Rightarrow';
    }

    mathContent += '\\]';

    div.innerHTML += `<span style="display:inline-block; margin-right:1em;">${mathContent}</span>`;
    MathJax.typeset();
}

function DisplayOperation(divId, koef, Rst, Rnd, firstRow, secondRow, thirdRow, names, position, showContinuation) {
    const div = document.getElementById(divId);

    let matrixContent = "";

    matrixContent += `${ro(koef)} \\cdot R${Rst} + R${Rnd}: & \\\\ \n`;

    // Pirmā rinda
    for (let i = 0; i < firstRow.length - 1; i++) {
        if (firstRow[i] !== 0) {
            matrixContent += (firstRow[i] === 1 ? names[i] : firstRow[i].toFixed(4) + names[i]);
            if (i < firstRow.length - 2) {
                matrixContent += " + ";
            }
        }
    }
    matrixContent += " = " + firstRow[firstRow.length - 1].toFixed(4) + " \\\\ \n";

    // Otrā rinda
    for (let i = 0; i < secondRow.length - 1; i++) {
        if (secondRow[i] !== 0) {
            matrixContent += (secondRow[i] === 1 ? names[i] : secondRow[i].toFixed(4) + names[i]);
            if (i < secondRow.length - 2) {
                matrixContent += " + ";
            }
        }
    }
    matrixContent += " = " + secondRow[secondRow.length - 1].toFixed(4) + " \\\\ \n";

    // Līnija
    matrixContent += "\\hline\\\\ \n";

    // Trešā rinda
    for (let i = 0; i < thirdRow.length - 1; i++) {
        if (thirdRow[i] !== 0) {
            matrixContent += (thirdRow[i] === 1 ? names[i] : thirdRow[i].toFixed(4) + names[i]);
            if (i < thirdRow.length - 2) {
                matrixContent += " + ";
            }
        }
    }
    matrixContent += " = " + thirdRow[thirdRow.length - 1].toFixed(4) + " \\\\ \n";

    // Determine delimiters based on the position parameter:
    // 'start'  -> only a left bracket
    // 'end'    -> only a right bracket
    // 'middle' -> no extra delimiters
    // 'only'   -> both left and right brackets
    let leftDelim = "";
    let rightDelim = "";
    if (position === "start") {
        leftDelim = "\\left[";
        rightDelim = "\\right.";  // invisible right delimiter
    } else if (position === "end") {
        leftDelim = "\\left.";
        rightDelim = "\\right]";
    } else if (position === "only") {
        leftDelim = "\\left[";
        rightDelim = "\\right]";
    } // else, for "middle" or any other value, no delimiters

    // Build the complete LaTeX string.
    // Use the plain matrix environment so that our delimiters (if any) don't nest with built-in ones.
    let mathContent = "\\[";
    mathContent += leftDelim + "\\begin{matrix}\n";
    mathContent += matrixContent;
    mathContent += "\\end{matrix}" + rightDelim;
    if (showContinuation && (position === 'only' || position === 'end')) {
        mathContent += " \\Rightarrow";
    }
    mathContent += "\\]";

    div.innerHTML += `<span style="display:inline-block; margin-right:1em;">${mathContent}</span>`;
    MathJax.typeset();
}

function DisplaySolution(divId, solutions, names) {
    const div = document.getElementById(divId);

    let mathContent = "\\begin{cases}\n";

    for (let i = 0; i < names.length; i++) {
        mathContent += `${names[i]} = ${solutions[i].toFixed(4)} \\\\ \n`;
    }

    mathContent += '\\end{cases}';

    div.innerHTML += `<p>${mathContent}</p>`;
    MathJax.typeset();
}

function DisplayCheck(divId, matrix, names, checkArray, showContinuation) {
    const div = document.getElementById(divId);

    let mathContent = "\\[\\begin{cases}\n";

    for (let r = 0; r < matrix.length; r++) {
        let row = "";

        let nonZeroIndices = [];
        for (let c = 0; c < matrix[r].length - 1; c++) {
            if (matrix[r][c] !== 0) {
                nonZeroIndices.push(c);
            }
        }

        for (let i = 0; i < nonZeroIndices.length; i++) {
            let c = nonZeroIndices[i];

            if (checkArray[r] === 1) {
                if (matrix[r][c] === 1) {
                    row += names[c];
                } else {
                    row += ro(matrix[r][c]) + names[c];
                }
            } else {
                row += ro(matrix[r][c]);
            }

            row += ' &';

            if (i < nonZeroIndices.length - 1) {
                row += ' + &';
            }
        }

        row += ' = & ' + matrix[r][matrix[r].length - 1].toFixed(4);
        mathContent += row + '\\\\\n';
    }

    mathContent += '\\end{cases}';

    if (showContinuation) {
        mathContent += ' \\Rightarrow';
    }

    mathContent += '\\]';

    div.innerHTML += `<span style="display:inline-block; margin-right:1em;">${mathContent}</span>`;
    MathJax.typeset();
}

