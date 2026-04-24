# 👑 N-Queens AI Solver
> An interactive and high-performance AI application designed to solve the classic N-Queens puzzle using advanced backtracking algorithms.

---

## 📸 Project Screenshots
> Visualizing the N-Queens AI solving process and UI.

<p align="center">
  <table border="0">
    <tr>
      <td><img src="https://i.ibb.co/tpJdhWqv/Screenshot-5.png" width="400" alt="UI Dashboard"></td>
      <td><img src="https://i.ibb.co/2LLFn9V/Screenshot-6.png" width="400" alt="Board Initialization"></td>
    </tr>
    <tr>
      <td><img src="https://i.ibb.co/Z164wDTV/Screenshot-8.png" width="400" alt="Algorithm Tracing"></td>
      <td><img src="https://i.ibb.co/DfJKWSNB/Screenshot-9.png" width="400" alt="Solution Found"></td>
    </tr>
    <tr>
      <td><img src="https://i.ibb.co/DPkhVZsC/Screenshot-11.png" width="400" alt="Results Analysis"></td>
      <td><img src="https://i.ibb.co/tpJdhWqv/Screenshot-5.png" width="400" alt="Final View"></td>
    </tr>
  </table>
</p>

---

## 🚀 Overview
**N-Queens AI Solver** is a specialized tool developed to find all possible configurations of $N$ queens on an $N \times N$ chessboard such that no two queens threaten each other. This project demonstrates core **Artificial Intelligence** concepts, specifically **Constraint Satisfaction Problems (CSP)** and efficient state-space searching.

## ✨ Key Features
- **🎯 Backtracking Engine**: Highly optimized recursive algorithm to explore valid board states.
- **📈 Dynamic Scaling**: Supports various board sizes (from 4x4 up to larger dimensions).
- **🔍 Step-by-Step Logic**: Designed with clear code tracing to visualize how the AI "thinks" and makes decisions.
- **💻 Clean Architecture**: Modular code structure separating the solver logic from the user interface.

---

## 🧠 The Algorithm (Backtracking)
The solver utilizes the **Backtracking** technique. It places queens one by one in different columns, starting from the leftmost column. When placing a queen in a column, it checks for clashes with already placed queens. 

### 💡 Logic Tracing:
1. **Start** in the leftmost column.
2. **If all queens are placed** safely, return true (Solution Found).
3. **Try all rows** in the current column:
   - Check if the current row is **Safe** (No queens in the same row or diagonals).
   - If **Safe**, mark this row and column and move to the next column.
   - If placing the queen doesn't lead to a solution, **Unmark** (Backtrack) and try the next row.
4. **If all rows are tried** and none worked, return false to trigger backtracking in the previous column.

---

## 🛠️ Tech Stack
| Technology | Usage |
| :--- | :--- |
| **C# / .NET** | Core backend logic and solver implementation |
| **HTML/JS** | Interactive web-based visualization |
| **Data Structures** | Optimized 2D Arrays and Recursion stacks |

---

## 👥 Meet The Team
We are a team of Computer Science students at Mansoura University, focused on implementing practical AI solutions.

| Name | Role | Profile |
| :--- | :--- | :--- |
| **Yousef Sarhan** | AI Logic & Backend Developer | [🔗 GitHub](https://github.com/yousefsrhan/yousefsrhan) |
| **Mohamed Elfadel** | System Architect & Developer | [🔗 Gmail](mailto:hossamnemerr@gmail.com) |
| **Hossam Eldeen Nemr** | UI/UX & Documentation | [🔗 Gmail](mailto:mohamedabdelhai49@gmail.com) |

---

### 📥 Getting Started

Follow these steps to get the project up and running on your local machine:

### 1. Clone the Repository
Open **Git Bash** and run:
```bash
git clone [https://github.com/yousefsrhan/N_Queens.git](https://github.com/yousefsrhan/N_Queens.git)
