const boardElement = document.getElementById('board');
const playBtn = document.querySelector('.btn-play');
const solveBtn = document.querySelector('.btn-solve');
const timeDisplay = document.getElementById('time-val');
const movesDisplay = document.getElementById('steps-val');
const queenCountDisplay = document.getElementById('current-queens');
const successModal = document.getElementById('success-modal');
const failModal = document.getElementById('fail-modal');

const N = 4;
let board = Array(N).fill(null).map(() => Array(N).fill(0)); // 4x4 grid of zeros
let timerInterval = null;
let startTime = 0;
let movesCount = 0;
let isGameActive = false;

// build the board UI
function createBoardUI() {
    boardElement.innerHTML = '';
    boardElement.style.display = 'grid';
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', (i + j) % 2 === 0 ? 'light' : 'dark'); // checkerboard pattern
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.id = `cell-${i}-${j}`;
            cell.onclick = () => handleManualMove(i, j);
            boardElement.appendChild(cell);
        }
    }
}

// count queens on the board
function updateQueenCount() {
    let count = 0;
    board.forEach(row => row.forEach(val => { if (val === 1) count++; }));
    if (queenCountDisplay) queenCountDisplay.innerText = count;
}

// start timer and reset stats
function startStats() {
    movesCount = 0;
    if (movesDisplay) movesDisplay.innerText = movesCount;
    updateQueenCount();
    startTime = Date.now();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        if (timeDisplay) timeDisplay.innerText = elapsed.toFixed(1) + "s";
    }, 100);
}

function stopStats() {
    clearInterval(timerInterval);
}

// handle manual cell click
function handleManualMove(row, col) {
    if (!isGameActive) return;
    const cell = document.getElementById(`cell-${row}-${col}`);
    if (board[row][col] === 0) {
        board[row][col] = 1;
        cell.innerHTML = '👑';
    } else {
        board[row][col] = 0;
        cell.innerHTML = '';
    }
    movesCount++;
    if (movesDisplay) movesDisplay.innerText = movesCount;
    updateQueenCount();
    highlightConflicts();
    checkWinCondition();
}

// highlight conflicting queens in pink
function highlightConflicts() {
    document.querySelectorAll('.cell').forEach(c => c.classList.remove('conflict'));
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            if (board[r][c] === 1 && !isSafeForManual(r, c)) {
                document.getElementById(`cell-${r}-${c}`).classList.add('conflict');
            }
        }
    }
}

// check if all queens are placed with no conflicts
function checkWinCondition() {
    let totalQueens = 0;
    let hasConflict = false;
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            if (board[r][c] === 1) {
                totalQueens++;
                if (!isSafeForManual(r, c)) hasConflict = true;
            }
        }
    }
    if (totalQueens === N && !hasConflict) {
        stopStats();
        isGameActive = false;
        if (successModal) successModal.style.display = 'flex';
    }
}

// check queen safety (manual) — row + col + diagonals
function isSafeForManual(row, col) {
    for (let i = 0; i < N; i++) {
        if (i !== col && board[row][i] === 1) return false;
        if (i !== row && board[i][col] === 1) return false;
    }
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if ((i !== row && j !== col) && board[i][j] === 1) {
                if (Math.abs(row - i) === Math.abs(col - j)) return false;
            }
        }
    }
    return true;
}

// AI solver — backtracking (try, fail → go back)
async function solveWithAI(col) {
    if (col >= N) return true;
    for (let i = 0; i < N; i++) {
        const cell = document.getElementById(`cell-${i}-${col}`);
        if (isSafe(i, col)) {
            board[i][col] = 1;
            cell.innerHTML = '👑';
            movesCount++;
            if (movesDisplay) movesDisplay.innerText = movesCount;
            updateQueenCount();
            await new Promise(r => setTimeout(r, 400)); // delay to visualize steps
            if (await solveWithAI(col + 1)) return true;
            board[i][col] = 0; // backtrack
            cell.innerHTML = '';
            updateQueenCount();
        }
    }
    return false;
}

// check queen safety (AI) — only checks columns to the left
function isSafe(row, col) {
    for (let i = 0; i < col; i++) if (board[row][i] === 1) return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 1) return false;
    for (let i = row, j = col; j >= 0 && i < N; i++, j--) if (board[i][j] === 1) return false;
    return true;
}

function closeModal() {
    if (successModal) successModal.style.display = 'none';
    if (failModal) failModal.style.display = 'none';
}

// button events
playBtn.onclick = () => {
    closeModal();
    isGameActive = true;
    board = Array(N).fill(null).map(() => Array(N).fill(0));
    createBoardUI();
    startStats();
};

solveBtn.onclick = async () => {
    closeModal();
    isGameActive = false;
    board = Array(N).fill(null).map(() => Array(N).fill(0));
    createBoardUI();
    startStats();
    const solved = await solveWithAI(0);
    stopStats();
    if (solved) {
        if (successModal) successModal.style.display = 'flex';
    } else {
        if (failModal) failModal.style.display = 'flex';
    }
};
