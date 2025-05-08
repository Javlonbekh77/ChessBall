const matrix = [[], [], [], [], [], [], [], [], [], [], []],
	matrixContent = document.querySelector('.main-matrix'),
	squadsBoard = matrixContent.querySelectorAll('.squad'),
	squads = document.querySelectorAll('.squad'),
	ball = document.querySelector('.ball'),
	blackPieces = document.querySelectorAll('.black-pieces'),
	whitePieces = document.querySelectorAll('.white-pieces')

let Dots = false,
	Order = true
// Matrix building
squadsBoard.forEach((item, index) => {
	if (index % 2 == 0) item.classList.add('white')
})

function buildMatrix() {
	squadsBoard.forEach((item, idx) => {
		let j = Math.floor(idx / 9) + 1
		matrix[j].push(item)
	})

	for (let i = 0; i < 9; i++) {
		if (2 < i && i < 6) {
			matrix[0].push(squads[i - 3])
		} else matrix[0].push(0)
	}
	for (let i = 0; i < 9; i++) {
		if (2 < i && i < 6) {
			matrix[10].push(squads[87 - 6 + i])
		} else matrix[10].push(0)
	}

	matrix[1][4].innerHTML =
		'<img class="black-pieces black-rook black rook" src="./images/pieces/black/rook.png" alt="">'
	matrix[9][4].innerHTML =
		'<img class="white-pieces whitee rook" src="./images/pieces/white/rook.png" alt="">'

	matrix[6][1].innerHTML =
		'<img class="white-pieces piece whitee" src="./images/pieces/white/bishop.png" alt="">'

	matrix[7][5].innerHTML =
		'<img class="white-pieces piece whitee" src="./images/pieces/white/bishop.png" alt="">'
	matrix[5][5].innerHTML =
		'<img class="black-pieces piece black" src="./images/pieces/black/knight.png" alt="">'

	matrix[6][7].innerHTML =
		'<img class="white-pieces piece whitee" src="./images/pieces/white/knight.png" alt="">'

	matrix[2][2].innerHTML =
		'<img class="black-pieces piece black" src="./images/pieces/black/bishop.png" alt="">'

	matrix[3][7].innerHTML =
		'<img class="black-pieces piece black" src="./images/pieces/black/bishop.png" alt="">'
	matrix[5][4].innerHTML = '<img src="./images/ball.jpg" alt="" class="ball">'
	//
}

buildMatrix()

const pieces = document.querySelectorAll('img')
const canMovePieces = document.querySelectorAll('.piece')
const rook = document.querySelectorAll('.rook')

function showDots(y, x, name) {
	Dots = true
	if (name == 'rook') {
		console.log(x)
		if (2 < x - 1 && matrix[y][x - 1].innerHTML == '') {
			matrix[y][x - 1].innerHTML = "<div class='dot-action'></div>"
		}
		if (x + 1 < 6 && matrix[y][x + 1].innerHTML == '') {
			matrix[y][x + 1].innerHTML = "<div class='dot-action'></div>"
		}
	}
}

function clearAllDots() {
	Dots = false
	selectedItems = []
	squads.forEach(item => {
		if (
			item.childNodes[0] &&
			item.childNodes[0].classList.contains('dot-action')
		)
			item.childNodes[0].remove()
	})
}

// item.style.cssText = 'background-color:#f5f682;'

let selectedItems = []
let moveItems = []

function Rook(rook, x, y) {
	if (Dots == false) {
		if (
			(rook.classList.contains('black') && Order) ||
			(rook.classList.contains('whitee') && Order == false)
		) {
			selectedItems = [x, y]
			showDots(y, x, 'rook')
		}
	} else clearAllDots()
}

// Ball
const mass = [
	[0, 0],
	[0, 1],
	[1, 0],
	[1, 1],
	[2, 1],
	[2, 0],
	[1, 2],
	[0, 2],
]
function Ball(x, y) {
	let option
	if (Order) option = 'black'
	else option = 'whitee'
	Dots = true
	selectedItems = [x, y]
	let column = x - 1
	let row = y + 1
	while (
		column >= 0 &&
		(matrix[y][column].innerHTML == '' ||
			(matrix[y][column] &&
				matrix[y][column].childNodes[0].classList.contains(`${option}`)))
	) {
		if (matrix[y][column].innerHTML == '')
			matrix[y][column].innerHTML = "<div class='dot-action'></div>"
		column--
	}
	column = x + 1
	while (
		column <= 8 &&
		(matrix[y][column].innerHTML == '' ||
			(matrix[y][column] &&
				matrix[y][column].childNodes[0].classList.contains(`${option}`)))
	) {
		if (matrix[y][column].innerHTML == '')
			matrix[y][column].innerHTML = "<div class='dot-action'></div>"
		column++
	}

	while (
		row <= 10 &&
		(matrix[row][x].innerHTML == '' ||
			(matrix[row][x] &&
				matrix[row][x].childNodes[0].classList.contains(`${option}`)))
	) {
		if (matrix[row][x].innerHTML == '')
			if (row == 10 && y > 5 && Order) {
				matrix[row][x].innerHTML =
					"<div style='background-color: white;' class='white-dot dot-action'></div>"
				console.log('Goll')
			} else matrix[row][x].innerHTML = "<div class='dot-action'></div>"

		row++
	}
	row = y - 1
	while (
		row >= 0 &&
		(matrix[row][x].innerHTML == '' ||
			(matrix[row][x] &&
				matrix[row][x].childNodes[0].classList.contains(`${option}`)))
	) {
		if (matrix[row][x].innerHTML == '')
			if (row == 0 && y < 5 && !Order)
				matrix[row][x].innerHTML =
					"<div style='background-color: white;' class='white-dot dot-action'></div>"
			else matrix[row][x].innerHTML = "<div class='dot-action'></div>"
		row--
	}

	for (let i = 0; i < 4; i++) {
		items = mass[i]
		if (items[0] == 0) column = x - 1
		else column = x + 1
		if (items[1] == 0) row = y - 1
		else row = y + 1
		while (
			0 <= column &&
			column <= 9 &&
			0 < row &&
			row < 10 &&
			matrix[row][column] &&
			(matrix[row][column].innerHTML == '' ||
				matrix[row][column].childNodes[0].classList.contains(`${option}`))
		) {
			if (matrix[row][column].innerHTML == '') {
				if (column == 5 && row == 9 && 10 > y && y > 5 && Order) {
					console.log('Goall')
					matrix[row + 1][column].innerHTML =
						"<div style='background-color: white;' class='white-dot dot-action'></div>"
				}
				if (column == 3 && row == 9 && 10 > y && y > 5 && Order)
					matrix[row + 1][column].innerHTML =
						"<div style='background-color: white;' class='white-dot dot-action'></div>"
				if (column == 5 && row == 1 && 5 > y && y > 0 && !Order)
					matrix[row - 1][column].innerHTML =
						"<div style='background-color: white;' class='white-dot dot-action'></div>"
				if (column == 3 && row == 1 && 5 > y && y > 0 && !Order)
					matrix[row - 1][column].innerHTML =
						"<div style='background-color: white;' class='white-dot dot-action'></div>"
				matrix[row][column].innerHTML = "<div class='dot-action'></div>"
			}
			if (items[0] == 0) column--
			else column++
			if (items[1] == 0) row--
			else row++
		}
		// console.log(
		// 	checkAround(column, row),
		// 	matrix[row][column].childNodes[0].classList.contains(`${option}`)
		// )
	}
}

// Piece
function Piece(x, y) {
	Dots = true
	selectedItems = [x, y]
	let row, column
	for (let i = 0; i < 8; i++) {
		items = mass[i]
		if (items[0] == 0) column = x - 1
		else if (items[0] == 2) column = x
		else column = x + 1
		if (items[1] == 0) row = y - 1
		else if (items[1] == 2) row = y
		else row = y + 1
		if (
			0 <= column &&
			column <= 9 &&
			0 <= row &&
			row <= 10 &&
			matrix[row][column] &&
			matrix[row][column].innerHTML == ''
		)
			matrix[row][column].innerHTML = "<div class='dot-action'></div>"
	}
}

function checkAround(x, y) {
	let row, column, option
	if (Order) option = 'black'
	else option = 'whitee'
	let res = []
	for (let i = 0; i < 8; i++) {
		items = mass[i]
		if (items[0] == 0) column = x - 1
		else if (items[0] == 2) column = x
		else column = x + 1
		if (items[1] == 0) row = y - 1
		else if (items[1] == 2) row = y
		else row = y + 1
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
				return true
	}
	return false
}

squadsBoard.forEach((item, index) => {
	item.addEventListener('click', () => {
		if (item.childNodes[0]) {
			console.log(Order)
			if (item.childNodes[0].classList.contains('rook') && Dots == false) {
				Rook(item.childNodes[0], index % 9, Math.floor(index / 9) + 1)
				console.log(selectedItems)
			} else if (item.childNodes[0].classList.contains('dot-action')) {
				moveItems = [index % 9, Math.floor(index / 9) + 1]
				Replace()
			} else if (
				item.childNodes[0].classList.contains('ball') &&
				Dots == false
			) {
				console.log('this is a ball')
				// Baallll
				if (checkAround(index % 9, Math.floor(index / 9) + 1))
					Ball(index % 9, Math.floor(index / 9) + 1)
			} else if (
				item.childNodes[0].classList.contains('piece') &&
				Dots == false
			) {
				console.log('it is a piece')
				if (
					(item.childNodes[0].classList.contains('black') && Order) ||
					(item.childNodes[0].classList.contains('whitee') && Order == false)
				)
					Piece(index % 9, Math.floor(index / 9) + 1)
			} else {
				clearAllDots()
			}
		} else {
			clearAllDots()
		}
	})
})

function changeOrder() {
	if (Order) {
		document.querySelector('.move-color-black').innerHTML = 'Qora'
	} else document.querySelector('.move-color-black').innerHTML = 'Oq'
}

function Replace() {
	Order = !Order
	console.log(selectedItems, moveItems)
	let x1 = selectedItems[0],
		y1 = selectedItems[1],
		x2 = moveItems[0],
		y2 = moveItems[1]
	console.log(x1, y1, x2, y2)
	let alfa = matrix[y1][x1].childNodes[0]
	matrix[y2][x2].innerHTML = matrix[y1][x1].innerHTML
	matrix[y1][x1].innerHTML = ''
	clearAllDots()
	changeOrder()
}
