const defaultLetters = [ 'x', 'y', 'z', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];

function updateNameInputs(id, value) {
    const letterSpans = document.querySelectorAll(`span[id='n_${id}']`);

    letterSpans.forEach(span => {
        span.innerText = value;
    });
}

function validateMatrixInput(input) {
    input.value = input.value.replace(/[^0-9.-]/g, '');

    let dotCount = (input.value.match(/\./g) || []).length;
    if (dotCount > 1) {
        input.value = input.value.substring(0, input.value.lastIndexOf('.'));
    }

    if (input.value.indexOf('-') > 0) {
        input.value = input.value.replace(/-/g, '');
    }
}

function validateNameInput(input) {
    input.value = input.value.replace(/[^A-Za-z0-9]/g, '');

    if (input.value.length && /^[0-9]/.test(input.value)) {
        input.value = input.value.substring(1);
    }

    if (/^\d+$/.test(input.value)) {
        input.value = '';
    }
}

function generateInputs() {
    const size = document.getElementById("size").value;
    const nameDiv = document.getElementById("name_div");

    while(nameDiv.firstChild){
        nameDiv.removeChild(nameDiv.firstChild);
    }

    for (let i = 0; i < size; i++) {
        const input = document.createElement("input");
        input.type = 'text';
        input.id = `name_${i}`;
        input.value = defaultLetters[i] || `var${i+1}`;
        input.addEventListener('input', function() {
            validateNameInput(input);
        });
        input.onchange = function() {
            updateNameInputs(i, input.value);
        };
        nameDiv.appendChild(input);
    }
}

function generateMatrix() {
    const size = document.getElementById("size").value;
    const matrixDiv = document.getElementById("matrix_div");

    while(matrixDiv.firstChild){
        matrixDiv.removeChild(matrixDiv.firstChild);
    }

    let count = 1;
    for (let row = 1; row <= size; row++) {
        const rowDiv = document.createElement("div");

        for (let col = 0; col < size; col++) {

            const input = document.createElement("input");
            input.type = "text";
            input.id = `input_${row}_${col}_var`;

            input.addEventListener('input', function() {
                validateMatrixInput(input);
            });

            count++;

            const letterSpan = document.createElement("span");
            letterSpan.id = `n_${col}`;
            letterSpan.innerText = defaultLetters[col] || `var${col + 1}`;

            const plusSign = document.createElement("span");
            plusSign.innerText = "+";

            rowDiv.appendChild(input);
            rowDiv.appendChild(letterSpan);
            if (col < size - 1) rowDiv.appendChild(plusSign);

            if (col === size - 1) {
                const equalsSign = document.createElement("span");
                equalsSign.innerText = "=";

                const resultInput = document.createElement("input");
                resultInput.type = "text";
                resultInput.addEventListener('input', function() {
                    validateMatrixInput(resultInput);
                });
                resultInput.id = `input_${row}_result`;

                rowDiv.appendChild(equalsSign);
                rowDiv.appendChild(resultInput);

            }
        }

        matrixDiv.appendChild(rowDiv);
        matrixDiv.appendChild(document.createElement("br"));
    }
}
