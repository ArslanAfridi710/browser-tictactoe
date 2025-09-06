import { useState, useCallback } from 'react';

export type Player = 'X' | 'O' | null;
export type GameMode = 'human' | 'ai';
export type Difficulty = 'easy' | 'hard';
export type GameState = 'playing' | 'won' | 'draw';

export interface GameBoard {
  board: Player[];
  currentPlayer: Player;
  gameState: GameState;
  winner: Player;
  winningLine: number[] | null;
  gameMode: GameMode;
  difficulty: Difficulty;
  scores: { X: number; O: number; draws: number };
}

const initialBoard: Player[] = Array(9).fill(null);

export const useTicTacToe = () => {
  const [gameBoard, setGameBoard] = useState<GameBoard>({
    board: initialBoard,
    currentPlayer: 'X',
    gameState: 'playing',
    winner: null,
    winningLine: null,
    gameMode: 'human',
    difficulty: 'easy',
    scores: { X: 0, O: 0, draws: 0 }
  });

  // Check for winner
  const checkWinner = useCallback((board: Player[]): { winner: Player; line: number[] | null } => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line };
      }
    }
    
    return { winner: null, line: null };
  }, []);

  // Check if board is full
  const isBoardFull = useCallback((board: Player[]): boolean => {
    return board.every(cell => cell !== null);
  }, []);

  // Minimax algorithm for hard AI
  const minimax = useCallback((board: Player[], depth: number, isMaximizing: boolean): number => {
    const { winner } = checkWinner(board);
    
    if (winner === 'O') return 10 - depth; // AI wins
    if (winner === 'X') return depth - 10; // Human wins
    if (isBoardFull(board)) return 0; // Draw

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }, [checkWinner, isBoardFull]);

  // Get AI move
  const getAIMove = useCallback((board: Player[], difficulty: Difficulty): number => {
    const emptyCells = board.map((cell, index) => cell === null ? index : null)
                           .filter(val => val !== null) as number[];

    if (difficulty === 'easy') {
      // Easy AI: 70% random moves, 30% optimal moves
      if (Math.random() < 0.7) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
    }

    // Hard AI or 30% of easy AI moves: use minimax
    let bestScore = -Infinity;
    let bestMove = emptyCells[0];

    for (const move of emptyCells) {
      board[move] = 'O';
      const score = minimax(board, 0, false);
      board[move] = null;
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }, [minimax]);

  // Make a move
  const makeMove = useCallback((index: number) => {
    setGameBoard(prev => {
      if (prev.board[index] !== null || prev.gameState !== 'playing') {
        return prev;
      }

      const newBoard = [...prev.board];
      newBoard[index] = prev.currentPlayer;

      const { winner, line } = checkWinner(newBoard);
      let newGameState: GameState = 'playing';
      let newScores = { ...prev.scores };

      if (winner) {
        newGameState = 'won';
        newScores[winner] += 1;
      } else if (isBoardFull(newBoard)) {
        newGameState = 'draw';
        newScores.draws += 1;
      }

      const nextPlayer = prev.currentPlayer === 'X' ? 'O' : 'X';

      return {
        ...prev,
        board: newBoard,
        currentPlayer: nextPlayer,
        gameState: newGameState,
        winner,
        winningLine: line,
        scores: newScores
      };
    });
  }, [checkWinner, isBoardFull]);

  // AI move (called after human move)
  const makeAIMove = useCallback(() => {
    setGameBoard(prev => {
      if (prev.gameState !== 'playing' || prev.currentPlayer !== 'O' || prev.gameMode !== 'ai') {
        return prev;
      }

      const aiMove = getAIMove(prev.board, prev.difficulty);
      const newBoard = [...prev.board];
      newBoard[aiMove] = 'O';

      const { winner, line } = checkWinner(newBoard);
      let newGameState: GameState = 'playing';
      let newScores = { ...prev.scores };

      if (winner) {
        newGameState = 'won';
        newScores[winner] += 1;
      } else if (isBoardFull(newBoard)) {
        newGameState = 'draw';
        newScores.draws += 1;
      }

      return {
        ...prev,
        board: newBoard,
        currentPlayer: 'X',
        gameState: newGameState,
        winner,
        winningLine: line,
        scores: newScores
      };
    });
  }, [getAIMove, checkWinner, isBoardFull]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameBoard(prev => ({
      ...prev,
      board: initialBoard,
      currentPlayer: 'X',
      gameState: 'playing',
      winner: null,
      winningLine: null
    }));
  }, []);

  // Set game mode
  const setGameMode = useCallback((mode: GameMode, difficulty?: Difficulty) => {
    setGameBoard(prev => ({
      ...prev,
      gameMode: mode,
      difficulty: difficulty || prev.difficulty,
      board: initialBoard,
      currentPlayer: 'X',
      gameState: 'playing',
      winner: null,
      winningLine: null
    }));
  }, []);

  // Reset scores
  const resetScores = useCallback(() => {
    setGameBoard(prev => ({
      ...prev,
      scores: { X: 0, O: 0, draws: 0 }
    }));
  }, []);

  return {
    gameBoard,
    makeMove,
    makeAIMove,
    resetGame,
    setGameMode,
    resetScores
  };
};