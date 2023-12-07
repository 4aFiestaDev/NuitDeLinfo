// Create a tetris game

// Create a canvas
const canvas = document.getElementById("tetrisCanvas");
const context = canvas.getContext("2d");

// Scale the canvas
context.scale(20, 20);

// Create a matrix
function createMatrix(width, height) {
  const matrix = [];
  while (height--) {
    matrix.push(new Array(width).fill({ value: 0, color: null }));
  }
  return matrix;
}

// Create a piece

// Create a piece
function createPiece(type) {
  let piece = null;
  if (type === "T") {
    piece = {
      value: 1,
      color: colors[1],
    };
    return [
      [0, 0, 0],
      [piece, piece, piece],
      [0, piece, 0],
    ];
  } else if (type === "O") {
    piece = {
      value: 2,
      color: colors[2],
    };
    return [
      [piece, piece],
      [piece, piece],
    ];
  } else if (type === "L") {
    piece = {
      value: 3,
      color: colors[3],
    };
    return [
      [0, piece, 0],
      [0, piece, 0],
      [0, piece, piece],
    ];
  } else if (type === "J") {
    piece = {
      value: 4,
      color: colors[4],
    };
    return [
      [0, piece, 0],
      [0, piece, 0],
      [piece, piece, 0],
    ];
  } else if (type === "I") {
    piece = {
      value: 5,
      color: colors[5],
    };
    return [
      [0, 0, 0, 0],
      [piece, piece, piece, piece],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  } else if (type === "S") {
    piece = {
      value: 6,
      color: colors[6],
    };
    return [
      [0, piece, piece],
      [piece, piece, 0],
      [0, 0, 0],
    ];
  } else if (type === "Z") {
    piece = {
      value: 7,
      color: colors[7],
    };
    return [
      [piece, piece, 0],
      [0, piece, piece],
      [0, 0, 0],
    ];
  }
}

// Draw the matrix
function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(player.matrix, player.pos);
  drawMatrix(arena, { x: 0, y: 0 });
}

// Draw the matrix

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.color !== "undefined" && cell.value) {
        color = cell.color;
        context.fillStyle = color;
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

// Merge the matrix
function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell && cell.value !== 0) {
        const color = colors[cell.value];
        arena[y + player.pos.y][x + player.pos.x] = {
          value: cell.value,
          color: color,
        };
      }
    });
  });
}

// Check collision

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      if (m[y][x] != 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) != 0) {
        return true;
      }
    }
  }
  return false;
}

// Rotate the matrix

function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < y; x++) {
      // Swap the values
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }

  // Reverse the matrix
  if (dir > 0) {
    matrix.forEach((row) => row.reverse());
  } else {
    matrix.reverse();
  }
}

// Drop the piece
function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);

    // Check if the piece has reached the top
    if (player.pos.y <= 0) {
      // Clear the arena and restart the game
      arena.forEach((row) => row.fill(0));
      player.score = 0;
      updateScore();
    } else {
      // Generate a new random piece
      const pieces = "ILJOTSZ";
      player.matrix = createPiece(
        pieces[(pieces.length * Math.random()) | 0],
        colors
      );

      // Reset the position to the top of the matrix
      player.pos.y = 0;

      // Check for any completed rows and update the score
      arenaSweep();
      updateScore();
    }
  }
  dropCounter = 0;
}

// Move the piece

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

// Reset the arena
function arenaSweep() {
  let rowCount = 0;

  outer: for (let y = arena.length - 1; y > 0; y--) {
    for (let x = 0; x < arena[y].length; x++) {
      if (arena[y][x] == 0) {
        continue outer;
      }
    }

    // If the loop completes, it means the row is filled
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    rowCount++;
    y++;
  }

  // Update the player's score based on the number of completed rows
  if (rowCount > 0) {
    player.score += Math.pow(2, rowCount - 1); // Score calculation (adjust as needed)
  }
}

// Update the game

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
}

// Update the score

function updateScore() {
  document.getElementById("score").innerText = player.score;
}

// Player controls

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    playerMove(-1);
  } else if (event.keyCode == 39) {
    playerMove(1);
  } else if (event.keyCode == 40) {
    playerDrop();
  } else if (event.keyCode == 81) {
    playerRotate(-1);
  } else if (event.keyCode == 87) {
    playerRotate(1);
  }
});

// Rotate the piece

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}

// Colors for the pieces

const colors = [
  null,
  "#FF0D72",
  "#0DC2FF",
  "#0DFF72",
  "#F538FF",
  "#FF8E0D",
  "#FFE138",
  "#3877FF",
];

// Create the arena

const arena = createMatrix(12, 20);

// Player object

// Player object
const player = {
  pos: { x: Math.floor(arena[0].length / 2) - 1, y: 0 }, // Initial position in the middle of the top row
  matrix: null,
  score: 0,
};

// Drop the piece every second

let dropCounter = 0;
let dropInterval = 1000;

// Last time the piece dropped

let lastTime = 0;

// Randomly select a piece

const pieces = "ILJOTSZ";
player.matrix = createPiece(
  pieces[(pieces.length * Math.random()) | 0],
  colors
);

// Start the game

updateScore();
update();

// Path: assets/js/script.js
