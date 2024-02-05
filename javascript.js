/**********************
    ETCH A SKETCH
**********************/
/**
 * Author: Jayden Traynor
 * Date: 5 February 2024
 */

const SCREEN_SIZE = 50;
let color = '#FFFF00';
let selectedColor = '#FFFF00';
// Flags:
let isDrawing = false;
let isRainbow = false;
let isColorPicking = false;
// Canvas:
let canvas = document.querySelector('.canvas');
let row = document.querySelector('.row');
let pixel = document.querySelector('.pixel');
// Toolbar:
let toolbar = document.querySelector('.toolbar');
let colorSwatch = document.querySelector('.color-swatch');
let swatchRow = document.querySelector('.swatch-row');
let swatchPixel = document.querySelector('.swatch-pixel');
let toolbox = document.querySelector('.tool-box');
let colorPicker = document.querySelector('.color-picker');
// Buttons:
let clearCanvasButton = document.querySelector('.clear-button');
let refreshColorsButton = document.querySelector('.color-button');
let canvasSizeButton = document.querySelector('.resolution-button');
let rainbowButton = document.querySelector('.rainbow-button');
let eraserButton = document.querySelector('.eraser-button');
let colorReplaceButton = document.querySelector('.color-replace-button');

//------------------------------------------------------

createCanvas(SCREEN_SIZE);
createColorSwatch(12, 4);

// CANVAS DRAWING
canvas.addEventListener('mousedown', e => {
    e.preventDefault();
    console.log('mouse down triggered');
    if (isColorPicking === false) {
        isDrawing = true;
        if(e.target.className === 'pixel') {
            e.target.style.background = color;
        }
    }
});

document.addEventListener('mouseup', e => {
    isDrawing = false;
});

canvas.addEventListener('mouseover', e => {
    if(isDrawing === true) {
        if(isRainbow) {
            e.target.style.background = createRandomColor();
        } else {
            e.target.style.background = color;
        }
    }
});

// COLOR SWATCH
colorSwatch.addEventListener('click', e => {
    if(e.target.className === 'swatch-pixel') {
        color = e.target.style.backgroundColor;
        colorPicker.value = convertRGBtoHex(color);
        resetState();
    }
});

// COLOR PICKER
colorPicker.addEventListener('change', e => {
    if(isColorPicking) {
        let pixels = document.querySelectorAll('.pixel');

        for(let pixel of pixels) {
            if(convertRGBtoHex(pixel.style.background) === selectedColor) {
                pixel.style.background = colorPicker.value;
            }
        }
        color = colorPicker.value;
        resetState();
    } else {
        color = colorPicker.value;
    }
});

// BUTTONS
clearCanvasButton.addEventListener('click', e => {
    
    while(canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    createCanvas(SCREEN_SIZE);
});

refreshColorsButton.addEventListener('click', e => {

    while(colorSwatch.firstChild) {
        colorSwatch.removeChild(colorSwatch.firstChild);
    }
    createColorSwatch(12, 4);
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
    resetState();
    isRainbow = true;
    rainbowButton.classList.add('highlight');
});

eraserButton.addEventListener('click', e => {
    resetState();
    color = "rgb(255, 255, 255, 0)";
    eraserButton.classList.add('highlight');
});

colorReplaceButton.addEventListener('click', e => {
    
    resetState();
    isColorPicking = true;
    colorReplaceButton.disabled = true;
    canvas.classList.add('cursor-color-picker');
    console.log('asdasdasd');
    canvas.addEventListener('click', configureColorReplacer);

    function configureColorReplacer(e) {
        if(e.target.className === 'pixel') {
            colorPicker.value = convertRGBtoHex(e.target.style.background);
            colorPicker.classList.add('highlight');
            selectedColor = convertRGBtoHex(e.target.style.background);
            colorReplaceButton.style.background = e.target.style.background;
            colorReplaceButton.disabled = false;
            canvas.classList.remove('cursor-color-picker');
            canvas.removeEventListener('click', configureColorReplacer);
            
        }
    }
});




/* FUNCTIONS **************************************/

/**
 * @param {String} rgbColor - RGB string 
 * @returns {String} HEX string
 */
function convertRGBtoHex(rgbColor) {

    let hexArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexColor = '#';
    let rgbArray = extractRGBArray(rgbColor);
    
    if (!rgbColor) {
        return '#FFFFFF';
    }
    for (let i = 0; i < rgbArray.length; i++) {
        hexColor += hexArray[rgbArray[i]];
    }
    return hexColor;

    /**
     * @param {String} color RGB string
     * @returns {Number[]} Base 10 HEX array
     */
    function extractRGBArray(color) {
    
        let array = [];
        let rgbArray = [];
        array = color.slice(4, color.length-1).replaceAll(', ', ' ').split(' ');
        for (let i = 0; i < array.length; i++) {
            let first = Math.floor((array[i] / 16));  
            rgbArray.push(first);
            let second = Math.floor((((array[i] / 16) - (Math.floor(array[i] / 16))) * 16));
            rgbArray.push(second);
        }
        return rgbArray;
    }
}

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

function createColorSwatch(rows, collums) {

    for (let i = 0; i < rows; i++) {

        let swatchRow = document.createElement('div');
        swatchRow.classList.add('swatch-row');
        colorSwatch.appendChild(swatchRow);

        for (let j = 0; j < collums; j++) {

            let swatchPixel = document.createElement('div');
            swatchPixel.classList.add('swatch-pixel');
            swatchPixel.style.background = createRandomColor();
            swatchRow.appendChild(swatchPixel);
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

function resetState() {
    isColorPicking = false;
    colorReplaceButton.style.background = '';
    isDrawing = false;
    isRainbow = false;
    canvas.classList.remove('cursor-color-picker');
    let highlightedElements = document.querySelectorAll('.highlight');
    for(let element of highlightedElements) {
        element.classList.remove('highlight');
    }
}