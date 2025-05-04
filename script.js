const matrix = [[], [], [], [], [], [], [], [], [], [], []],
	matrixContent = document.querySelector('.main-matrix'),
	squadsBoard = matrixContent.querySelectorAll('.squad'),
	squads = document.querySelectorAll('.squad'),
	ball = document.querySelector('.ball'),
	blackPieces = document.querySelectorAll('.black-pieces'),
	whitePieces = document.querySelectorAll('.white-pieces')

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

	matrix[1][3].innerHTML =
		'<img class="black-pieces rook" src="./images/pieces/black/rook.png" alt="">'
	matrix[9][4].innerHTML =
		'<img class="white-pieces rook" src="./images/pieces/white/rook.png" alt="">'

	matrix[6][1].innerHTML =
		'<img class="white-pieces piece" src="./images/pieces/white/bishop.png" alt="">'

	matrix[7][5].innerHTML =
		'<img class="white-pieces piece" src="./images/pieces/white/bishop.png" alt="">'

	matrix[6][7].innerHTML =
		'<img class="white-pieces piece" src="./images/pieces/white/knight.png" alt="">'

	matrix[2][2].innerHTML =
		'<img class="black-pieces piece" src="./images/pieces/black/bishop.png" alt="">'

	matrix[3][7].innerHTML =
		'<img class="black-pieces piece" src="./images/pieces/black/rook.png" alt="">'
}

buildMatrix()

const pieces = document.querySelectorAll('img')
const canMovePieces = document.querySelectorAll('.piece')
const rook = document.querySelectorAll('.rook')

function showDots(y, x, name) {
	if (name == 'rook') {
		let options = true
		for (let i = 3; i < 6; i++) {
			if (x != i && matrix[y][i].innerHTML == '' && options) {
				matrix[y][i].innerHTML = "<div class='dot-action'></div>"
				options = false
			} else options = true
		}
	}
}

// item.style.cssText = 'background-color:#f5f682;'

matrix.forEach((row, index) => {
	row.forEach((item, idx) => {
		if (item != 0) {
			item.addEventListener('click', () => {
				if (item.children[0].classList.contains('rook')) {
					showDots(index, idx, 'rook')
				}
			})
		}
	})
})

matrix[3].forEach((item, idx) => {
	if (item.innerHTML == '') {
		item.innerHTML = "<div class='dot-action'></div>"
	} else console.log(item)
})
