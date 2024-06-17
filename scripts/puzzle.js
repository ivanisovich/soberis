const boardSize = 4;
let selected = [];
let orderList = [
   
];

function swapElements(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    element1.style.transform = `translate(${rect2.left - rect1.left}px, ${rect2.top - rect1.top}px)`;
    element1.style.transition = 'transform 0.3s ease-in-out';

    element2.style.transform = `translate(${rect1.left - rect2.left}px, ${rect1.top - rect2.top}px)`;
    element2.style.transition = 'transform 0.3s ease-in-out';

    window.requestAnimationFrame(() => {
        setTimeout(() => {
            element1.style.transition = 'none';
            element2.style.transition = 'none';

            element1.style.transform = 'none';
            element2.style.transform = 'none';

            const parent1 = element1.parentNode;
            const next1 = element1.nextSibling === element2 ? element1 : element1.nextSibling;
            element2.parentNode.insertBefore(element1, element2);
            parent1.insertBefore(element2, next1);

            updateIndexes(); // Обновление индексов после завершения анимации и перестановки
        }, 300);
    });
}

function areNeighbors(index1, index2) {
    const pieces = document.querySelectorAll('.puzzle-item');
    const id1 = parseInt(pieces[index1].getAttribute('data-index'));
    const id2 = parseInt(pieces[index2].getAttribute('data-index'));

    const [x1, y1] = [id1 % boardSize, Math.floor(id1 / boardSize)];
    const [x2, y2] = [id2 % boardSize, Math.floor(id2 / boardSize)];

    const isSameRowAndAdjacent = y1 === y2 && Math.abs(x1 - x2) === 1;
    const isSameColumnAndAdjacent = x1 === x2 && Math.abs(y1 - y2) === 1;

    return isSameRowAndAdjacent || isSameColumnAndAdjacent;
}

function updateIndexes() {
    const pieces = document.querySelectorAll('.puzzle-item');
    pieces.forEach((piece, index) => {
        piece.setAttribute('data-index', index);
    });
}

function addClickListeners() {
    document.querySelectorAll('.puzzle-item').forEach((piece) => {
        piece.addEventListener('click', () => {
            if (selected.length < 2) {
                piece.classList.add('selected'); // Добавляем класс для управления прозрачностью
                selected.push(piece.getAttribute('data-index'));
            }

            if (selected.length === 2) {
                const pieces = document.querySelectorAll('.puzzle-item');
                const [index1, index2] = selected.map(index => parseInt(index));
                const element1 = pieces[index1];
                const element2 = pieces[index2];

                if (areNeighbors(index1, index2)) {
                    swapElements(element1, element2);
                }

                // Убираем класс после обмена
                pieces.forEach(piece => piece.classList.remove('selected'));
                selected = [];
            }
        });
    });
}

function checkWin() {
    let isWin = true;
    const pieces = document.querySelectorAll('.puzzle-item');
    pieces.forEach((piece, index) => {
        if (parseInt(piece.getAttribute('data-index')) !== index) {
            isWin = false;
        }
    });

    if (isWin) {
        alert("Поздравляем! Вы выиграли!");
    }
}

function shufflePuzzle() {
    const container = document.getElementById('puzzle-container');
    for (let i = container.children.length; i >= 0; i--) {
        container.appendChild(container.children[Math.random() * i | 0]);
    }
    updateIndexes();
}

function solvePuzzle(index = 0) {
    if (index >= orderList.length) return;

    const { selector, order } = orderList[index];
    const element = document.querySelector(selector);
    element.style.order = order;

    setTimeout(() => {
        solvePuzzle(index + 1);
    }, 300); // интервал 300 миллисекунд
}

function executeSwaps() {
    setTimeout(function() {
        swapElements(document.querySelector(".puzzle-item:nth-child(1)"), document.querySelector(".puzzle-item:nth-child(2)"));
    }, 100);

    setTimeout(function() {
        swapElements(document.querySelector(".puzzle-item:nth-child(6)"), document.querySelector(".puzzle-item:nth-child(10)"));
    }, 500);

    setTimeout(function() {
        swapElements(document.querySelector(".puzzle-item:nth-child(7)"), document.querySelector(".puzzle-item:nth-child(8)"));
    }, 800);

    setTimeout(function() {
        swapElements(document.querySelector(".puzzle-item:nth-child(11)"), document.querySelector(".puzzle-item:nth-child(15)"));
    }, 1200);
}

function executeSwapsReverse() {
    setTimeout(function() {
        swapElements(document.querySelector(".puzzle-item:nth-child(11)"), document.querySelector(".puzzle-item:nth-child(15)"));
    }, 100);

    setTimeout(function() {
        swapElements(document.querySelector(".puzzle-item:nth-child(7)"), document.querySelector(".puzzle-item:nth-child(8)"));
    }, 500);

    setTimeout(function() {
        swapElements(document.querySelector(".puzzle-item:nth-child(6)"), document.querySelector(".puzzle-item:nth-child(10)"));
    }, 800);

    setTimeout(function() {
        swapElements(document.querySelector(".puzzle-item:nth-child(1)"), document.querySelector(".puzzle-item:nth-child(2)"));
    }, 1200);
}

function executeBothDirections() {
    executeSwaps();
    setTimeout(executeSwapsReverse, 2000); // Обратное выполнение через 2 секунды после завершения первой последовательности
}

// Запуск первой анимации сразу
executeBothDirections();

// Запуск выполнения команд в бесконечном цикле с задержкой
setInterval(executeBothDirections, 3600);

addClickListeners();

// Запуск автоматической сборки пазла
solvePuzzle();