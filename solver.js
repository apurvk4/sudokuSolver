let currentCell = null;
let sudoku = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0],
];
window.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll("#grid td button").forEach((cell) =>
    cell.addEventListener("click", function (e) {
      if (e.target == e.currentTarget) {
        if (!currentCell) {
          currentCell = cell;
        } else {
          let val = currentCell.innerText[0];
          if (val) {
            currentCell.innerHTML = val;
          }
          currentCell = cell;
        }
        cell.innerHTML += `<div class="board_console_container">
        <div
          class="board_console"
        >
          <div class="num" role="button" aria-pressed="false" tabindex="0" style="height: 25px; line-height: 25px" onclick="setValue(1)" >1</div>
          <div class="num" role="button" aria-pressed="false" tabindex="1" style="height: 25px; line-height: 25px" onclick="setValue(2)" >2</div>
          <div class="num" role="button" aria-pressed="false" tabindex="2" style="height: 25px; line-height: 25px" onclick="setValue(3)" >3</div>
          <div class="num" role="button" aria-pressed="false" tabindex="3" style="height: 25px; line-height: 25px" onclick="setValue(4)" >4</div>
          <div class="num" role="button" aria-pressed="false" tabindex="4" style="height: 25px; line-height: 25px" onclick="setValue(5)" >5</div>
          <div class="num" role="button" aria-pressed="false" tabindex="5" style="height: 25px; line-height: 25px" onclick="setValue(6)" >6</div>
          <div class="num" role="button" aria-pressed="false" tabindex="6" style="height: 25px; line-height: 25px" onclick="setValue(7)" >7</div>
          <div class="num" role="button" aria-pressed="false" tabindex="7" style="height: 25px; line-height: 25px" onclick="setValue(8)" >8</div>
          <div class="num" role="button" aria-pressed="false" tabindex="8" style="height: 25px; line-height: 25px" onclick="setValue(9)" >9</div>
          <div class="num remove" role="button" aria-pressed="false" tabindex="9 onclick="setValue(0)" " style="height: 25px; line-height: 25px" onclick="setValue('x')" >
            X
          </div>
      </div>`;
      }
    })
  );
  document.addEventListener("click", (e) => {
    if (e.target.className == "board_console_container") {
      currentCell.innerHTML = "";
    }
  });
});
function myFunction() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
function clearAll() {
  let cellList = document.querySelectorAll("#grid td button");
  cellList.forEach((cell) => {
    cell.innerHTML = "";
    cell.removeAttribute("disabled");
  });
}
function fill() {
  let i = 0;
  let cellList = document.querySelectorAll("#grid td button");
  for (let k = 0; k < sudoku.length; k++) {
    for (let j = 0; j < sudoku[k].length; j++) {
      if (sudoku[k][j] != 0) {
        cellList[i].innerHTML = sudoku[k][j].toString();
        cellList[i].setAttribute("disabled", "true");
      } else {
        cellList[i].innerHTML = "";
        if (cellList[i].hasAttribute("disabled")) {
          cellList[i].removeAttribute("disabled");
        }
      }
      i++;
    }
  }
}
function solve() {
  let grid = new Array(9);
  let i = 0;
  let cellList = document.querySelectorAll("#grid td button");
  cellList.forEach((cell) => {
    if (grid[i] && grid[i].length < 9) {
      grid[i].push(+cell.innerText[0] || 0);
    } else if (grid[i] && grid[i].length == 9) {
      i++;
      grid[i] = [];
      grid[i].push(+cell.innerText[0] || 0);
    } else {
      grid[i] = [];
      grid[i].push(+cell.innerText[0] || 0);
    }
  });
  i = 0;
  SolveSudoku(grid);
  for (let k = 0; k < grid.length; k++) {
    for (let j = 0; j < grid[k].length; j++) {
      cellList[i].innerHTML = grid[k][j].toString();
      cellList[i].setAttribute("disabled", "true");
      i++;
    }
  }
}
function setValue(value) {
  if (value == "x") {
    currentCell.innerHTML = "";
  } else {
    if (currentCell) {
      currentCell.innerHTML = value;
    }
  }
}

function SolveSudoku(grid) {
  return solve(grid, 0, 0);
  function solve(grid, i, j) {
    let N = 9;
    if (j >= N) {
      return true;
    }
    if (grid[i][j] == 0) {
      for (let k = 1; k <= 9; k++) {
        if (isSafe(grid, i, j, k)) {
          grid[i][j] = k;
          if (i < N - 1) {
            if (solve(grid, i + 1, j)) {
              return true;
            }
          } else if (j < N - 1) {
            if (solve(grid, 0, j + 1)) {
              return true;
            }
          } else if (i == N - 1 && j == N - 1) {
            return true;
          }
          grid[i][j] = 0;
        }
      }
    } else {
      if (i < N - 1) {
        if (solve(grid, i + 1, j)) {
          return true;
        }
      } else if (j < N - 1) {
        if (solve(grid, 0, j + 1)) {
          return true;
        }
      } else if (i == N - 1 && j == N - 1) {
        return true;
      }
    }
    return false;
  }
  function isSafe(grid, r, c, k) {
    let N = 9;
    for (let i = 0; i < N; i++) {
      if (grid[i][c] == k) {
        return false;
      }
    }
    for (let j = 0; j < N; j++) {
      if (grid[r][j] == k) {
        return false;
      }
    }
    if (r < 3) {
      r = 0;
    } else if (r < 6) {
      r = 3;
    } else if (r < 9) {
      r = 6;
    }
    if (c < 3) {
      c = 0;
    } else if (c < 6) {
      c = 3;
    } else if (c < 9) {
      c = 6;
    }
    for (let i = r; i <= r + 2 && i < N; i++) {
      for (let j = c; j <= c + 2 && j < N; j++) {
        if (grid[i][j] == k) {
          return false;
        }
      }
    }
    return true;
  }
}
