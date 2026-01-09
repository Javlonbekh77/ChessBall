# Chess Ball

Chess Ball is a unique web-based game that combines the strategic elements of chess with the fast-paced, goal-oriented gameplay of football.

## Game Rules

### Objective
The primary objective of Chess Ball is to score more goals than your opponent within the given time limit. To score a goal, you must move the ball into your opponent's goal zone, located at the opposite end of the board.

### Board and Pieces
- **Game Board**: The game is played on an 11x9 grid.
- **Goal Zones**: Each player has a designated goal zone at their end of the board.
- **Pieces**:
  - **Ball**: The central piece of the game. It can be moved by any of your pieces.
  - **Rook**: Moves one or two squares horizontally.
  - **Bishop/Knight**: Move one square in any direction (similar to a King in traditional chess).

### Gameplay
1. **Setup**: Before the game begins, players can adjust the timer to set the match duration.
2. **Turns**: The game is turn-based, with "White" and "Black" sides taking turns to make a move.
3. **Movement**: On your turn, you can move one of your pieces. If a piece is adjacent to the ball, it can "kick" the ball. The ball travels in a straight line (horizontally, vertically, or diagonally) until it is blocked by another piece or the edge of the board.
4. **Scoring**: A goal is scored when the ball enters the opponent's goal zone. After a goal, the board is reset to its initial setup, and the game continues.
5. **Winning**: The player with the most goals at the end of the timed match is declared the winner.

### Special Conditions
- **Penalty Shootout**: If the game is tied when the timer runs out, a penalty shootout is initiated to determine the winner.

## How to Play
1. **Open `index.html` in your web browser.**
2. **Set the Timer**: Use the "+" and "-" buttons to adjust the game's duration.
3. **Start the Game**: Click the "Start" button to begin the match.
4. **Make Your Moves**: Click on a piece to see its available moves, and click on a highlighted square to move it. If a piece is next to the ball, you can move the ball.
5. **Score Goals**: Strategically move your pieces to control the ball and score goals.

## Project Structure
- **`index.html`**: The main HTML file that structures the game's interface.
- **`style.css`**: The stylesheet that defines the game's visual appearance.
- **`script.js`**: The JavaScript file that contains the game's logic, including piece movement, turn management, and scoring.
- **`/images`**: A directory containing all the images used for the game pieces and other visual elements.
