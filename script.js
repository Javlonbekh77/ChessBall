// Global variables for game state and board representation
const matrix = [[], [], [], [], [], [], [], [], [], [], []]; // 11x9 grid for the game board
const matrixContent = document.querySelector('.main-matrix');
const squadsBoard = matrixContent.querySelectorAll('.squad');
const squads = document.querySelectorAll('.squad');
const ball = document.querySelector('.ball');
const blackPieces = document.querySelectorAll('.black-pieces');
const whitePieces = document.querySelectorAll('.white-pieces');

// Stores the initial positions of the pieces to reset the board after a goal
const Pieces = {
	black: {
		bishop: [[0, 0], [0, 0], [0, 0]],
		knight: [],
	},
	white: {
		bishop: [[0, 0], [0, 0], [0, 0]],
		knight: [],
	},
};

let isGameStarted = false; // Flag to check if the game has started
let totalDurationInSeconds = 600; // Total game time in seconds
let initialTimeInMinutes = 10; // Initial time for the timer
let Dots = false; // Flag to check if movement dots are displayed
let isBlackTurn = Math.random() < 0.5; // Randomly determine which player starts

const plus = document.querySelectorAll('.pluss')[1];
const minus = document.querySelectorAll('.pluss')[0];

// Event listener to increase the game time before starting
plus.addEventListener('click', () => {
	if (!isGameStarted) {
		initialTimeInMinutes++;
		document.querySelector('.time').innerHTML = `${initialTimeInMinutes}:00`;
		totalDurationInSeconds += 60;
	}
});

// Event listener to decrease the game time before starting
minus.addEventListener('click', () => {
	if (!isGameStarted && initialTimeInMinutes > 1) {
		initialTimeInMinutes--;

		if (initialTimeInMinutes < 10) document.querySelector('.time').innerHTML = `0${initialTimeInMinutes}:00`;
		else document.querySelector('.time').innerHTML = `${initialTimeInMinutes}:00`;
		totalDurationInSeconds -= 60;
	}
});

// Function to show the initial popup asking if the user knows how to play
function showHowToPlayPopup() {
	document.querySelector('.container').style.filter = 'blur(4px)';
	document.querySelector('.main-container').style.display = 'flex';
	document.querySelector('.Yes').addEventListener('click', () => {
		document.querySelector('.container').style.filter = 'blur(0px)';
		document.querySelector('.main-container').style.display = 'none';
	});
	document.querySelector('.No').addEventListener('click', () => {
		window.location.href = 'https://chessball.my.canva.site/'; // Redirects to a tutorial page
	});
}

setTimeout(showHowToPlayPopup, 3000);

// --- Board and Piece Setup ---

// Function to set up the initial coloring of the board
squadsBoard.forEach((item, index) => {
	if (index % 2 == 0) item.classList.add('white');
});

// Initialize the turn indicator twice to set the correct starting color
toggleTurn();
toggleTurn();

// Populate the matrix with the board squares
squadsBoard.forEach((item, idx) => {
	let j = Math.floor(idx / 9) + 1;
	matrix[j].push(item);
});

// Function to place the pieces in their starting positions
function initialPieceSetup() {
	// Set up goal zones
	for (let i = 0; i < 9; i++) {
		if (2 < i && i < 6) {
			matrix[0].push(squads[i - 2]);
		} else matrix[0].push(0);
	}
	for (let i = 0; i < 9; i++) {
		if (2 < i && i < 6) {
			matrix[10].push(squads[87 - 5 + i]);
		} else matrix[10].push(0);
	}

	// Place rooks, bishops, knights, and the ball
	matrix[1][4].innerHTML = '<img class="black-pieces black-rook black rook" src="./images/pieces/black/rook.png" alt="">';
	matrix[9][4].innerHTML = '<img class="white-pieces whitee rook" src="./images/pieces/white/rook.png" alt="">';

	matrix[6][1].innerHTML = '<img class="white-pieces piece whitee bishop" src="./images/pieces/white/bishop.png" alt="">';
	matrix[6][0].innerHTML = '<img class="white-pieces piece whitee bishop" src="./images/pieces/white/bishop.png" alt="">';
	matrix[6][2].innerHTML = '<img class="white-pieces piece bishop whitee" src="./images/pieces/white/bishop.png" alt="">';

	matrix[5][3].innerHTML = '<img class="white-pieces piece whitee" src="./images/pieces/white/knight.png" alt="">';
	matrix[5][5].innerHTML = '<img class="black-pieces piece black" src="./images/pieces/black/knight.png" alt="">';

	matrix[4][0].innerHTML = '<img class="black-pieces piece black bishop" src="./images/pieces/black/bishop.png" alt="">';
	matrix[4][1].innerHTML = '<img class="black-pieces piece black bishop" src="./images/pieces/black/bishop.png" alt="">';
	matrix[4][2].innerHTML = '<img class="black-pieces piece black bishop" src="./images/pieces/black/bishop.png" alt="">';

	matrix[5][4].innerHTML = '<img src="./images/ball.jpg" alt="" class="ball">';
}

// Function to handle piece movement before the game starts (for setup)
function setupPieceMovement(x, y) {
	selectedItems = [x, y];
	Dots = true;
	if (y < 5) {
		for (let i = 1; i < 6; i++) {
			matrix[i].forEach((item, index) => {
				if (item.innerHTML == '') {
					if ((i == 2 || i == 1) && index > 2 && index < 6) console.log('adf');
					else item.innerHTML = "<div class='dot-action'></div>";
				}
			});
		}
	} else if (y > 5) {
		for (let i = 5; i < 10; i++) {
			matrix[i].forEach((item, index) => {
				if (item.innerHTML == '') {
					if ((i == 9 || i == 8) && index > 2 && index < 6) console.log('adf');
					else item.innerHTML = "<div class='dot-action'></div>";
				}
			});
		}
	} else if (y == 5) {
		if (matrix[y][x].childNodes[0].classList.contains('white-pieces')) {
			for (let i = 5; i < 10; i++) {
				matrix[i].forEach((item, index) => {
					if (item.innerHTML == '') {
						if ((i == 9 || i == 8) && index > 2 && index < 6) console.log('adf');
						else item.innerHTML = "<div class='dot-action'></div>";
					}
				});
			}
		} else {
			for (let i = 1; i < 6; i++) {
				matrix[i].forEach((item, index) => {
					if (item.innerHTML == '') {
						if ((i == 2 || i == 1) && index > 2 && index < 6) console.log('adf');
						else item.innerHTML = "<div class='dot-action'></div>";
					}
				});
			}
		}
	}
}

// Function to rebuild the matrix after a goal is scored
function buildMatrix() {
	matrix[1][4].innerHTML = '<img class=" black-rook black rook" src="./images/pieces/black/rook.png" alt="">';
	matrix[9][4].innerHTML = '<img class=" whitee rook" src="./images/pieces/white/rook.png" alt="">';

	Pieces.black.bishop.forEach(item => {
		let y = item[0];
		let x = item[1];
		matrix[y][x].innerHTML = '<img class="black-pieces piece black bishop" src="./images/pieces/black/bishop.png" alt="">';
	});
	Pieces.white.bishop.forEach(item => {
		let y = item[0];
		let x = item[1];
		matrix[y][x].innerHTML = '<img class="white-pieces piece whitee bishop" src="./images/pieces/white/bishop.png" alt="">';
	});
	let bkx, bky;
	bkx = Pieces.black.knight[1];
	bky = Pieces.black.knight[0];
	let wkx, wky;
	wkx = Pieces.white.knight[1];
	wky = Pieces.white.knight[0];
	matrix[bky][bkx].innerHTML = '<img class="black-pieces piece black" src="./images/pieces/black/knight.png" alt="">';
	matrix[wky][wkx].innerHTML = '<img class="white-pieces piece whitee" src="./images/pieces/white/knight.png" alt="">';
	matrix[5][4].innerHTML = '<img src="./images/ball.jpg" alt="" class="ball">';
}

let oldClickHandlers = [];

// --- Game Rules and Event Handlers ---

// Function to set up the initial rules for piece placement before the game starts
function initialRules() {
	squadsBoard.forEach((item, index) => {
		const handler = () => {
			if (item.childNodes[0]) {
				if (item.childNodes[0].classList.contains('dot-action')) {
					moveItems = [index % 9, Math.floor(index / 9) + 1];
					replacePieces();
				} else if (item.childNodes[0].classList.contains('piece') && Dots == false) {
					setupPieceMovement(index % 9, Math.floor(index / 9) + 1);
				} else {
					clearAllDots();
				}
			} else {
				clearAllDots();
			}
		};

		item.addEventListener('click', handler);
		oldClickHandlers.push({ element: item, handler });
	});
}

// Function to remove the initial event listeners
function removeInitialRules() {
	oldClickHandlers.forEach(({ element, handler }) => {
		element.removeEventListener('click', handler);
	});
	oldClickHandlers = [];
}

// Function to set up the main game rules and event listeners
function mainGameRules() {
	squadsBoard.forEach((item, index) => {
		item.addEventListener('click', () => {
			if (item.childNodes[0]) {
				if (item.childNodes[0].classList.contains('rook') && Dots == false) {
					handleRook(item.childNodes[0], index % 9, Math.floor(index / 9) + 1);
				} else if (item.childNodes[0].classList.contains('dot-action')) {
					moveItems = [index % 9, Math.floor(index / 9) + 1];
					replacePieces();
				} else if (item.childNodes[0].classList.contains('ball') && Dots == false) {
					if (isPieceAround(index % 9, Math.floor(index / 9) + 1))
						handleBall(index % 9, Math.floor(index / 9) + 1);
				} else if (item.childNodes[0].classList.contains('piece') && Dots == false) {
					if (
						(item.childNodes[0].classList.contains('black') && isBlackTurn) ||
						(item.childNodes[0].classList.contains('whitee') && isBlackTurn == false)
					)
						handlePiece(index % 9, Math.floor(index / 9) + 1);
				} else {
					clearAllDots();
				}
			} else {
				clearAllDots();
			}
		});
	});
}

initialRules(); // Set up initial piece placement rules

// --- Game Start ---

document.querySelector('.btn-start').addEventListener('click', () => {
	document.querySelector('.btn-start').style.display = 'none';
	document.querySelectorAll('.pluss').forEach(item => {
		item.style.display = 'none';
	});
	startTimer();
	cloneMatrix();
	isGameStarted = true;
	removeInitialRules(); // Remove initial setup event listeners
	mainGameRules(); // Add main game event listeners
});

// Function to store the initial positions of the pieces
function cloneMatrix() {
	let row = 0;
	for (let i = 2; i <= 5; i++) {
		matrix[i].forEach((item, index) => {
			if (
				item.childNodes[0] &&
				item.childNodes[0].classList.contains('black-pieces') &&
				item.childNodes[0].classList.contains('bishop')
			) {
				Pieces.black.bishop[row] = [i, index];
				row++;
			} else if (
				item.childNodes[0] &&
				item.childNodes[0].classList.contains('black-pieces')
			) {
				Pieces.black.knight = [i, index];
			}
		});
	}
	row = 0;
	for (let i = 5; i < 9; i++) {
		matrix[i].forEach((item, index) => {
			if (
				item.childNodes[0] &&
				item.childNodes[0].classList.contains('white-pieces') &&
				item.childNodes[0].classList.contains('bishop')
			) {
				Pieces.white.bishop[row] = [i, index];
				row++;
			} else if (
				item.childNodes[0] &&
				item.childNodes[0].classList.contains('white-pieces')
			) {
				Pieces.white.knight = [i, index];
			}
		});
	}
}

initialPieceSetup();

const pieces = document.querySelectorAll('img');
const canMovePieces = document.querySelectorAll('.piece');
const rook = document.querySelectorAll('.rook');

// --- Piece Movement Logic ---

// Function to show movement dots for a selected piece
function showDots(y, x, name) {
	Dots = true;
	if (name == 'rook') {
		if (2 < x - 1 && matrix[y][x - 1].innerHTML == '') {
			matrix[y][x - 1].innerHTML = "<div class='dot-action'></div>";
		}
		if (x + 1 < 6 && matrix[y][x + 1].innerHTML == '') {
			matrix[y][x + 1].innerHTML = "<div class='dot-action'></div>";
		}
	}
}

// Function to clear all movement dots from the board
function clearAllDots() {
	Dots = false;
	selectedItems = [];
	squads.forEach(item => {
		if (
			item.childNodes[0] &&
			item.childNodes[0].classList.contains('dot-action')
		)
			item.childNodes[0].remove();
	});
}

let selectedItems = [];
let moveItems = [];

// Function to handle rook movement
function handleRook(rook, x, y) {
	if (Dots == false) {
		if (
			(rook.classList.contains('black') && isBlackTurn) ||
			(rook.classList.contains('whitee') && isBlackTurn == false)
		) {
			selectedItems = [x, y];
			showDots(y, x, 'rook');
		}
	} else clearAllDots();
}

const surroundingSquares = [[0, 0], [0, 1], [1, 0], [1, 1], [2, 1], [2, 0], [1, 2], [0, 2]];

// Function to handle ball movement
function handleBall(x, y) {
	let option;
	if (isBlackTurn) option = 'black';
	else option = 'whitee';
	Dots = true;
	selectedItems = [x, y];
	let column = x - 1;
	let row = y + 1;

	// Check horizontal, vertical, and diagonal paths for the ball
	while (column >= 0 && (matrix[y][column].innerHTML == '' || (matrix[y][column] && matrix[y][column].childNodes[0].classList.contains(`${option}`)))) {
		if (matrix[y][column].innerHTML == '') matrix[y][column].innerHTML = "<div class='dot-action'></div>";
		column--;
	}
	column = x + 1;
	while (column <= 8 && (matrix[y][column].innerHTML == '' || (matrix[y][column] && matrix[y][column].childNodes[0].classList.contains(`${option}`)))) {
		if (matrix[y][column].innerHTML == '') matrix[y][column].innerHTML = "<div class='dot-action'></div>";
		column++;
	}
	while (row <= 10 && (matrix[row][x].innerHTML == '' || (matrix[row][x] && matrix[row][x].childNodes[0].classList.contains(`${option}`)))) {
		if (matrix[row][x].innerHTML == '')
			if (row == 10 && y > 5 && isBlackTurn) {
				matrix[row][x].innerHTML = "<div style='background-color: white;' class='white-dot dot-action'></div>";
			} else matrix[row][x].innerHTML = "<div class='dot-action'></div>";
		row++;
	}
	row = y - 1;
	while (row >= 0 && (matrix[row][x].innerHTML == '' || (matrix[row][x] && matrix[row][x].childNodes[0].classList.contains(`${option}`)))) {
		if (matrix[row][x].innerHTML == '')
			if (row == 0 && y < 5 && !isBlackTurn)
				matrix[row][x].innerHTML = "<div style='background-color: white;' class='white-dot dot-action'></div>";
			else matrix[row][x].innerHTML = "<div class='dot-action'></div>";
		row--;
	}

	for (let i = 0; i < 4; i++) {
		items = surroundingSquares[i];
		if (items[0] == 0) column = x - 1;
		else column = x + 1;
		if (items[1] == 0) row = y - 1;
		else row = y + 1;
		while (
			0 <= column &&
			column <= 9 &&
			0 < row &&
			row < 10 &&
			matrix[row][column] &&
			(matrix[row][column].innerHTML == '' || matrix[row][column].childNodes[0].classList.contains(`${option}`))
		) {
			if (matrix[row][column].innerHTML == '') {
				if (column == 5 && row == 9 && 10 > y && y > 5 && isBlackTurn) {
					matrix[row + 1][column].innerHTML = "<div style='background-color: white;' class='white-dot dot-action'></div>";
				}
				if (column == 4 && row == 9 && 10 > y && y > 5 && isBlackTurn) {
					matrix[row + 1][column].innerHTML = "<div style='background-color: white;' class='white-dot dot-action'></div>";
				}
				if (column == 3 && row == 9 && 10 > y && y > 5 && isBlackTurn)
					matrix[row + 1][column].innerHTML = "<div style='background-color: white;' class='white-dot dot-action'></div>";
				if (column == 5 && row == 1 && 5 > y && y > 0 && !isBlackTurn)
					matrix[row - 1][column].innerHTML = "<div style='background-color: white;' class='white-dot dot-action'></div>";
				if (column == 3 && row == 1 && 5 > y && y > 0 && !isBlackTurn)
					matrix[row - 1][column].innerHTML = "<div style='background-color: white;' class='white-dot dot-action'></div>";
				matrix[row][column].innerHTML = "<div class='dot-action'></div>";
				if (column == 4 && row == 1 && 5 > y && y > 0 && !isBlackTurn)
					matrix[row - 1][column].innerHTML = "<div style='background-color: white;' class='white-dot dot-action'></div>";
				matrix[row][column].innerHTML = "<div class='dot-action'></div>";
			}
			if (items[0] == 0) column--;
			else column++;
			if (items[1] == 0) row--;
			else row++;
		}
	}
}

// Function to handle bishop and knight movement
function handlePiece(x, y) {
	Dots = true;
	selectedItems = [x, y];
	let row, column;
	for (let i = 0; i < 8; i++) {
		items = surroundingSquares[i];
		if (items[0] == 0) column = x - 1;
		else if (items[0] == 2) column = x;
		else column = x + 1;
		if (items[1] == 0) row = y - 1;
		else if (items[1] == 2) row = y;
		else row = y + 1;
		if (
			0 <= column &&
			column <= 9 &&
			0 <= row &&
			row <= 10 &&
			matrix[row][column] &&
			matrix[row][column].innerHTML == ''
		)
			matrix[row][column].innerHTML = "<div class='dot-action'></div>";
	}
}

// Function to check if a piece of the current player is around the ball
function isPieceAround(x, y) {
	let row, column, option;
	if (isBlackTurn) option = 'black';
	else option = 'whitee';
	for (let i = 0; i < 8; i++) {
		items = surroundingSquares[i];
		if (items[0] == 0) column = x - 1;
		else if (items[0] == 2) column = x;
		else column = x + 1;
		if (items[1] == 0) row = y - 1;
		else if (items[1] == 2) row = y;
		else row = y + 1;
		if (
			!(
				0 <= column &&
				column <= 9 &&
				0 <= row &&
				row <= 10 &&
				matrix[row][column] &&
				matrix[row][column].innerHTML == ''
			)
		)
			if (
				0 <= column &&
				column <= 9 &&
				0 <= row &&
				row <= 10 &&
				matrix[row][column] &&
				matrix[row][column].childNodes[0].classList.contains(`${option}`)
			)
				return true;
	}
	return false;
}

let whiteScore = 0,
	blackScore = 0;

// Function to switch turns between players
function toggleTurn() {
	isBlackTurn = !isBlackTurn;
	if (isBlackTurn) {
		document.querySelector('.move-color-black').innerHTML = 'Black';
	} else document.querySelector('.move-color-black').innerHTML = 'White';
}

// Function to move a piece to a new square
function replacePieces() {
	let x1 = selectedItems[0], y1 = selectedItems[1], x2 = moveItems[0], y2 = moveItems[1];
	matrix[y2][x2].innerHTML = matrix[y1][x1].innerHTML;
	matrix[y1][x1].innerHTML = '';
	clearAllDots();
	if (isGameStarted) toggleTurn();
}

const scores = document.querySelectorAll('.score');

let isPenalty = false;

// Event listener to handle goal scoring
window.addEventListener('click', e => {
	if (
		Dots &&
		(e.target.classList.contains('white-dot') ||
			(e.target.childNodes[0] &&
				e.target.childNodes[0].classList.contains('white-dot')))
	) {
		if (e.target.classList.contains('white-dot')) {
			e.target.parentElement.innerHTML = matrix[selectedItems[1]][selectedItems[0]].innerHTML;
		} else {
			e.target.innerHTML = matrix[selectedItems[1]][selectedItems[0]].innerHTML;
		}
		matrix[selectedItems[1]][selectedItems[0]].innerHTML = '';
		clearAllDots();
		selectedItems = [];
		document.querySelector('.goall').style.display = 'flex';

		setTimeout(() => {
			if (isBlackTurn) {
				scores[1].textContent = blackScore + 1;
				blackScore++;
			} else {
				scores[0].textContent = whiteScore + 1;
				whiteScore++;
			}
			if (!isPenalty) {
				clearMatrix();
				buildMatrix();
			} else console.log('nima');
			toggleTurn();
		}, 2000);
	}
});

// --- Game State Management ---

// Function to clear the board
function clearMatrix() {
	document.querySelector('.goall').style.display = 'none';
	squads.forEach(item => {
		item.innerHTML = '';
	});
}

// Function to start the game timer
function startTimer() {
	let timerInterval;
	clearInterval(timerInterval);
	let timeLeft = totalDurationInSeconds;

	timerInterval = setInterval(() => {
		const minutes = Math.floor(timeLeft / 60);
		const seconds = timeLeft % 60;
		if (timeLeft >= 0)
			document.querySelector('.time').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

		if (timeLeft < -3) {
			if (blackScore == whiteScore) {
				isPenalty = true;
				startPenaltyShootout();
			} else {
				showWinningScreen();
			}
			clearInterval(timerInterval);
		}
		timeLeft--;
	}, 1000);
}

// Function to display the winning screen
function showWinningScreen() {
	document.querySelector('body').style.padding = '0px';
	document.querySelector('.container').style.display = 'none';
	document.querySelector('.container-1').style.display = 'flex';
	document.querySelectorAll('.score1')[1].textContent = blackScore;
	document.querySelectorAll('.score1')[0].textContent = whiteScore;
	document.querySelector('.btn-res').addEventListener('click', () => {
		location.reload();
	});
}

let penaltyGoals = 0;

// Function to set up new rules for the penalty shootout
function penaltyRules() {
	document.querySelector('.ball').addEventListener('click', () => {
		for (let i = 3; i < 6; i++) {
			matrix[0][i].innerHTML = "<div style='background-color: white;' class='white-dot dot-action'></div>";
		}
	});
	toggleTurn();
	let option;

	window.addEventListener('click', e => {
		selectedItems = [4, 2];
		if (
			e.target.classList.contains('white-dot') ||
			(e.target.childNodes[0] &&
				e.target.childNodes[0].classList.contains('white-dot'))
		) {
			document.querySelector('.squad').innerHTML = '';
			const rand = [1, 2, 3][Math.floor(Math.random() * 3)];

			if (e.target.classList.contains('white-dot')) {
				e.target.parentElement.innerHTML = matrix[2][4].innerHTML;
			} else {
				e.target.innerHTML = matrix[2][4].innerHTML;
			}
			clearAllDots();
			if (matrix[0][rand + 2].innerHTML == '') {
				if (!isBlackTurn) option = ['white', 'black'];
				else option = ['black', 'white'];
				matrix[0][rand + 2].innerHTML = `<img class=" ${option[1]}-rook rook" src="./images/pieces/${option[1]}/rook.png" alt="">`;
				matrix[2][4].innerHTML = '';
				selectedItems = [];
				document.querySelector('.goall').style.display = 'flex';
				matrix[2][4].innerHTML = '';
				setTimeout(() => {
					if (isBlackTurn) {
						scores[1].textContent = blackScore + 1;
						blackScore++;
					} else {
						scores[0].textContent = whiteScore + 1;
						whiteScore++;
					}

					if (penaltyGoals > 0 && penaltyGoals % 2 == 0 && blackScore != whiteScore) showWinningScreen();
					toggleTurn();
					startPenaltyShootout();
				}, 3000);
			} else {
				if (isBlackTurn) option = ['white', 'black'];
				else option = ['black', 'white'];
				matrix[0][rand + 2].innerHTML = `<img class=" ${option[0]}-rook rook" src="./images/pieces/${option[0]}/rook.png" alt="">`;
				matrix[2][4].innerHTML = '';
				setTimeout(() => {
					if (penaltyGoals > 0 && penaltyGoals % 2 == 0 && blackScore != whiteScore) showWinningScreen();
					toggleTurn();
					startPenaltyShootout();
				}, 3000);
			}
		}
	});
}

// Function to start the penalty shootout
function startPenaltyShootout() {
	penaltyGoals++;
	clearMatrix();
	let option;
	if (isBlackTurn) option = ['white', 'black'];
	else option = ['black', 'white'];
	document.querySelector('.keeper-zone').style.display = 'flex';
	const sq1 = document.querySelector('.squad');
	matrix[2][4].innerHTML = '<img src="./images/ball.jpg" alt="" class="ball">';
	sq1.innerHTML = `<img class=" ${option[0]}-rook rook" src="./images/pieces/${option[0]}/rook.png" alt="">`;
	matrix[3][3].innerHTML = `<img class=" ${option[1]}-rook $ piece" src="./images/pieces/${option[1]}/knight.png" alt="">`;
	selectedItems = [4, 2];
	penaltyRules();

	toggleTurn();
}
