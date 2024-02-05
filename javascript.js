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
let eraserButton = document.querySelector('.eraser-button');
let colorReplaceButton = document.querySelector('.color-replace-button');
let colorPicker = document.createElement('input');
colorPicker.type = 'color';
colorPicker.style.height = '100px';
colorPicker.style.width = '100px';
let isDrawing = false;
let isRainbow = false;
let isColorPicking = false;
let color = 'rgb(255, 255, 0)';
colorPicker.value = convertRGBtoHex(color);
let selectedColor = "#FFFFFF";
//------------------------------------------------------

createCanvas(SCREEN_SIZE);
createToolBar(12, 2);
toolbar.appendChild(colorPicker);

canvas.addEventListener('mousedown', e => {
    if (isColorPicking === false) {
        isDrawing = true;
        if(e.target.className === 'pixel') {
            e.target.style.background = color;
        }
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
        colorPicker.value = convertRGBtoHex(color);
        isRainbow = false;
        isColorPicking = false;
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
    toolbar.appendChild(colorPicker);
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
    isColorPicking = false;
});

eraserButton.addEventListener('click', e => {
    color = "rgb(255, 255, 255, 0)";
    isRainbow = false;
    isColorPicking = false;
});


colorReplaceButton.addEventListener('click', e => {
    
    isColorPicking = true;
    canvas.addEventListener('click', configureColorPicker);
    colorReplaceButton.disabled = true;

    function configureColorPicker(e) {
        if(e.target.className === 'pixel') {
            selectedColor = e.target.style.background;
            console.log(`You selected color: ${e.target.style.background}`);
            console.log(`converted: ${convertRGBtoHex(e.target.style.background)}`);
            colorReplaceButton.disabled = false;
            colorPicker.value = convertRGBtoHex(e.target.style.background);
            selectedColor = convertRGBtoHex(e.target.style.background);
            colorReplaceButton.style.background = selectedColor;
            canvas.removeEventListener('click', configureColorPicker);
        }
    }
});

colorPicker.addEventListener('change', e => {
    if(isColorPicking) {
        let pixels = document.querySelectorAll('.pixel');
        console.log(pixels);

        for(let pixel of pixels) {
            if(convertRGBtoHex(pixel.style.background) === selectedColor) {
                pixel.style.background = colorPicker.value;
            }
        }
    colorReplaceButton.style.background = '';
    isColorPicking = false;
    } else {
        color = colorPicker.value;
    }
});

//-----------------------------------------------------------

convertRGBtoHex("rgb(44, 234, 92)");

/**
 * @param {String} rgbColor - RGB string 
 * @returns {String} HEX string
 */
function convertRGBtoHex(rgbColor) {

    let hexArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexColor = '#';
    let rgbArray = extractRGBArray(rgbColor);
    
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









//-----------------------------------------------------------

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

