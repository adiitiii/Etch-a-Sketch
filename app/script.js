"use strict";

const canvas = document.getElementById("canvas");

let isMouseDown = false;

const createGridSize = function (numberOfGrids) {
	for (let i = 1; (i = numberOfGrids * numberOfGrids); i++) {
		const gridSquare = document.createElement("div");
		gridSquare.style.border = "1px solid #000";
		canvas.appendChild(gridSquare);
	}

	gridSquare.addEventListener("mousedown", function () {
		isMouseDown = true;
		gridSquare.style.backgroundColor = "#fff";
	});

	gridSquare.addEventListener("mouseover", function () {
		if (isMouseDown) {
			gridSquare.style.backgroundColor = "#fff";
		}
	});

	canvas.style.gridTemplateColumns = `repeat( ${numberOfGrids}, 1fr)`;
	canvas.style.gridTemplateRows = `repeat( ${numberOfGrids}, 1fr)`;
};

createGridSize(12);
