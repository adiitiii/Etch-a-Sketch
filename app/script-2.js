"use strict";

const rangeSlider = document.querySelector(".esketch__range__slider");
const canvas = document.getElementById("canvas");
const gridCheckbox = document.getElementById("gridCheckbox");
const colorPalette = document.querySelector(".esketch-mode-color-palette");
const rainbowModeBox = document.querySelector(".esketch-mode-rainbow");
const colorModeBox = document.querySelector(".esketch-mode-color");
const erasorModeBox = document.querySelector(".esketch-erasor");
const clearModeBox = document.querySelector(".esketch-all-clear");

let isMouseDown = false;
let currentColor = "#000";
let currentMode = "color";
let currentGridValue = 16;

const clearAllGrid = function () {
	canvas.innerHTML = "";
};

rangeSlider.addEventListener("mousemove", () => {
	const gridValueEL = document.querySelector(".esketch__range__number");
	gridValueEL.textContent = `${rangeSlider.value} x ${rangeSlider.value}`;
	currentGridValue = rangeSlider.value;

	clearAllGrid();

	createNewGrid(currentGridValue);
});

const clearAllColor = function () {
	clearAllGrid();
	createNewGrid(currentGridValue);
};

const createNewGrid = function (numberOfGrids) {
	for (let i = 0; i < numberOfGrids * numberOfGrids; i++) {
		const gridSquare = document.createElement("div");
		gridSquare.classList.add("grid-square");
		canvas.appendChild(gridSquare);

		gridSquare.addEventListener("mousedown", (e) => {
			isMouseDown = true;
			changeColor(e); // Change background color on mousedown
		});

		gridSquare.addEventListener("mouseover", (e) => {
			if (isMouseDown) {
				changeColor(e); // Change background color on mouseover
			}
		});
	}

	// Setting the divs
	canvas.style.gridTemplateRows = `repeat(${currentGridValue}, 1fr)`;
	canvas.style.gridTemplateColumns = `repeat(${currentGridValue}, 1fr)`;
};

gridCheckbox.addEventListener("click", function () {
	// Check if the checkbox is checked
	if (gridCheckbox.checked) {
		// If checked, add the class to show borders
		canvas.classList.add("show-grid-lines2");
	} else {
		// If not checked, remove the class to hide borders
		canvas.classList.remove("show-grid-lines2");
	}
});

/* COLOR MODE STRATEGY

WHAT TO DO?
1. user clicks on palette
2. selects a color from palette
3. the written "color mode" gets colored with the selected color by user
4. (IMP) the pixels, when mouse is over them colors the same color selected

HOW TO DO?
1. put a event listener on the class (done)
2. grab the value of the color (done)
3. change the font color of specified word (done)
4. set the background color of pixels to that color
*/

//color mode

colorPalette.addEventListener("input", () => {
	currentColor = colorPalette.value;
	const hexCode = document.querySelector(
		".esketch-mode-color-palette-hexcode"
	);
	hexCode.textContent = currentColor;
});

const changeColor = function (e) {
	const gridSquare = e.target;
	if (currentMode === "color") {
		gridSquare.style.backgroundColor = `${currentColor}`;
	} else if (currentMode === "rainbow") {
		const randomR = Math.floor(Math.random() * 256);
		const randomG = Math.floor(Math.random() * 256);
		const randomB = Math.floor(Math.random() * 256);
		gridSquare.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
	} else if (currentMode === "erasor") {
		gridSquare.style.backgroundColor = "#d8d8d8";
	}
};

colorModeBox.addEventListener("click", function () {
	currentMode = "color";
});

rainbowModeBox.addEventListener("click", function () {
	currentMode = "rainbow";
});

erasorModeBox.addEventListener("click", function () {
	currentMode = "erasor";
});

clearModeBox.addEventListener("click", function () {
	clearAllGrid();
	isMouseDown = true;
	createNewGrid(currentGridValue);
});

createNewGrid(16);

window.onload = function () {
	gridCheckbox.checked;
};
