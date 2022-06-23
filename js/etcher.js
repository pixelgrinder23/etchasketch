// Etch-a-Sketch

const container = document.querySelector('#container');
let square = document.createElement('div');
let cellsWide = 0;
let squareSide = 0;
let firstTime = 0;

container.style.cssText = 'border: 1px solid fuchsia; display: flex; width: 860px; height: 860px; justify-content: space-evenly; flex-wrap: wrap; margin: 1em;';

function createGrid(x) {
    for (j = 0; j < x; j++){
        for(i = 0; i < x; i++) {
            square = document.createElement('div');
            square.classList.add('squared');
            square.id = 'bg'+i;
            square.addEventListener('mouseenter', function(x) {
                console.log('entered');
                // ADD A CONDITIONAL HERE TO CHECK IF IT'S BEEN CHANGED ALREADY & NOT CHANGE IT AGAIN
                x.target.style.cssText = 'background-color: RGB('+randomRGB()+','+randomRGB()+','+randomRGB()+');'; // this is for random rainbow colours
                //x.target.classList.add('passed-over'); // this just makes it a single colour
            });
            container.appendChild(square);
        };
    };
}

function setWidth(x) {
    shakeToClear();
    if (firstTime > 1) {
        clearCells();
        console.log('clearance');
    };
    squareSide = (100 / x);
    document.documentElement.style.setProperty('--squareSide', `${squareSide}%`);
    createGrid(x);
}

function shakeToClear() {
    if (firstTime > 0) {
        document.getElementById('container').classList.add('shaker');
    };
    firstTime++;
    setTimeout(function() {
        document.querySelectorAll('.squared').forEach(cell => {
            cell.classList.remove('passed-over');
            //cell.classList.add('greyed');
            cell.style.cssText = 'background-color: grey;';
        });
        document.getElementById('container').classList.remove('shaker', 'greyed');
    }, 500);
}

function clearCells() {
    let removeCells = document.getElementsByClassName('squared');
    while (removeCells.length > 0) {
        removeCells[0].parentNode.removeChild(removeCells[0]);
    };
}

function requestRes() {
    cellsIn = prompt('How many cells square? (1-100)');
    cellsWide = parseInt(cellsIn);
    if (cellsWide > 100) {
        alert('Max resolution is 100 cells square!');
        requestRes();
    } else {
        setWidth(cellsWide);
    };
}

function randomRGB() {
    return Math.floor(Math.random() * 255)
}

document.getElementById('gridSize').addEventListener('click', () => {
    requestRes();
});

document.getElementById('shakeToClear').addEventListener('click', () => {
    shakeToClear();
});

requestRes();

// Add a button to switch between rainbow & fuschia