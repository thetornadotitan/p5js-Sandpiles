let canvas;
let container;

let grid;
let gridSize;
let gridResolution;


function setup() {
	container = select(".container");
	canvas = createCanvas(container.width, container.width);
	canvas.parent(container);

	gridSize = 50;
	gridResolution = width / gridSize;
	grid = Create2DArray(gridSize, gridSize);
	//grid[gridSize / 2][gridSize / 2] = 3000;
	background(0);
}

function draw() {
	let nextGrid = Create2DArray(gridSize, gridSize);

	if (mouseButton === LEFT) {
		let x = Math.floor(mouseX / gridResolution);
		let y = Math.floor(mouseY / gridResolution);

		if (x >= 0 && x < gridSize && y >= 0 && y < gridSize)
			grid[x][y] += 10;
	}

	//Display current grid and calc next grid
	for (let x = 0; x < gridSize; x++) {
		for (let y = 0; y < gridSize; y++) {
			//calc
			nextGrid[x][y] += grid[x][y];
			if (grid[x][y] >= 4) {
				nextGrid[x][y] -= 4;

				if (x - 1 >= 0)
					nextGrid[x - 1][y] += 1;
				if (x + 1 < gridSize)
					nextGrid[x + 1][y] += 1;
				if (y - 1 >= 0)
					nextGrid[x][y - 1] += 1;
				if (y + 1 < gridSize)
					nextGrid[x][y + 1] += 1;
			}
		}
	}

	for (let x = 0; x < gridSize; x++) {
		for (let y = 0; y < gridSize; y++) {
			//Only redraw when needed - Big Performance boost !important
			if (nextGrid[x][y] != grid[x][y]) {
				fill(GetGridColor(nextGrid[x][y]));
				noStroke();
				rect(x * gridResolution, y * gridResolution, gridResolution, gridResolution);
			}
		}
	}

	grid = nextGrid;
}

function mouseReleased() {
	mouseButton = null;
}

function Create2DArray(cols, rows) {
	let result = [];
	for (let x = 0; x < cols; x++) {
		result.push([]);
		for (let y = 0; y < rows; y++) {
			result[x].push(0);
		}
	}
	return result;
}

function GetGridColor(val) {
	let c;
	switch (val) {
		case 0:
			c = color(0, 0, 0);
			break;
		case 1:
			c = color(100, 100, 0);
			break;
		case 2:
			c = color(150, 150, 0);
			break;
		case 3:
			c = color(200, 200, 0);
			break;
		default:
			c = color(255, 255, 0);
			// >= 4
			break;
	}
	return c;
}

function windowResized() {
	resizeCanvas(container.width, container.width);

	gridSize = 50;
	gridResolution = width / gridSize;
	grid = Create2DArray(gridSize, gridSize);
	//grid[gridSize / 2][gridSize / 2] = 3000;
	background(0);
}