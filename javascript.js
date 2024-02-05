/**********************
    ETCH A SKETCH
**********************/
/**
 * Author: Jayden Traynor
 * Date: 5 February 2024
 */

const SCREEN_SIZE = 50;
let canvas = document.querySelector('.canvas');
let row = document.querySelector('.row');
let pixel = document.querySelector('.pixel');
let toolbar = document.querySelector('.toolbar');
let toolbarRow = document.querySelector('.toolbar-row');
let tool = document.querySelector('.tool');
let clearCanvasButton = document.querySelector('.clear-button');
let refreshColorsButton = document.querySelector('.color-button');
let canvasSizeButton = document.querySelector('.resolution-button');
let rainbowButton = document.querySelector('.rainbow-button');
let isDrawing = false;
let isRainbow = false;
let color = 'yellow';
//------------------------------------------------------

createCanvas(SCREEN_SIZE);
createToolBar(12, 2);


canvas.addEventListener('mousedown', e => {
    isDrawing = true;
    if(e.target.className === 'pixel') {
        e.target.style.background = color;
    }
});

canvas.addEventListener('mouseup', e => {
    isDrawing = false;
});

canvas.addEventListener('mouseover', e => {
    if(isDrawing === true && e.target.className === 'pixel') {
        if(isRainbow) {
            e.target.style.background = createRandomColor();
        } else {
            e.target.style.background = color;
        }
    }
});

toolbar.addEventListener('click', e => {
    if(e.target.className === 'tool') {
        color = e.target.style.backgroundColor;
        isRainbow = false;
    }
});

clearCanvasButton.addEventListener('click', e => {
    
    while(canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    createCanvas(SCREEN_SIZE);
});

refreshColorsButton.addEventListener('click', e => {

    while(toolbar.firstChild) {
        toolbar.removeChild(toolbar.firstChild);
    }
    createToolBar(12, 2);
});

canvasSizeButton.addEventListener('click', e => {
    let newSize = prompt("Enter a size between 1 - 100");
    if(newSize > 0 && newSize <= 100) {
        while(canvas.firstChild) {
            canvas.removeChild(canvas.firstChild);
        }
        createCanvas(newSize);
    } else {
        alert("Invalid input. Enter a number between 1 - 100");
    }
});

rainbowButton.addEventListener('click', e => {
    isRainbow = true;
});

function createCanvas(size) {
    for (let i = 0; i < size; i++) {
    
        let row = document.createElement('div');
        row.classList.add('row');
        canvas.appendChild(row);
    
        for (let j = 0; j < size; j++) {
            let pixel = document.createElement('div');
            pixel.classList.add('pixel');
            if((j % 2 === 0) && (i % 2 === 0)) {
                pixel.style.background = '#E9E9E9';
            } 
            if((j % 2 !== 0) && (i % 2 !== 0)) {
                pixel.style.background = '#E9E9E9'
            }
            row.appendChild(pixel);
        }
    }
}

function createToolBar(rows, collums) {

    for (let i = 0; i < rows; i++) {

        let toolbarRow = document.createElement('div');
        toolbarRow.classList.add('toolbar-row');
        toolbar.appendChild(toolbarRow);

        for (let j = 0; j < collums; j++) {

            let tool = document.createElement('div');
            tool.classList.add('tool');
            tool.style.background = createRandomColor();
            toolbarRow.appendChild(tool);
        }
    }
}

function createRandomColor() {
    const HEX_VALUES = '0123456789ABCDEF';
    let randomColor = '';
    for (let i = 0; i < 6; i++) {
        randomColor += HEX_VALUES[Math.floor(Math.random() * 16)];
    }
    return '#' + randomColor;
}

